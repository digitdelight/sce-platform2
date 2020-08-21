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
use App\Contribute;
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
          [
            'title' =>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename') 
           ->where('titles.status','=','N')
            // ->limit(10) 
            ->get(),
            'gallery'=>Galleries::orderBy('id','desc')->join('titles','galleries.title_id','=','titles.id')
            ->join('users','titles.user_id','=','users.id')
             ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
             ->where('titles.status','=','N')
             //    ->where('title_id','=',$id)
            ->get(),
        
    ]);
        
    }
    public function getallrecenttitle()
    {
        $ydate = date('Y-m-d 00-00-00');
        $ldate = date('Y-m-d');
        // return $ydate;
        return response()->json(
          [
            'title' =>title::orderBy('id', 'desc')->join('categories','titles.category_id','=','categories.id')
                ->join('users','titles.user_id','=','users.id')
            ->select('titles.*','categories.catname','categories.destription','categories.activity_id','users.firstname','users.lastname','users.middlename') 
        //    ->where('titles.status','=','N')
        ->where('titles.updated_at','>',$ydate)
        //    ->whereBetween('titles.updated_at',array($ydate, $ldate))
            // ->limit(10) 
            ->get(),
            'gallery'=>Galleries::orderBy('id','desc')->join('titles','galleries.title_id','=','titles.id')
            ->join('users','titles.user_id','=','users.id')
             ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
            //  ->where('titles.status','=','N')
            ->where('titles.updated_at','=',$ldate)
            // ->whereBetween('titles.updated_at',array($ydate,$ldate))
             //    ->where('title_id','=',$id)
            ->get(),
        
    ]);
        
    }
   public function getalledittedpost(){
    //    return response()->json(
    //     contribute::orderBy('id','desc')->select('contributes.*')
    //    ->where('contributes.status','=','E') ->where('contributes.status','=','N')->get()
    //    );
    $edittedpost = DB::table('contributes')->select('contributes.*','titles.name_title','categories.catname')
    ->join('titles','contributes.title_id','=','titles.id')
    ->join('categories','titles.category_id','=','categories.id')
    ->where('contributes.status','=','N')->orWhere('contributes.status','=','E')
    ->orderBy('id','desc')->get();
    return $edittedpost;
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
           User::orderBy('id', 'desc')->join('roles','users.role_id','=','roles.id')
           ->select('users.*','roles.name as role')
           ->where('status','=','T')
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

    public function gettitles(Request $request)
    {
        // return $request;
        $id= $request->id;
        $user_id= $request->user_id;
        if(auth()->check()){
        return response()->json([
            'title'=>DB::select('SELECT DISTINCT t.*,categories.catname,contents.header,contents.content,
            categories.destription,categories.activity_id,activities.actname,users.firstname,users.lastname,
            users.middlename, users.familybackground, users.image, (select status from follows l where
             l.user_id = '.$user_id.' AND l.followed_user_id = t.user_id ) as follow from titles t LEFT JOIN 
             follows f ON (t.user_id = f.followed_user_id)join categories on(t.category_id = categories.id) 
             join activities on (categories.activity_id = activities.id) join users on (t.user_id = users.id) 
             join  contents on(t.id = contents.name_id) where t.status = "Y" and categories.activity_id = '.$id.' order by id desc'),
    
            // 'title'=> title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
            // ->join('activities','categories.activity_id','=','activities.id')
            // ->join('users','titles.user_id','=','users.id')
            // ->join ('contents','titles.id','=','contents.name_id')
            // ->select('titles.*','categories.catname','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')  
            // ->where('activity_id','=',$id)
            // ->where('titles.status','=','Y')
            //    ->get(),
            //    'follow'=>Follows::join('titles','follows.title_id','=','titles.id')
            //    ->join('users','follows.user_id','=','users.id')
            //    ->select('follows.*')
            //    ->where('follows.user_id','=', auth()->user()->id)
            //   ->get(),
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
    public function getCategories(Request $request){
        $id =$request[0];
        // return $id;
        // $follow= DB::table('follows')->where('followed_user_id',$id)
        // ->where('status','Following')->get();
        // return $follow;
        if(auth()->check()){
            return response()->json(
                // Activities::where('id','=',1)->get(),
                [
                    'name'=>DB::select('SELECT DISTINCT t.*,categories.catname,contents.header,contents.content,
                    categories.destription,categories.activity_id,activities.actname,users.firstname,users.lastname,
                    users.middlename, users.familybackground, users.image, (select status from follows l where
                     l.user_id = '.$id.' and l.followed_user_id = t.user_id ) as follow from titles t LEFT JOIN 
                     follows f ON (t.user_id = f.followed_user_id)join categories on(t.category_id = categories.id) 
                     join activities on (categories.activity_id = activities.id) join users on (t.user_id = users.id) 
                     join  contents on(t.id = contents.name_id) where t.status = "Y"'),
            // 'name'=>title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
            // ->join('activities','categories.activity_id','=','activities.id')
            // ->join('users','titles.user_id','=','users.id')
            //    ->join ('contents','titles.id','=','contents.name_id')
            // ->select('titles.*','categories.catname','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
            // ->where('titles.status','=','Y')
            // ->get(),
            'gallery'=>DB::select('select DISTINCT galleries.*,name_title, location, t_image,t.user_id,users.firstname,
            users.lastname,users.middlename,users.image,users.email, (select status from follows l where l.user_id = '.$id.
            ' and l.followed_user_id = t.user_id ) as "follow" from titles t LEFT JOIN follows f ON (t.user_id = f.followed_user_id) 
            left join galleries on (galleries.title_id= t.id) join users on (t.user_id = users.id) where t.status = "Y"')
        //     'gallery'=>Galleries::orderBy('id')->join('titles','galleries.title_id','=','titles.id')
        //    ->join('users','titles.user_id','=','users.id')
        //    ->leftJoin('follows','follows.user_id','=','titles.user_id')
        //     ->select('galleries.*','titles.name_title','titles.location','titles.t_image','titles.user_id','users.firstname','users.lastname','users.middlename','users.image','users.email',DB::raw('count(select * from follows where user_id =) AS follow'))
        //     // ->where('follows.followed_user_id', '=', $id )
        //     // ->where('follows.user_id', '=', 'titles.user_id')
        // //    ->where('title_id','=',$id)
        //    ->get(),
           ]
        );
        }
    }
}
