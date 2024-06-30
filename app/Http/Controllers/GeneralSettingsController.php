<?php

namespace App\Http\Controllers;

use App\Models\GeneralSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GeneralSettingsController extends Controller
{
     public function index()
    {
        $settings = GeneralSetting::first();
        return response()->json($settings);
    }

    public function saveOrUpdate(Request $request)
    {
         $validated = $request->validate([
            'site_name' => 'nullable|string|max:255',
            'theme' => 'nullable|string|max:255',
            'site_description' => 'nullable|string',
            'site_logo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'favicon' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,ico|max:2048',
            'default_language' => 'nullable|string|max:255',
            'time_zone' => 'nullable|string|max:255',
            'contact_email' => 'nullable|string|email|max:255',
        ]);

        $setting = GeneralSetting::first();
        if ($request->hasFile('site_logo')) {
            if ($setting && $setting->site_logo) {
                Storage::disk('public')->delete($setting->site_logo);
            }
            $path = $request->file('site_logo')->store('logos', 'public');
            $full_path=asset('storage/' . $path);

            $validated['site_logo'] = $full_path;
        }

        if ($request->hasFile('favicon')) {
            if ($setting && $setting->favicon) {
                Storage::disk('public')->delete($setting->favicon);
            }
            $path = $request->file('favicon')->store('favicons', 'public');
             $full_path=asset('storage/' . $path);
            $validated['favicon'] = $full_path;
        }

        if ($setting) {
            $setting->update($validated);
        } else {
            $setting = GeneralSetting::create($validated);
        }

        return response()->json($setting);
    }
}
