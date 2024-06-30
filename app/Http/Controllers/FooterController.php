<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFooterItemRequest;
use App\Models\FooterModel;
use App\Models\FooterSubNavModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FooterController extends Controller
{
     public function store(StoreFooterItemRequest $request)
    {
        $footerItem=null;
        if($request->footer_id){
            $footerItem["id"]=$request->footer_id;
        }else{
            $footerItem=FooterModel::create([
                'title' => $request->title
            ]);
        }

        foreach ($request->subNavs as $subNav) {
            FooterSubNavModel::create([
                 'title' => $subNav['title'],
                    'link' => $subNav['link'],
                    'footer_id' => $footerItem['id'],
            ]);
        }
        return response()->json([
            "message"=>"Footer Created Successfully",
            "success"=>true
        ]);
    }  

    function getParentFooters(){
         $footers = FooterModel::get();
         return response()->json([
            "message"=>"Footer List",
            "success"=>true,
            "data"=>$footers,
        ]);
    }
    function removeFooterParentItem($id){
        $record = FooterModel::find($id);
        if (!$record) {
            return response()->json(['message' => 'Footer not found'], 404);
        }
        $record->delete();
        return response()->json(['message' => 'Footer deleted successfully'], 200);
   
    }
    function removeFooterChildItem($id){
        $record = FooterSubNavModel::find($id);
        if (!$record) {
            return response()->json([
                    'message' => 'Footer not found',
                    'success' => false,
                ], 404);
        }
        $record->delete();
        return response()->json([
            'message' => 'Footer deleted successfully',
            'success' => true,
        ], 200);
   
    }

}
