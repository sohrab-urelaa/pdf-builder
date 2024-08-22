<?php

use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\SubmitTemplateController;
use App\Http\Controllers\TemplateController;
use App\Models\PdfTemplate;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'authGard:user,admin'])->group(function () {
    Route::get('/pdf-templates', [TemplateController::class, 'index'])->name('template.index');
    Route::get('/submitted-templates/{templateId}', [TemplateController::class, 'getSubmittedTemplates'])->name('submitted-templates');
    Route::post('/pdf-templates', [TemplateController::class, 'store'])->name('template.store');
    Route::post('/pdf-templates/send-invitations/{id}', [TemplateController::class, 'sendInvitaions'])->name('template.sendInvitaions');
    Route::put('/pdf-templates/{id}', [TemplateController::class, 'update'])->name('template.update');
    Route::delete('/pdf-templates/{templateId}', [TemplateController::class, 'delete'])->name('template.destroy');
    Route::get('/dashboard', [TemplateController::class, 'index'])->name('dashboard');
    Route::get('/submissions', [TemplateController::class, 'getSubmissions'])->name('submissions');
    Route::get('/template-builder/{templateId}', function ($templateId) {
        $current_user = auth()->user();
        $template = PdfTemplate::find($templateId);
        return Inertia::render('TemplateBuilder', ["user" => $current_user, "template" => $template]);
    })->name("template-builder");


    // Route::post("/upload-template",[TemplateController::class,"uploadTemplate"])->name("upload-template");

});

Route::get('/submit-templates/{templateId}', [TemplateController::class, 'getTemplate'])->name('submit-templates');
Route::post("/upload-template", [SubmitTemplateController::class, "uploadTemplate"])->name("upload-template");
Route::get("/qr-submit/", [TemplateController::class, "getQrScannerPage"])->name("qr-upload");
