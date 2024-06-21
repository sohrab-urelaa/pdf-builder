<?php

use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\TemplateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','admin'])->group(function () {
    Route::get('/pdf-templates', [TemplateController::class, 'index'])->name('template.index');
    Route::get('/submit-templates/{templateId}', [TemplateController::class, 'getTemplate'])->name('submit-templates');
    Route::get('/submitted-templates/{templateId}', [TemplateController::class, 'getSubmittedTemplates'])->name('submitted-templates');
    Route::post('/pdf-templates', [TemplateController::class, 'store'])->name('template.store');
    Route::put('/pdf-templates/{templateId}', [TemplateController::class, 'update'])->name('template.update');
    Route::delete('/pdf-templates/{templateId}', [TemplateController::class, 'destroy'])->name('template.destroy');
    Route::get('/dashboard',[TemplateController::class, 'index'])->name('dashboard');
    Route::get('/template-builder',function(){
        $current_user=auth()->user();
        return Inertia::render('TemplateBuilder', ["user"=>$current_user]);
    })->name("template-builder");
    Route::post("/upload-template",[TemplateController::class,"uploadTemplate"])->name("upload-template");

});
