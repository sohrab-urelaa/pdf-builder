<?php

use App\Http\Controllers\PayPalController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\UserController;
use App\Models\SubscriptionModel;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users');

    Route::post('/users', [UserController::class, 'createUser'])->name("users.create");
    Route::post('/users-update/{id}', [UserController::class, 'updateUser'])->name("users.update");
    Route::delete('/users/{id}', [UserController::class, 'destroyUser'])->name("users.delete");

    Route::get(
        '/payment-error',
        function () {
            $orderId = request('oid');
            $message = request('message') ?? "Invalid Payment";
            $payment_message = request('pmessage') ?? "";
            $subscription = SubscriptionModel::with("user")->find($orderId);
            return Inertia::render(
                'Payments/PaymentErrorPage',
                [
                    "subscription" => $subscription,
                    "message" => $message,
                    "payment_message" => $payment_message,
                ]
            );
        }
    )->name("payment.error");
    Route::get(
        '/payment-success',
        function () {
            $orderId = request('oid');
            $message = request('message') ?? "Invalid Payment";
            $payment_message = request('pmessage') ?? "";
            $subscription = SubscriptionModel::with("user")->find($orderId);
            return Inertia::render(
                'Payments/PaymentSuccessPage',
                [
                    "subscription" => $subscription,
                    "message" => $message,
                    "payment_message" => $payment_message,
                ]
            );
        }
    )->name("payment.error");




    Route::get('/process-transaction/{id}', [PayPalController::class, 'processTransaction'])->name('processTransaction');
    Route::get('success-transaction', [PayPalController::class, 'successTransaction'])->name('successTransaction');
    Route::get('cancel-transaction', [PayPalController::class, 'cancelTransaction'])->name('cancelTransaction');
});
