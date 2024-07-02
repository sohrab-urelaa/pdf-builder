<?php

namespace App\Http\Controllers;

use App\Mail\TemplateSubmitted;
use App\Models\CompanyModel;
use App\Models\FooterModel;
use App\Models\FooterSubNavModel;
use App\Models\GeneralSetting;
use App\Models\PdfTemplate;
use App\Models\PlansModel;
use App\Models\SubmittedTemplate;
use App\Models\SubscriptionModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminViewController extends Controller
{
    function home(){
        $current_user=auth()->user();

        $adminCount = User::where('role', 'admin')->count();
        $userCount = User::where('role', 'user')->count();
        $pdfTemplateCount = PdfTemplate::count();
        $submissionsCount = SubmittedTemplate::count();
        $subscriptionCount = SubscriptionModel::where("is_active",true)->count();
        $companyCount = CompanyModel::count();
         $users = DB::table('users')
            ->selectRaw('DATE_FORMAT(created_at, "%M %Y") as name, COUNT(*) as userRegistered')
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%M %Y")'))
            ->orderBy('created_at', 'asc')
            ->get();

         $template_creation = DB::table('pdf_template')
            ->selectRaw('DATE_FORMAT(created_at, "%M %Y") as name, COUNT(*) as templateCreated')
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%M %Y")'))
            ->orderBy('created_at', 'asc')
            ->get();

        $subscriptions = DB::table('subscriptions')
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%M %Y") as name'),
                DB::raw('SUM(amount) as totalSubscriptionsAmount'),
                DB::raw('COUNT(*) as totalSubscriptionsCount')
            )
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%M %Y")'))
            ->orderBy(DB::raw('MIN(created_at)'), 'asc')
            ->get();

        $data=[
            "totalAdmin"=>$adminCount,
            "totalUser"=>$userCount,
            "totalTemplate"=>$pdfTemplateCount,
            "totalSubmissions"=>$submissionsCount,
            "totalSubscription"=>$subscriptionCount,
            "totalCompany"=>$companyCount,
            "userRegistrationGraph"=>$users,
            "subscriptionGraph"=>$subscriptions,
            "templateCreationGraph"=>$template_creation,
        ];


        return Inertia::render('Admin/AdminHome', [
            "user"=>$current_user,
            "data"=>$data,
        ]);
    } 
    function getPlansPage(){
        $current_user=auth()->user();
        $plans=PlansModel::get();
        return Inertia::render('Admin/AdminPlans', ["user"=>$current_user,"plans"=>$plans]);
    }
    function getCompanyPage(){
        $current_user=auth()->user();
        $companies=CompanyModel::with("plan")->with("owner")->paginate(7);
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


    function getAdminsPage(){
        $current_user=auth()->user();
        $admins=User::where("role","admin")->paginate(7);
        return Inertia::render('Admin/AdminAdmins', 
        [
            "user"=>$current_user,
            "users"=>$admins,
        ]);
    }
    function getUsersPage(){
        $current_user=auth()->user();
        $users=User::where("role","user")->paginate(7);
        return Inertia::render('Admin/AdminUsers', 
        [
            "user"=>$current_user,
            "data"=>$users,
        ]);
    }
    function getSubscriptions(){
        $current_user=auth()->user();
        $data=SubscriptionModel::with("user")->with("plan")->with("company")->paginate(7);
        return Inertia::render('Admin/AdminSubscriptions', 
        [
            "user"=>$current_user,
            "data"=>$data,
        ]);
    }
    function getPdfTemplatesPage(){
        $current_user=auth()->user();
        $data=PdfTemplate::with("owner")->paginate(7);
        return Inertia::render('Admin/AdminPdfTemplates', 
        [
            "user"=>$current_user,
            "data"=>$data,
        ]);
    }
    function getPdfSubmissionsPage($templateId=null){
        $current_user=auth()->user();
        $pdf_templates=null;
        if($templateId){
            $pdf_templates = SubmittedTemplate::where("template_id",$templateId)
                        ->with("user")
                        ->with("parent_template")
                        ->with("owner")
                        ->paginate(7);
        }else{
             $pdf_templates = SubmittedTemplate::with("user")
                        ->with("parent_template")
                        ->with("owner")
                        ->paginate(7);
        }
       
        return Inertia::render('Admin/AdminPdfSubmissions', 
        [
            "user"=>$current_user,
            "data"=>$pdf_templates,
        ]);
    }


}
