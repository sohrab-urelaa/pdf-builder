<?php

namespace App\Http\Controllers;

use App\Models\CompanyModel;
use App\Models\FooterModel;
use App\Models\FooterSubNavModel;
use App\Models\GeneralSetting;
use App\Models\PlansModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminViewController extends Controller
{
    function home(){
        $current_user=auth()->user();
        return Inertia::render('Admin/AdminHome', ["user"=>$current_user]);
    } 
    function getPlansPage(){
        $current_user=auth()->user();
        $plans=PlansModel::get();
        return Inertia::render('Admin/AdminPlans', ["user"=>$current_user,"plans"=>$plans]);
    }
    function getCompanyPage(){
        $current_user=auth()->user();
        $companies=CompanyModel::with("plan")->with("owner")->get();
        return Inertia::render('Admin/AdminCompany', ["user"=>$current_user,"companies"=>$companies]);
    }


    function getFooterSettingsPage(){
        $current_user=auth()->user();
        $footers = FooterModel::with('subNavs')->get();
        return Inertia::render('Admin/SiteSettings/FooterSettings', 
        [
            "user"=>$current_user,
            "footers"=>$footers
        ]);
    }

    function getGeneralSettingsPage(){
        $current_user=auth()->user();
         $settings = GeneralSetting::first();
        return Inertia::render('Admin/SiteSettings/GeneralSettings', 
        [
            "user"=>$current_user,
            "settings"=>$settings,
        ]);
    }


}
