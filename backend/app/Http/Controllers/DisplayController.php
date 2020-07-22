<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\title;
use App\Category;
use App\Content;
use App\Activities;
use App\comment_tbs;
use App\User;
use App\Galleries;
use App\Follows;
use App\url_setting;
use App\Likes;
class DisplayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function displaytimelinebyuser()
    {
        $id=auth()->user()->id;
        return response()->json(
        title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
        ->join('activities','categories.activity_id','=','activities.id')
        ->join('users','titles.user_id','=','users.id')
        ->join ('contents','titles.id','=','contents.name_id')
        ->select('titles.*','categories.catname','titles.user_id','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
        ->where('titles.status','=','Y')
        ->where('titles.user_id','=',$id)
        ->get()
        );
    }
    public function displaytimelinebyfollow()
    {
        $id=auth()->user()->id;
        
        return response()->json(
            follows::join('titles','follows.title_id','=','titles.id')
            ->select('follows.*','titles.status','titles.user_id')
            // ->where('titles.status','=','Y')
            ->where('follows.user_id','=',$id)->get()
        );
      
    



    }
    public function displaygallery()
    {
        $id=auth()->user()->id;
        return response()->json(
            
            [

        'gallery'=>Galleries::orderBy('id')->join('titles','galleries.title_id','=','titles.id')
       ->join('users','titles.user_id','=','users.id')
        ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email','titles.user_id')
       ->where('titles.user_id','=',$id)
       ->get(),

            ]
        );
    }
    public function displayactbytitle()
    {
        return response()->json(
            
            [

                'event' =>Activities::all(),
                'subevent'=>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->select('titles.*','categories.catname','categories.destription','categories.activity_id')
            //    ->where('activity_id','=',1)
            ->where('status','=','Y')
               ->inRandomOrder()->limit(4)
                ->get()

            ]
        );
    }
    public function displayevent()
    {
        return response()->json(
            
            [
                // 'comment' =>comment_tbs::where('id','=',1)->get(),
                'event' =>Activities::where('id','=',2)->get(),
                'subevent'=>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->select('titles.*','categories.catname','categories.destription','categories.activity_id')
               ->where('activity_id','=',2)
               ->where('titles.status','=','Y')
               ->inRandomOrder()->limit(4)
                ->get()
            ]
            
        );
    }

    
    public function displayartifact()
    {
      
       return response()->json(
            [

                'event' =>Activities::where('id','=',6)->get(),
                'subevent'=>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->select('titles.*','categories.catname','categories.destription','categories.activity_id')
               ->where('activity_id','=',6)
               ->where('titles.status','=','Y')
            ->inRandomOrder()->limit(4)
               ->get()
            ]
        );
        
        
    }
    public function displaybusiness()
    {
        return response()->json(
            [

                'event' =>Activities::where('id','=',7)->get(),
                
                'subevent'=>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->select('titles.*','categories.catname','categories.destription','categories.activity_id')
               ->where('activity_id','=',7)
               ->where('titles.status','=','Y')
               ->inRandomOrder()->limit(4)
                ->get()
            ]
        );
    }
    public function displaypeople()
    {
        return response()->json(
            [
                'event' =>Activities::where('id','=',4)->get(),
                'subevent'=>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->select('titles.*','categories.catname','categories.destription','categories.activity_id')
               ->where('activity_id','=',4)
               ->where('titles.status','=','Y')
               ->inRandomOrder()->limit(4)
              ->get()
            ]
        );
    }

    public function displaytourist()
    {
        return response()->json(
            [

                'event' =>Activities::where('id','=',3)->get(),
                'subevent'=>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename')
              ->where('activity_id','=',3)
              ->where('titles.status','=','Y')
              ->inRandomOrder()->limit(4)
               ->get()
            ]
        );
    }
    public function displaynews()
    {
        return response()->json(
            [

                'event' =>Activities::where('id','=',5)->get(),
                'subevent'=>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename')
              ->where('activity_id','=',5)
              ->where('titles.status','=','Y')
              ->inRandomOrder()->limit(4)
               ->get()
            ]
        );
    }

    public function getalltitle()
    {
        return response()->json(
          
                title::orderBy('id')->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename') 
               ->get()
        
        );
    }

    public function getalladmintitle()
    {
        return response()->json(
          
                title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename') 
            ->limit(10) 
            ->get()
        
        );
    }
   
    public function getfootertitle()
    {
        return response()->json([
            title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
            ->select('titles.*','categories.catname')
            ->where('titles.status','=','Y')

            ->inRandomOrder()->limit(4)
               ->get()
        ]);
    }


    public function usertrashtitle()
    {
        return response()->json(
           User::orderBy('id', 'desc')->where('status','=','T')
            ->get()
    
    );
    }
    public function cattrashtitle()
    {
        return response()->json(
           Category::orderBy('id', 'desc')->where('status','=','T')
            ->get()
    
    );
    }
    public function acttrashtitle()
    {
        return response()->json(
           Activities::orderBy('id', 'desc')->where('status','=','T')
            ->get()
    
    );
    }
    public function getalltrashtitle()
    {
        return response()->json(
          
            title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id')

           ->where('titles.status','=','T')

            ->get()
    
    );
    }
    
    public function search($searchTerm)
    {
       
       
        return response()->json(
            title::whereLike(['location', 'name_title'], $searchTerm)->get()
            
        
        );
    }

    public function gettitles($id)
    {
        if(auth()->check()){
        return response()->json([
          
            'title'=> title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
            ->join('activities','categories.activity_id','=','activities.id')
            ->join('users','titles.user_id','=','users.id')
            ->join ('contents','titles.id','=','contents.name_id')
            ->select('titles.*','categories.catname','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')  
            ->where('activity_id','=',$id)
            ->where('titles.status','=','Y')
               ->get(),
               'foll'=>title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
               ->join('activities','categories.activity_id','=','activities.id')
               ->join('users','titles.user_id','=','users.id')
               ->leftJoin('follows','titles.user_id','=','follows.followed_user_id')
               ->join ('contents','titles.id','=','contents.name_id')
               ->select('titles.*','follows.followed_user_id','follows.user_id as following_user_id' ,'categories.catname','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
               ->where('titles.status','=','Y')
               ->where('activity_id','=',$id)
               ->where('follows.user_id','=', auth()->user()->id)
               ->get(),
               'liked'=>title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
            ->join('activities','categories.activity_id','=','activities.id')
            ->join('users','titles.user_id','=','users.id')
               ->join ('contents','titles.id','=','contents.name_id')
               ->join ('likes','titles.id','=','likes.title_id')
            ->select('titles.*','categories.catname','contents.header','contents.content','contents.id as content_id','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
            ->where('titles.status','=','Y')
            ->where('activity_id','=',$id)
        ->where('likes.user_id','=', auth()->user()->id)
            ->get(),
               'follow'=>Follows::join('titles','follows.title_id','=','titles.id')
               ->join('users','follows.user_id','=','users.id')
               ->select('follows.*')
               ->where('follows.user_id','=', auth()->user()->id)
              ->get(),
              'like'=>Likes::join('titles','likes.title_id','=','titles.id')
              ->join('users','likes.user_id','=','users.id')
              ->select('follows.*', )
              ->where('likes.user_id','=', auth()->user()->id)
             ->get(),
            'acti' =>Activities::where('id','=', $id)->get(),
            'cat' =>Category::where('activity_id','=', $id)->get()
        
        ]);
        }
        return response()->json([
          
            'title'=> title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
            ->join('activities','categories.activity_id','=','activities.id')
            ->join('users','titles.user_id','=','users.id')
            ->join ('contents','titles.id','=','contents.name_id')
            ->select('titles.*','categories.catname','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')  
            ->where('activity_id','=',$id)
            ->where('titles.status','=','Y')
               ->get(),
              
            'acti' =>Activities::where('id','=', $id)->get(),
            'cat' =>Category::where('activity_id','=', $id)->get()
        
        ]);
    }
    public function gettitlesforadmin($id)
    {
        return response()->json([
          
               'title'=> title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename')
            ->where('activity_id','=',$id)
               ->get(),
            'acti' =>Activities::where('id','=', $id)->get(),
            'cat' =>Category::where('activity_id','=', $id)->get()
        
        ]);
    }
    public function getUtitles()
    {
        $id=auth()->user()->id;
        // return $id;
        return response()->json([
          
               'title'=> title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename')
            ->where('user_id','=',$id)
           
               ->get(),
            
        
        ]);
    }
    
    public function getUContent()
    {
        $id=auth()->user()->id;
        // return $id;
        return response()->json([
           'ucontents'=> content::orderBy('id','desc')  ->join('titles','contents.name_id','=','titles.id')
               ->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('contents.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename')
            ->where('user_id','=',$id)
           
               ->get(),
          
        
        ]);
    }

    public function getUrl(){
        // $url = DB:: table(url_setting)->get();
        // return json_encode($url);
        return response()->json([
          
            'url' =>url_setting::select('url')->get(),
            
        
        ]);
    }
}
