<?php

namespace App\Http\Controllers;

use App\Models\CompanyModel;
use App\Models\SubscriptionModel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Contracts\View\View;
use MyFatoorah\Library\MyFatoorah;
use MyFatoorah\Library\API\Payment\MyFatoorahPayment;
use MyFatoorah\Library\API\Payment\MyFatoorahPaymentEmbedded;
use MyFatoorah\Library\API\Payment\MyFatoorahPaymentStatus;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MyFatoorahController extends Controller {

    /**
     * @var array
     */
    public $mfConfig = [];
    public function __construct() {
        $this->mfConfig = [
            'apiKey'      => config('myfatoorah.api_key'),
            'isTest'      => config('myfatoorah.test_mode'),
            'countryCode' => config('myfatoorah.country_iso'),
        ];
    }

    public function index() {
        try {
            //For example: pmid=0 for MyFatoorah invoice or pmid=1 for Knet in test mode
            $paymentId = request('pmid') ?: 0;
            $sessionId = request('sid') ?: null;
            $orderId  = request('oid');

            if(!$orderId && !$sessionId && !$paymentId){
              return $this->returnIntoPaymentErrorPage($orderId,"Invalid payment initiated");
            }

            $curlData = $this->getPayLoadData($orderId);

            $mfObj   = new MyFatoorahPayment($this->mfConfig);
            $payment = $mfObj->getInvoiceURL($curlData, $paymentId, $orderId, $sessionId);

            return redirect($payment['invoiceURL']);
        } catch (Exception $ex) {
            $exMessage = __('myfatoorah.' . $ex->getMessage());
            return response()->json(['IsSuccess' => 'false', 'Message' => $exMessage]);
        }
    }
    private function getPayLoadData($orderId = null) {
        $callbackURL = route('myfatoorah.callback');
        $order = $this->getSubscriptionData($orderId);

        if(!$order){
            return $this->returnIntoPaymentErrorPage($orderId,"Order Not Found");
        }


        $userName=$order["user"]["name"];
        $amount=$order["amount"];
        $currency=$order["currency"] ?: "KWD";
        $customerEmail=$order["user"]["email"];
        return [
            'CustomerName'       => $userName,
            'InvoiceValue'       => $amount,
            'DisplayCurrencyIso' => $currency,
            'CustomerEmail'      => $customerEmail,
            'CallBackUrl'        => $callbackURL,
            'ErrorUrl'           => $callbackURL,
            'MobileCountryCode'  => '+965',
            'CustomerMobile'     => '12345678',
            'Language'           => 'en',
            'CustomerReference'  => $orderId,
            'SourceInfo'         => 'Laravel ' . app()::VERSION . ' - MyFatoorah Package ' . MYFATOORAH_LARAVEL_PACKAGE_VERSION
        ];
    }
    private function getSubscriptionData($id){
        $subscription=SubscriptionModel::with("user")->find($id);
       return $subscription;
    }

    public function checkout() {
        try {
            //You can get the data using the order object in your system
            $orderId = request('oid');
            $subscription=$this->getSubscriptionData($orderId);
            if(!$subscription){
                return $this->returnIntoPaymentErrorPage($orderId,"Invalid Order passed");
            }

            if($subscription["payment_status"]!=="pending"){
                return $this->returnIntoPaymentErrorPage($orderId,"Order already used");
            }

            //You can replace this variable with customer Id in your system
            $customerId = request($subscription["user"]["id"]);

            $totalAmount=$subscription["amount"];
            $currency=$subscription["currency"]  ?: "KWD";

            //You can use the user defined field if you want to save card
            $userDefinedField = config('myfatoorah.save_card') && $customerId ? "CK-$customerId" : '';

            //Get the enabled gateways at your MyFatoorah acount to be displayed on checkout page
            $mfObj          = new MyFatoorahPaymentEmbedded($this->mfConfig);
            $paymentMethods = $mfObj->getCheckoutGateways($totalAmount, $currency, config('myfatoorah.register_apple_pay'));

            if (empty($paymentMethods['all'])) {
                throw new Exception('noPaymentGateways');
            }

            //Generate MyFatoorah session for embedded payment
            $mfSession = $mfObj->getEmbeddedSession($userDefinedField);

            //Get Environment url
            $isTest = $this->mfConfig['isTest'];
            $vcCode = $this->mfConfig['countryCode'];

            $countries = MyFatoorah::getMFCountries();
            $jsDomain  = ($isTest) ? $countries[$vcCode]['testPortal'] : $countries[$vcCode]['portal'];

            return view('myfatoorah.checkout', compact('mfSession', 'paymentMethods', 'jsDomain', 'userDefinedField','orderId'));
        } catch (Exception $ex) {
            $exMessage = __('myfatoorah.' . $ex->getMessage());
            return view('myfatoorah.error', compact('exMessage'));
        }
    }
    public function callback() {
        $is_subscription_done=false;
        $paymentId = request('paymentId');
        try {

            $mfObj = new MyFatoorahPaymentStatus($this->mfConfig);
            $data  = $mfObj->getPaymentStatus($paymentId, 'PaymentId');
            $invoice_status=$data->InvoiceStatus;
            $invoice_error=$data->InvoiceError;
            $invoice_id=$data->InvoiceId;
            $order_id=$data->CustomerReference;

            $payment_method=$data->InvoiceTransactions[0]->PaymentGateway;

            $subscription=$this->getSubscriptionData($order_id);
            $payment_message = $this->getPaymentStatusMessage($invoice_status, $invoice_error);

            $message="";

            $user=$subscription["user"];
            //update the subscriptions

            if($subscription["payment_status"]==="pending" && $invoice_status==="Paid"){
                CompanyModel::where('ownerId',$user["id"] )->update(['planId' => $subscription['plan_id']]);
                $is_subscription_done=true;
            }

             SubscriptionModel::where('id', $order_id)->update([
                'payment_status' => $invoice_status,
                'is_active' => $is_subscription_done,
                'invoice_error' => $invoice_error,
                'invoice_id' => $invoice_id,
                'payment_message' => $payment_message,
                'payment_method' => $payment_method,
            ]);

            $subscription=$this->getSubscriptionData($order_id);
            if($is_subscription_done){
                return $this->returnIntoPaymentSuccessPage($order_id,"Subscription completed successfully");
            }

            return $this->returnIntoPaymentErrorPage($order_id,$payment_message);
           
            
            // $response = [
            //      "subscription"=>$subscription,
            //      "message"=>$message,
            // ];
        } catch (Exception $ex) {
            $exMessage = __('myfatoorah.' . $ex->getMessage());
             SubscriptionModel::where('id', $order_id)->update([
                'payment_status' => "Failed",
                'is_active' =>false,
                'invoice_error' => $exMessage,
                'invoice_id' => "",
                'payment_message' => "",
                'payment_method' =>"",
            ]);
            return $this->returnIntoPaymentErrorPage($order_id,$exMessage);
            // $subscription=$this->getSubscriptionData($order_id);
            // $response = [
            //      "subscription"=>$subscription,
            //      "message"=>"Payment failed",
            // ];
            
        }
        // return response()->json($response);
    }
    private function getPaymentStatusMessage($status, $error) {
            if ($status == 'Paid') {
                return 'Invoice is paid.';
            } else if ($status == 'Failed') {
                return 'Invoice is not paid due to ' . $error;
            } else if ($status == 'Expired') {
                return $error;
            }
        }
    private function returnIntoPaymentErrorPage($order_id,$message=""){
        return redirect("/payment-error?oid=".$order_id."&message=".$message);
    }
    private function returnIntoPaymentSuccessPage($order_id,$message=""){
        return redirect("/payment-success?oid=".$order_id."&message=".$message);
    }
   
   
   
        private function getTestMessage($status, $error) {
            if ($status == 'Paid') {
                return 'Invoice is paid.';
            } else if ($status == 'Failed') {
                return 'Invoice is not paid due to ' . $error;
            } else if ($status == 'Expired') {
                return $error;
            }
        }

//-----------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Example on how to Display the enabled gateways at your MyFatoorah account to be displayed on the checkout page
     * Provide the checkout method with the order id to display its total amount and currency
     * 
     * @return View
     */
   
 
//-----------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Example on how the webhook is working when MyFatoorah try to notify your system about any transaction status update
     */
    public function webhook(Request $request) {
        try {
            //Validate webhook_secret_key
            $secretKey = config('myfatoorah.webhook_secret_key');
            if (empty($secretKey)) {
                return response(null, 404);
            }

            //Validate MyFatoorah-Signature
            $mfSignature = $request->header('MyFatoorah-Signature');
            if (empty($mfSignature)) {
                return response(null, 404);
            }

            //Validate input
            $body  = $request->getContent();
            $input = json_decode($body, true);
            if (empty($input['Data']) || empty($input['EventType']) || $input['EventType'] != 1) {
                return response(null, 404);
            }

            //Validate Signature
            if (!MyFatoorah::isSignatureValid($input['Data'], $secretKey, $mfSignature, $input['EventType'])) {
                return response(null, 404);
            }

            //Update Transaction status on your system
            $result = $this->changeTransactionStatus($input['Data']);

            return response()->json($result);
        } catch (Exception $ex) {
            $exMessage = __('myfatoorah.' . $ex->getMessage());
            return response()->json(['IsSuccess' => false, 'Message' => $exMessage]);
        }
    }
     private function changeTransactionStatus($inputData) {
        //1. Check if orderId is valid on your system.
        $orderId = $inputData['CustomerReference'];

        //2. Get MyFatoorah invoice id
        $invoiceId = $inputData['InvoiceId'];

        //3. Check order status at MyFatoorah side
        if ($inputData['TransactionStatus'] == 'SUCCESS') {
            $status = 'Paid';
            $error  = '';
        } else {
            $mfObj = new MyFatoorahPaymentStatus($this->mfConfig);
            $data  = $mfObj->getPaymentStatus($invoiceId, 'InvoiceId');

            $status = $data->InvoiceStatus;
            $error  = $data->InvoiceError;
        }

        $message = $this->getTestMessage($status, $error);

        //4. Update order transaction status on your system
        return ['IsSuccess' => true, 'Message' => $message, 'Data' => $inputData];
    }
}
