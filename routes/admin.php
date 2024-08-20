<?php

use App\Http\Controllers\AdminViewController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\FontController;
use App\Http\Controllers\GeneralSettingsController;
use App\Http\Controllers\HeaderItemController;
use App\Http\Controllers\MyFatoorahAdminController;
use App\Http\Controllers\PaymentGetwayForCountriesController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\SupportedLanguageController;
use App\Models\PaymentGetwaysForCountries;
use Illuminate\Support\Facades\Route;

//admin view routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/home', [AdminViewController::class, 'home'])->name('admin.home');
    Route::get('/admin/plans', [AdminViewController::class, 'getPlansPage'])->name('admin.plans');
    Route::get('/admin/company', [AdminViewController::class, 'getCompanyPage'])->name('admin.company');
    Route::get('/admin/admin-list', [AdminViewController::class, 'getAdminsPage'])->name('admin.adminList');
    Route::get('/admin/user-list', [AdminViewController::class, 'getUsersPage'])->name('admin.userList');
    Route::get('/admin/subscriptions', [AdminViewController::class, 'getSubscriptions'])->name('admin.subscriptions');
    Route::get('/admin/templates', [AdminViewController::class, 'getPdfTemplatesPage'])->name('admin.pdfTemplates');
    Route::get('/admin/submissions/{templateId?}', [AdminViewController::class, 'getPdfSubmissionsPage'])->name('admin.pdfSubmissions');
    Route::get('/admin/site-settings/footer', [AdminViewController::class, 'getFooterSettingsPage'])->name('admin.footersettings');
    Route::get('/admin/site-settings/general', [AdminViewController::class, 'getGeneralSettingsPage'])->name('admin.generalSettings');
    Route::get('/admin/site-settings/header', [AdminViewController::class, 'getHeaderPage'])->name('admin.headersettings');
    Route::get('/admin/language/', [AdminViewController::class, 'getMultiLangPage'])->name('admin.language');
    Route::get('/admin/language/create/{id?}', [AdminViewController::class, 'getCreateLanguagePage'])->name('admin.language.create');
    Route::get('/admin/certificates', [AdminViewController::class, 'getCertificatePage'])->name('admin.certificate');
    Route::get('/admin/site-settings/font', [AdminViewController::class, 'getFontPage'])->name('admin.font');

    Route::get('/admin/country', [AdminViewController::class, 'getCountryPage'])->name('admin.countryPage');
    Route::get('/admin/payment-getway/my-fatoorah', [AdminViewController::class, 'getMyFatoorahPage'])->name('admin.myFatoorah');
    Route::get('/admin/payment-getway/home', [AdminViewController::class, 'getPaymentGetwayPage'])->name('admin.paymentGetwayPage');
});
//admin post routes
Route::middleware(['auth', 'admin'])->group(function () {
    //<=================PLAN ROUTES START ===================>
    Route::post('/admin/plans', [PlansController::class, 'store'])->name('plans.create');
    Route::post('/admin/plans-update/{id}', [PlansController::class, 'update']);
    Route::delete('/admin/plans/{id}', [PlansController::class, 'destroy'])->name('plans.destroy');
    Route::get('/admin/plans/json', [PlansController::class, 'getJSONPlans']);
    //<=================COMPANY ROUTES START ===================>
    Route::post('/admin/company', [CompanyController::class, 'store'])->name('company.create');
    Route::post('/admin/company-update/{id}', [CompanyController::class, 'update']);
    Route::delete('/admin/company/{id}', [CompanyController::class, 'destroy'])->name('company.destroy');
    Route::post('/admin/company-owner', [CompanyController::class, 'createCompanyOwner'])->name('company.createOwner');


    //<===================GENERAL SITE SETTINGS=====================>

    Route::post('/admin/general-settings', [GeneralSettingsController::class, 'saveOrUpdate'])->name('generalSettings.create');


    //<==================LANGUAGE RELATED APIS=========================>


    Route::post('/admin/language', [SupportedLanguageController::class, 'store'])->name('language.create');
    Route::post('/admin/language-update', [SupportedLanguageController::class, 'update'])->name('language.update');
    Route::delete('/admin/language-delete/{id}', [SupportedLanguageController::class, 'destroy'])->name('language.destroyLang');

    //<==================LANGUAGE RELATED APIS=========================>
    Route::post('/admin/header', [HeaderItemController::class, 'store'])->name('header.create');
    Route::post('/admin/header-update/{id}', [HeaderItemController::class, 'update'])->name('header.update');
    Route::delete('/admin/header/{id}', [HeaderItemController::class, 'delete'])->name('header.destroy');

    Route::get('/admin/sub-header/{id}', [HeaderItemController::class, 'getSubHeaders'])->name('subHeader.get');
    Route::post('/admin/sub-header', [HeaderItemController::class, 'storeSubHeader'])->name('subHeader.create');
    Route::post('/admin/sub-header-update/{id}', [HeaderItemController::class, 'editSubHeader'])->name('subHeader.update');
    Route::delete('/admin/sub-header/{id}', [HeaderItemController::class, 'deleteSubHeader'])->name('subHeader.destroy');


    //<================FONT RELATED APIS=======================>
    Route::post('/admin/font', [FontController::class, 'store'])->name('font.create');
    Route::post('/admin/font-update/{id}', [FontController::class, 'update'])->name('font.update');
    Route::delete('/admin/font/{id}', [FontController::class, 'delete'])->name('font.destroy');

    //<================My Fatoorah Crud api=======================>
    Route::post('/admin/my-fatoorah', [MyFatoorahAdminController::class, 'store'])->name('myFatoorah.create');
    Route::post('/admin/my-fatoorah-update/{id}', [MyFatoorahAdminController::class, 'update'])->name('myFatoorah.update');
    Route::delete('/admin/my-fatoorah/{id}', [MyFatoorahAdminController::class, 'delete'])->name('myFatoorah.destroy');

    //<================My Fatoorah Crud api=======================>
    Route::get('/admin/country-json', [CountryController::class, 'index'])->name('country.index');
    Route::post('/admin/country', [CountryController::class, 'store'])->name('country.create');
    Route::post('/admin/country-update/{id}', [CountryController::class, 'update'])->name('country.update');
    Route::delete('/admin/country/{id}', [CountryController::class, 'delete'])->name('country.destroy');

    //<================Payment Getway For Countries api=======================>
    Route::post('/admin/payment-getway', [PaymentGetwayForCountriesController::class, 'store'])->name('paymentGetway.create');
    Route::post('/admin/payment-getway-update/{id}', [PaymentGetwayForCountriesController::class, 'update'])->name('paymentGetway.update');
    Route::delete('/admin/payment-getway/{id}', [PaymentGetwayForCountriesController::class, 'delete'])->name('paymentGetway.destroy');
});
