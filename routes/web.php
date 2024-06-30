<?php

use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\ProfileController;
use App\Models\GeneralSetting;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
// Route::post('/bulk-uploads', [FileUploadController::class,"upload"]);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/site-settings', function () {
    $settings = GeneralSetting::first();
        return response()->json($settings);
});


require __DIR__.'/auth.php';
require __DIR__.'/user.php';
require __DIR__.'/pdf_template.php';
require __DIR__.'/admin.php';
require __DIR__.'/footer.php';
require __DIR__.'/user_settings.php';

