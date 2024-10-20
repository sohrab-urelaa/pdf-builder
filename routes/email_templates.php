<?php

use App\Http\Controllers\AdminViewController;
use App\Http\Controllers\AutomationMailController;
use App\Http\Controllers\EmailTemplatesController;
use App\Http\Controllers\FooterController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'super_admin'])->group(function () {
    Route::get('/admin/email-templates', [EmailTemplatesController::class, 'getEmailTemplatesView']);
    Route::get('/admin/bulk-emailing', [EmailTemplatesController::class, 'getBulkEmailView']);
    Route::get('/admin/mail-config', [EmailTemplatesController::class, 'getAutomaionMailConfigView']);
    Route::get('/admin/edit-email-templates/{id}', [EmailTemplatesController::class, 'getEditTemplateView']);
    Route::put('/admin/edit-email-templates/{id}', [EmailTemplatesController::class, 'editTemplate']);
    Route::post('/admin/bulk-emailing/', [EmailTemplatesController::class, 'sendBulkEmail']);
});
Route::middleware(['auth', 'authGard:user,admin,super_admin'])->group(function () {
    Route::get('/invoice-email-templates/{subscriptionId}', [EmailTemplatesController::class, 'getSubscriptionEmailTemplate']);
});
Route::middleware(['auth'])->group(function () {
    //<===================mail automation api===================>
    Route::post('/admin/mail-automation-config/', [AutomationMailController::class, 'store'])->name('automationMail.save');
});
