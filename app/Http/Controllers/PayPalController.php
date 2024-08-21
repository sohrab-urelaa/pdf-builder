<?php

namespace App\Http\Controllers;

use App\Models\PayPal;
use App\Models\SubscriptionModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PayPalController extends Controller
{

    private function get_paypal_config($currency = "USD")
    {
        $paypal_config = PayPal::where("is_active", 1)->first();

        $paypal_mode = $paypal_config["test_mode"] === 1 ? "sandbox" : "live";
        $client_id = $paypal_config["client_id"];
        $client_secret = $paypal_config["client_secret"];
        $app_id = $paypal_config["app_id"] ?? "APP-80W284485P519543T";
        $locale = $paypal_config["locale"] ?? "en_US";
        $payment_action = $paypal_config["payment_action"] ?? "Sale";
        return [
            'mode'    => $paypal_mode,
            'sandbox' => [
                'client_id'         => $client_id,
                'client_secret'     => $client_secret,
                'app_id'            => $app_id,
            ],
            'live' => [
                'client_id'         => $client_id,
                'client_secret'     => $client_secret,
                'app_id'            => $app_id,
            ],

            'payment_action' => $payment_action,
            'currency'       => $currency,
            'notify_url'     => env('PAYPAL_NOTIFY_URL', ''),
            'locale'         => $locale,
            'validate_ssl'   => env('PAYPAL_VALIDATE_SSL', true),
        ];
    }

    private function getSubscriptionData($id)
    {
        $subscription = SubscriptionModel::with("user")->find($id);
        return $subscription;
    }

    private function returnIntoPaymentErrorPage($order_id, $message = "")
    {
        return redirect("/payment-error?oid=" . $order_id . "&message=" . $message);
    }
    public function processTransaction(Request $request, $subscription_id)
    {
        $paypal_config = $this->get_paypal_config();

        $provider = new PayPalClient;
        $provider->setApiCredentials($paypal_config);

        $subscription = $this->getSubscriptionData($subscription_id);

        if (!$subscription) {
            return $this->returnIntoPaymentErrorPage($subscription_id, "Invalid Order passed");
        }

        if ($subscription["payment_status"] !== "pending") {
            return $this->returnIntoPaymentErrorPage($subscription_id, "Order already used");
        }

        $customerId = $subscription["user"]["id"];
        $totalAmount = $subscription["amount"];
        // $currency = $subscription["currency"]  ?: "USD";
        $currency =  "USD";

        $paypalToken = $provider->getAccessToken();
        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('successTransaction'),
                "cancel_url" => route('cancelTransaction'),
            ],
            "purchase_units" => [
                0 => [
                    "amount" => [
                        "currency_code" => $currency,
                        "value" => $totalAmount
                    ]
                ]
            ]
        ]);

        Log::info("RESPONSE", ["config" => $response]);
        if (isset($response['id']) && $response['id'] != null) {
            // redirect to approve href
            foreach ($response['links'] as $links) {
                if ($links['rel'] == 'approve') {
                    return redirect()->away($links['href']);
                }
            }
            return redirect()
                ->route('createTransaction')
                ->with('error', 'Something went wrong.');
        } else {
            return redirect()
                ->route('createTransaction')
                ->with('error', $response['message'] ?? 'Something went wrong.');
        }
    }
    public function successTransaction(Request $request)
    {
        $paypal_config = $this->get_paypal_config("USD");
        $provider = new PayPalClient;
        $provider->setApiCredentials($paypal_config);
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request['token']);


        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            return redirect()
                ->route('createTransaction')
                ->with('success', 'Transaction complete.');
        } else {
            return redirect()
                ->route('createTransaction')
                ->with('error', $response['message'] ?? 'Something went wrong.');
        }
    }

    public function cancelTransaction(Request $request)
    {
        return redirect()
            ->route('createTransaction')
            ->with('error', $response['message'] ?? 'You have canceled the transaction.');
    }
}
