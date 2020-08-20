<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Content;
use App\ Category;
use App\title;
use Image;
use App\User;
use App\comment_tbs;
use App\Galleries;
use App\Videos;
use App\Contribute;
class ContributeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        return response()->json(
            Contribute::orderBy('id','desc')
            ->select('contributes.*')
            ->where('status','=','N')
            ->get()
            );
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
        $authid=auth()->user()->id;
        $image= $request->c_image;
        $data=$request->formdata;
        if($image){
            $files=$image;
            $filenames=time().'.' . explode('/', explode(':', substr($files, 0, strpos($files,';')))[1])[1];
           Image::make($files)->save(public_path('/upload/uploads/'.$filenames));
          
           $request->merge(['c_image'=>$filenames]);
        }
          $request->merge(['user_id'=>$authid]);
          $request->merge(['header'=>$data['header']]);
          $request->merge(['content'=>$data['content']]);
          $request->merge(['quote'=>$data['quote']]);
          $request->merge(['title_id'=>$data['title_id']]);
          $request->merge(['content_id'=>$data['content_id']]);
          $request->merge(['status'=>'E']);
        $contribute=Contribute::create($request-> all());
        return $contribute;
    }
    public function contributeimage(Request $request)
    {
        $authid=auth()->user()->id;
        $image= $request->c_image;
        $request->merge(['user_id'=>$authid]);
       
        $request->merge(['title_id'=>$request->title_id]);
        $request->merge(['status'=>'C']);
        $request->merge(['contribute'=>'C']);
        // return $request;
            $files=$image;
            $filenames=time().'.' . explode('/', explode(':', substr($files, 0, strpos($files,';')))[1])[1];
           Image::make($files)->save(public_path('/upload/uploads/'.$filenames));
          
           $request->merge(['image_name'=>$filenames]);
      
        $contribute=Galleries::create($request-> all());
        return $contribute;
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
    public function editimgcontribute(Request $request)
    {
        $id=$request[0];
        $trash=DB::table('galleries')
    ->where('id', $id)
    ->update(['status' =>'Y']); 
    return $id;
        
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
        $image= $request->c_image;
        $data=$request->formdata;
        if($image){
            $files=$image;
            $filenames=time().'.' . explode('/', explode(':', substr($files, 0, strpos($files,';')))[1])[1];
           Image::make($files)->save(public_path('/upload/uploads/'.$filenames));
          
           $request->merge(['c_image'=>$filenames]);
        }
        //   $request->merge(['user_id'=>$authid]);
          $request->merge(['header'=>$data['header']]);
          $request->merge(['content'=>$data['content']]);
          $request->merge(['quote'=>$data['quote']]);
          $request->merge(['title_id'=>$data['title_id']]);
          $request->merge(['content_id'=>$data['content_id']]);
          $updatec=DB::table('contributes')
          ->where('content_id', $request->content_id)
          ->update(['status' =>'Y','c_image'=>$request->c_image,'header'=>$request->header,'content'=>$request->content,'quote'=>$request->quote]);
        //  return $updatec;
          $updatet=DB::table('contents')
          ->where('id', $request->content_id)
          ->update(['c_image'=>$request->c_image,'header'=>$request->header,'content'=>$request->content,'quote'=>$request->quote]);
          return $updatet;
        }
       
    public function livecontribute()
    {
    //   $id=$request[0]
    return response()->json(
        Contribute::orderBy('id','desc')
        ->select('contributes.*')
        ->where('status','=','Y')
        ->get()
        );
    }
    public function imgcontribute()
    {
    //   $id=$request[0]
    return response()->json(
        Galleries::orderBy('id','desc')
        ->select('galleries.*')
        ->where('status','=','C')
        ->get()
        );
    }
    public function rejectPost(Request $request)
    {
        $updatet=DB::table('titles')
        ->where('id', $request[0])
        ->update(['status'=>'T']);
        return $updatet;
    }
    public function rejectContribution(Request $request)
    {
        $updatet=DB::table('contributes')
        ->where('id', $request[0])
        ->update(['status'=>'T']);
        return $updatet;
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
}
