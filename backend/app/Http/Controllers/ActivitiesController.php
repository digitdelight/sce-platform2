<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Activities;
use App\Content;
use App\ Category;
use App\title;
use Image;
use App\User;
use App\comment_tbs;
class ActivitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Addtype::all()
        return response()->json(Activities::where('status','Y')->get());
    }
    public function getactcat(){
        return response()->json([
           'act'=>Activities::where('status','Y')->get(),
           'cat'=>Category::where('status', 'Y')->get()
        ]);
    }
    public function movetrasha(Request $request)
    {
    $id=$request[0];
     
    //  return $id;
   
    $updatetitle=DB::table('activities')
    ->where('id', $id)
    ->update(['status' =>'Y']); 
  
     return $updatetitle;
    // if($update){
    //     return '
    //         "success":"true"
    //     ';
    // }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data= Activities::create($request->all());
        return $data;
        // return $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $id=$request->id;
     
        //  return $id;
       
        $update=DB::table('activities')
        ->where('id', $id)
        ->update(['actname' =>$request->actname,'destription' => $request->destription]); 
      
        //  return $trash;
        if($update){
            return '
                "success":"true"
            ';
        }
    }
    public function acttrash(Request $request)
    {
        $id=$request[0];
     
        //  return $id;
       
        $trash=DB::table('activities')
    ->where('id', $id)
    ->update(['status' =>'T']); 
    $trash;
        // if($trash){
        //     return '
        //         "success":"true"
        //     ';
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function destroy($id)
    {
        //

        
    }
    public function deleteact(Request $request)
    {
        $id=$request[0];
        // return $id;
         $deleteact=DB::table('activities')->where('id', $id)->delete();
         $deletecat=DB::table('categories')->where('activity_id', 8)->delete();
        $deletet=DB::table('titles')->join('categories','titles.category_id','=','categories.id')->join('activities','categories.activity_id','=','activities.id')
        ->select('titles.*','activity_id')
        ->where('activity_id', 8)->delete();
         $deletec=DB::table('contents')->join('titles','contents.name_id','=','titles.id')->join('categories','titles.category_id','=','categories.id')->join('activities','categories.activity_id','=','activities.id')
         ->select('contents.*','activity_id')
         ->where('activity_id', 8)->delete();
       
   
    return $id;
    }
}
