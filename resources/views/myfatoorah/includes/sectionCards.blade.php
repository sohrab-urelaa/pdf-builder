@foreach($paymentMethods['cards'] as $mfCard)
@php($mfCardTitle = App::isLocale('ar') ? $mfCard->PaymentMethodAr : $mfCard->PaymentMethodEn)
<div class="mf-card-container mf-div-{{$mfCard->PaymentMethodCode}}" onclick="mfCardSubmit('{{$mfCard->PaymentMethodId}}')">
    <div class="mf-row-container">
        <img class="mf-payment-logo" src="{{$mfCard->ImageUrl}}" alt="{{$mfCardTitle}}">
        <span class="mf-payment-text mf-card-title">{{$mfCardTitle}}</span>
    </div>
    <span class="mf-payment-text">
        {{ $mfCard->GatewayData['GatewayTotalAmount'] }} {{ $mfCard->GatewayData['GatewayCurrency'] }}
    </span>
</div>
@endforeach

<script>
    function getOrderId(){
        const orderId=document.getElementById("order_id_field").value;
        return orderId;
    }
    function mfCardSubmit(pmid){
        const orderId=getOrderId();
        window.location.href = `{{url('myfatoorah')}}?pmid=${pmid}&oid=${orderId}`
    }
</script>
