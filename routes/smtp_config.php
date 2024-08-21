<?php

use App\Http\Controllers\SmtpSettingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'super_admin'])->group(function () {
    Route::get('/admin/smtp-config', [SmtpSettingController::class, 'getSmtpConfigView']);
    Route::post('/admin/smtp-config', [SmtpSettingController::class, 'create']);
    Route::put('/admin/smtp-config/{id}', [SmtpSettingController::class, 'update']);
});
