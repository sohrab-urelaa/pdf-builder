<?php

use App\Http\Controllers\SSlCertificateController;
use App\Http\Controllers\SubmitTemplateController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserSettingsViewController;
use Illuminate\Support\Facades\Route;

//user settings view routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/settings/plans', [UserSettingsViewController::class, 'getUserSettingsPlan'])->name('users.plan');
    Route::get('/settings/users', [UserSettingsViewController::class, 'getUsersSettingsPage'])->name('users.plan');
    Route::get('/settings/signatures', [UserSettingsViewController::class, 'getSigneturePage'])->name('users.sign');
    Route::get('/settings/verify-signatures', [UserSettingsViewController::class, 'getVerifySigneturePage'])->name('users.signVerify');
    Route::get('/settings/profile', [UserSettingsViewController::class, 'getProfilePage'])->name('users.profile');
    Route::get('/settings/company', [UserSettingsViewController::class, 'getCompanyPage'])->name('users.company');
    Route::get('/settings/payments', [UserSettingsViewController::class, 'getUerPaymentPage'])->name('users.payments');
    Route::get('/settings/plans/upgrade', [UserSettingsViewController::class, 'getUpgradePlansPage'])->name('users.membership');
    Route::get('/settings/plans/pay/{planId}/{billing_cycle}', [UserSettingsViewController::class, 'getPayPlanPage'])->name('users.pay_membership');


    //subscriptions model
    Route::post('/settings/subscriptions', [SubscriptionController::class, 'subscribe'])->name('subscription.subscribe');
    Route::post('/settings/certificate', [SSlCertificateController::class, 'store'])->name('certificate.upload');
    Route::post('/settings/update-certificate/{id}', [SSlCertificateController::class, 'update'])->name('certificate.update');
    Route::post('/settings/verify-pdf', [SubmitTemplateController::class, 'verifyTemplate'])->name('pdf.verify');
    Route::delete('/settings/certificate/{id}', [SSlCertificateController::class, 'deleteCertificate'])->name('certificate.delete');
});
