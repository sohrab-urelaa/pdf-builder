<?php

use App\Http\Controllers\AdminViewController;
use App\Http\Controllers\FooterController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth','admin'])->group(function () {
    Route::post('/admin/footer', [FooterController::class, 'store']);
    Route::get('/admin/footer-json', [FooterController::class, 'getParentFooters']);
    Route::delete('/admin/footer-parent/{id}', [FooterController::class, 'removeFooterParentItem']);
    Route::delete('/admin/footer-child/{id}', [FooterController::class, 'removeFooterChildItem']);
});