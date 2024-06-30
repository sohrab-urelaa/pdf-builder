<?php

use App\Http\Controllers\AdminViewController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\GeneralSettingsController;
use App\Http\Controllers\PlansController;
use Illuminate\Support\Facades\Route;

//admin view routes
Route::middleware(['auth','admin'])->group(function () {
    Route::get('/admin/home', [AdminViewController::class, 'home'])->name('admin.home');
    Route::get('/admin/plans', [AdminViewController::class, 'getPlansPage'])->name('admin.plans');
    Route::get('/admin/company', [AdminViewController::class, 'getCompanyPage'])->name('admin.company');
    Route::get('/admin/site-settings/footer', [AdminViewController::class, 'getFooterSettingsPage'])->name('admin.footersettings');
    Route::get('/admin/site-settings/general', [AdminViewController::class, 'getGeneralSettingsPage'])->name('admin.generalSettings');
});
//admin post routes
Route::middleware(['auth','admin'])->group(function () {
    //<=================PLAN ROUTES START ===================>
    Route::post('/admin/plans', [PlansController::class, 'store'])->name('plans.create');
    Route::put('/admin/plans/{id}', [PlansController::class, 'update']);
    Route::delete('/admin/plans/{id}', [PlansController::class, 'destroy'])->name('plans.destroy');
    Route::get('/admin/plans/json', [PlansController::class, 'getJSONPlans']);
    //<=================COMPANY ROUTES START ===================>
    Route::post('/admin/company', [CompanyController::class, 'store'])->name('company.create');
    Route::put('/admin/company/{id}', [CompanyController::class, 'update']);
    Route::delete('/admin/company/{id}', [CompanyController::class, 'destroy'])->name('company.destroy');
    Route::post('/admin/company-owner', [CompanyController::class, 'createCompanyOwner'])->name('company.createOwner');


    //<===================GENERAL SITE SETTINGS=====================>

    Route::post('/admin/general-settings', [GeneralSettingsController::class, 'saveOrUpdate'])->name('generalSettings.create');


});