<?php

use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupportedLanguageController;
use App\Models\Font;
use App\Models\FooterModel;
use App\Models\GeneralSetting;
use App\Models\HeaderItem;
use App\Models\HeaderSubItem;
use App\Models\SupportedLanguage;
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
    $supported_languages = SupportedLanguage::all();
    $settings = GeneralSetting::first();
    $font = Font::where("is_active", 1)->first();
    return response()->json([
        "settings" => $settings,
        "languages" => $supported_languages,
        "font" => $font
    ]);
});
Route::get('/external-main/{id}', function ($id) {
    $data = HeaderItem::find($id);
    return Inertia::render('ExternalPage', [
        'menuItem' => $data
    ]);
});
Route::get('/external-sub/{id}', function ($id) {
    $data = HeaderSubItem::find($id);
    return Inertia::render('ExternalPage', [
        'menuItem' => $data
    ]);
});
Route::get('/site-navs', function () {
    $footers = [];
    $headers = [];
    $current_user = auth()->user();

    if ($current_user) {
        $headers = HeaderItem::select('id', 'name', 'subModules', 'link', 'public', 'has_dynamic_html')
            ->whereIn('public', ['private', 'both'])
            ->where('nav_type', 'header')
            ->with([
                'subOptions' => function ($query) {
                    $query->select('id', 'created_at', 'nav_item_id', 'image', "title", "description", 'link', 'has_dynamic_html');
                },
            ])
            ->get();
        //fetch footers
        $footers = HeaderItem::select('id', 'name', 'subModules', 'link', 'public', 'has_dynamic_html')
            ->whereIn('public', ['private', 'both'])
            ->where('nav_type', 'footer')
            ->with([
                'subOptions' => function ($query) {
                    $query->select('id', 'created_at', 'nav_item_id', 'image', "title", "description", 'link', 'has_dynamic_html');
                },
            ])
            ->get();
    } else {
        $headers = HeaderItem::select('id', 'name', 'subModules', 'link', 'public', 'has_dynamic_html')
            ->whereIn('public', ['public', 'both'])
            ->where('nav_type', 'header')
            ->with([
                'subOptions' => function ($query) {
                    $query->select('id', 'created_at', 'nav_item_id', 'image', "title", "description", 'link', 'has_dynamic_html');
                },
            ])
            ->get();

        //fetch footers
        $footers = HeaderItem::select('id', 'name', 'subModules', 'link', 'public', 'has_dynamic_html')
            ->whereIn('public', ['private', 'both'])
            ->where('nav_type', 'footer')
            ->with([
                'subOptions' => function ($query) {
                    $query->select('id', 'created_at', 'nav_item_id', 'image', "title", "description", 'link', 'has_dynamic_html');
                },
            ])
            ->get();
    }
    return response()->json([
        "footers" => $footers,
        "headers" => $headers
    ]);
});

require __DIR__ . '/auth.php';
require __DIR__ . '/user.php';
require __DIR__ . '/pdf_template.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/footer.php';
require __DIR__ . '/user_settings.php';
require __DIR__ . '/email_templates.php';
require __DIR__ . '/smtp_config.php';
