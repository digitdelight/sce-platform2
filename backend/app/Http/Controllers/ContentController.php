<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Content;
use App\ Category;
use App\title;
use Image;
use App\User;
use App\comment_tbs;
use App\Galleries;
use App\Videos;
use App\Contribute;
use App\Follows;
use App\Users;
class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getcontent($id)
    {
        // return  auth()->user();
        if(auth()->check()){
            return response()->json(
           
                [
        //     'follow'=>Follows::orderBy('titles.id','desc')->join('titles','follows.title_id','=','titles.id')
           
        //     ->join('users','follows.user_id','=','users.id')
        //     ->select('follows.*' )
        //     ->where('follows.user_id','=', auth()->user()->id)
        //    ->where('follows.title_id','=',$id)->count(),
            'name'=>title::orderBy('titles.id','desc')->join('categories','titles.category_id','=','categories.id')
            ->join('activities','categories.activity_id','=','activities.id')
            ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
           ->where('titles.id','=',$id)->get(),
           'gallery'=>Galleries::orderBy('galleries.id','desc')->join('titles','galleries.title_id','=','titles.id')
           ->join('users','titles.user_id','=','users.id')
            ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
           ->where('galleries.title_id','=',$id)
           ->where('galleries.status','=','Y')
           ->get(),
           'video'=>Videos::orderBy('videos.id','desc')->join('titles','videos.title_id','=','titles.id')
           ->join('users','titles.user_id','=','users.id')
            ->select('videos.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
           ->where('videos.title_id','=',$id)
           ->where('videos.status','=','Y')
           ->get(),
           'comment'=>comment_tbs::orderBy('id','desc')->join('titles','comment_tbs.title_id','=','titles.id')
           ->join('users','comment_tbs.user_id','=','users.id')
            ->select('comment_tbs.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
           ->where('comment_tbs.title_id','=',$id)
           ->get(),
           'content'=>Content::orderBy('id','desc')->join('titles','contents.name_id','=','titles.id')
            ->select('contents.*','titles.name_title','titles.location','titles.t_image','titles.views')
           ->where('contents.name_id','=',$id)
           ->get(),
           'contribute'=>Contribute::orderBy('id','desc')->join('titles','contributes.title_id','=','titles.id')
           ->join('users','contributes.user_id','=','users.id')
            ->select('contributes.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
           ->where('contributes.title_id','=',$id)
        //    ->where('contributes.status','=','Y')
           ->get(),
           'cgallery'=>Galleries::orderBy('id','desc')->join('titles','galleries.title_id','=','titles.id')
           ->join('users','titles.user_id','=','users.id')
            ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
           ->where('galleries.title_id','=',$id)
           ->where('galleries.status','=','Y')
           ->where('galleries.contribute','=','C')
           ->get(),
           ]
        );
        }
        return response()->json(
           
            [
        
        'name'=>title::orderBy('titles.id','desc')->join('categories','titles.category_id','=','categories.id')
        ->join('activities','categories.activity_id','=','activities.id')
        ->join('users','titles.user_id','=','users.id')
        ->select('titles.*','categories.catname','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
       ->where('titles.id','=',$id)->get(),
       'gallery'=>Galleries::orderBy('galleries.id','desc')->join('titles','galleries.title_id','=','titles.id')
       ->join('users','titles.user_id','=','users.id')
        ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
       ->where('galleries.title_id','=',$id)
       ->where('galleries.status','=','Y')
       ->get(),
       'video'=>Videos::orderBy('videos.id','desc')->join('titles','videos.title_id','=','titles.id')
       ->join('users','titles.user_id','=','users.id')
        ->select('videos.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
       ->where('videos.title_id','=',$id)
       ->where('videos.status','=','Y')
       ->get(),
       'comment'=>comment_tbs::orderBy('id','desc')->join('titles','comment_tbs.title_id','=','titles.id')
       ->join('users','comment_tbs.user_id','=','users.id')
        ->select('comment_tbs.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
       ->where('comment_tbs.title_id','=',$id)
       ->get(),
       'content'=>Content::orderBy('id','desc')->join('titles','contents.name_id','=','titles.id')
        ->select('contents.*','titles.name_title','titles.location','titles.t_image','titles.views')
       ->where('contents.name_id','=',$id)
       ->get(),
       'contribute'=>Contribute::orderBy('id','desc')->join('titles','contributes.title_id','=','titles.id')
       ->join('users','contributes.user_id','=','users.id')
        ->select('contributes.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
       ->where('contributes.title_id','=',$id)
       ->where('contributes.status','=','Y')
       ->get(),
       'cgallery'=>Galleries::orderBy('id','desc')->join('titles','galleries.title_id','=','titles.id')
       ->join('users','titles.user_id','=','users.id')
        ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
       ->where('galleries.title_id','=',$id)
       ->where('galleries.status','=','Y')
       ->where('galleries.contribute','=','C')
       ->get(),
       ]
    );
    }
    public function getcontentonly($id)
    {
        return response()->json(
            // Activities::where('id','=',1)->get(),
            [
        
       'content'=>content::orderBy('id')->join('titles','contents.name_id','=','titles.id')
        ->select('contents.*','titles.name_title','titles.location','titles.t_image')
       ->where('contents.id','=',$id)
       
       ->get()
       ]
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

    
    public function getactid($id)
    {
        // return $id;
        return response()->json(
        
            Category::where('activity_id','=',$id)->get()
           
        );
    }
    public function store(Request $request)
    {
        
        $authid=auth()->user()->id;
        $image_name= $request->image;
        $request->merge(['user_id'=>$authid]);
        $detcontents = $request->contents;
        $videodet = $request->videos;
        $request->merge(['video_name'=> $videodet]);
        if($image_name == NULL)
        {
            $content= title::create($request-> all());
        $request->merge(['title_id'=>$content->id]);
        Videos::create($request-> all());

            $contentData=[];
                 $file=$item['c_image'];
                 
                    $files=$image_name[0];
                     $filenames=time().'.' . explode('/', explode(':', substr($files, 0, strpos($files,';')))[1])[1];
                    Image::make($files)->resize(300, 300)->save(public_path('/upload/uploads/'.$filenames));
                  $contentData[] =[
                  'header'=>$item['header'],
                  'content' =>$item['content'],
                  'quote'=>$item['quote'],
                  'name_id' => $content->id,
                  'c_image' =>$filename
                  ] ; 
             
           
              Content::insert($contentData);
               return $contentData;
        } else {
            $files=$image_name[0];
            $filenames=time().'.' . explode('/', explode(':', substr($files, 0, strpos($files,';')))[1])[1];
            Image::make($files)->resize(300, 300)->save(public_path('/upload/uploads/'.$filenames));
       
       
        $request->merge(['t_image'=>$filenames]);
   
        $content= title::create($request-> all());
        $request->merge(['title_id'=>$content->id]);
        Videos::create($request-> all());
$imageName=[];
$count = 0;
foreach ($image_name as $img) {
        $file=$img;
       $filename=$count.'.'.time().'.' . explode('/', explode(':', substr($file, 0, strpos($file,';')))[1])[1];
    
        Image::make($file)->resize(300, 300)->save(public_path('/upload/uploads/'.$filename));
    $imageName[] =[
     'title_id' => $content->id,
   'image_name'=> $filename,
    ] ; 
    $count++;
}
 Galleries::insert($imageName);

 $contentData=[];
       $counts = 0;
        foreach ($detcontents as $item) {
            $file=$item['c_image'];
            if($file){
            
            $filename=$counts.''.time().'.' . explode('/', explode(':', substr($file, 0, strpos($file,';')))[1])[1];
         
             Image::make($file)->resize(300, 300)->save(public_path('/upload/uploads/'.$filename));
            }
             $contentData[] =[
             'header'=>$item['header'],
             'content' =>$item['content'],
             'quote'=>$item['quote'],
             'name_id' => $content->id,
             'c_image' =>$filename
             ] ; 
             $counts++;
         }
      
         Content::insert($contentData);
          return $contentData;
        }

//    $videoName=[];
// $count = 0;
// if($videodet){ 
// foreach ( $videodet as $vid) {
//             $file=$vid;
//         //  return $file;
//          $filename= $count.''.time().'.'.$file;
//         //  return $filename;
//          //  $filename=$count.'.'.time().'.' . explode('/', explode(':', substr($file, 0, strpos($file,';')))[1])[1];
//     $path=$file->move(public_path('/upload/videos/'.$filename));
       
//     $videoName[] =[
//      'title_id' => $content->id,
//    'video_name'=> $filename,
//     ] ; 
//     $count++;
// }
// }
//    Videos::insert($videoName);
// return $videoName;
      
    }

 
    public function show($id)
    {
        //
    }

    
    public function edit($id)
    {
        //
    }

    
    public function update(Request $request)
    {
        $id=$request->id;
      $fdata=$request->fdata;
      $name_title=$request->fdata['name_title'];
    $detcontents= $fdata['gcontents'];
    $image_name=$request->galleryimage;
    //   return $request;
    if ($request->t_image){
        $file=$request->t_image;
        $filename=time().'.' . explode('/', explode(':', substr($file, 0, strpos($file,';')))[1])[1];
     
        Image::make($file)->resize(300, 300)->save(public_path('/upload/uploads/'.$filename));
       
        $request->merge(['t_image'=>$filename]);
        $updatet=DB::table('titles')
        ->where('id', $id)
        ->update(['status' =>'E','t_image'=>$request->t_image]);
    }
    $imageName=[];
    if($image_name == NULL){

    } else {
$count = 0;
foreach ($image_name as $img) {
        $file=$img;
       $filename=$count.'.'.time().'.' . explode('/', explode(':', substr($file, 0, strpos($file,';')))[1])[1];
    
        Image::make($file)->resize(300, 300)->save(public_path('/upload/uploads/'.$filename));
    $imageName[] =[
     'title_id' => $id,
   'image_name'=> $filename,
    ] ; 
    $count++;
}
  $gally= Galleries::insert($imageName);
    }
    $updatetitle=DB::table('titles')
    ->where('id', $id)
    ->update(['status' =>'E','name_title'=>$name_title]); 
    foreach ($detcontents as $item) {
       $updates = DB::table('contents')
                    ->where([
                        ['id','=',$item['id']]
                    ])
                    ->update(array('header' => $item['header'], 'content' => $item['content']));
    
    }
    // return $updatetitle;
    
    if($updatetitle || $gally || $updates){
        return $id;
    }else{
        return '
            "success":"Anything change"
        ';
    }
    }
    public function updatelive(Request $request)
    {
    $id=$request->id;
     
    // return $id;
   
    $updatetitle=DB::table('titles')
    ->where('id', $id)
    ->update(['status' =>'Y']); 
  
     return $updatetitle;
    // if($update){
    //     return '
    //         "success":"true"
    //     ';
    // }
    }

    public function updatetrash(Request $request)
    {
    $id=$request->id;
     
    // return $id;
   
    $updatetitle=DB::table('titles')
    ->where('id', $id)
    ->update(['status' =>'N']); 
  
     return $updatetitle;
    // if($update){
    //     return '
    //         "success":"true"
    //     ';
    // }
    }

    public function updateView(Request $request)
    {
        $id=$request;
        return $id;
    // return response()->json(
        
       

    //     $view = DB::where('id', $id)
    //             -get();
            // $data = $request -> count;
            
        // $hh= $view -> views + 1;
   
    // $updatView=DB::table('titles')
    // ->where('id', $id)
    // ->update(['views' =>'Y']); 
  
    //  return $updatetitle;
    // if($update){
    //     return '
    //         "success":"true"
    //     ';
    // }
    // );
    }
    public function trash(Request $request)
    {
        $id=$request[0];
     
    //  return $id;
   
    $trash=DB::table('titles')
    ->where('id', $id)
    ->update(['status' =>'T']); 
  
     return $trash;
    
    }
    public function destroytitle(Request $request)
    {
        $id=$request[0];
    
        $deletet=DB::table('titles')->where('id', $id)->delete();
        $deletec=DB::table('contents')->where('name_id', $id)->delete();
   
    return $id;
    }
    public function destroy($id)
    {
        //
    }
}
