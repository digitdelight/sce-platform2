<?php

namespace App\Http\Controllers;

use App\title;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Content;
use App\ Category;
use Image;
use App\User;
use App\comment_tbs;
use App\Galleries;
use App\Follows;
class UserController extends Controller
{

    public function getUsers()
    {
        return DB::table("users")->where('role_id','=','1')
        ->get();
    }
    public function getAdmins()
    {
        return DB::table("users")->where('role_id','=','2')
        ->get();
    }

    public function getComments()
    {
        return DB::table("comment_tb")->get();
    }
    public function getRates()
    {
        return DB::table("rate_tb")->get();
    }
    public function getArticle()
    {
        if(auth()->check()){
            return response()->json(
                // Activities::where('id','=',1)->get(),
                [
            'name'=>title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
            ->join('activities','categories.activity_id','=','activities.id')
            ->join('users','titles.user_id','=','users.id')
               ->join ('contents','titles.id','=','contents.name_id')
            ->select('titles.*','categories.catname','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
            ->where('titles.status','=','Y')
            ->get(),
        //     'follow'=>Follows::join('titles','follows.title_id','=','titles.id')
        //     ->join('users','follows.user_id','=','users.id')
        //     ->select('follows.*', )
        //     ->where('follows.user_id','=', auth()->user()->id)
        //    ->get(),
            'gallery'=>Galleries::orderBy('id')->join('titles','galleries.title_id','=','titles.id')
           ->join('users','titles.user_id','=','users.id')
            ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
        //    ->where('title_id','=',$id)
           ->get(),
          
           ]
        );
        }
        // return "false";
        return response()->json(
            // Activities::where('id','=',1)->get(),
            [
        'name'=>title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
        ->join('activities','categories.activity_id','=','activities.id')
        ->join('users','titles.user_id','=','users.id')
           ->join ('contents','titles.id','=','contents.name_id')
        ->select('titles.*','categories.catname','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
        ->where('titles.status','=','Y')
        ->get(),
        
        'gallery'=>Galleries::orderBy('id')->join('titles','galleries.title_id','=','titles.id')
       ->join('users','titles.user_id','=','users.id')
        ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
    //    ->where('title_id','=',$id)
       ->get(),
      
       ]
    );

//         $article = DB::table('titles')
//         ->select('titles.*','contents.header','contents.content','contents.c_image', 'contents.list',
//         'categories.id','categories.catname', 'activities.actname','users.image', 'users.firstname', 'users.lastname')
//         ->join ('contents','titles.id','=','contents.name_id')
//         ->join ('categories','categories.id','=','titles.category_id')
//         ->join ('activities','activities.id','=','categories.activity_id')
//         ->join ('users','titles.user_id','=','users.id')       
//         ->get();

    }
    public function getRatesforTitle()
    {
     $rate =DB::table('rate_tb')->select(DB::raw('AVG(rate) AS rate'), 'title_id' )->groupBy('title_id')->get();
     return $rate;
    }
    public function getcommentforTitle()
    {
     $comment =DB::table('comment_tb')->select(DB::raw('count(comment) AS number_of_comment'), 'comment','title_id')->groupBy('title_id','comment')->get();
     return $comment;
    }
    public function updatepost(Request $request)
    {
        $post = DB::table('contents')->where('contents.title_id','=',$request->name_id)
        ->update(array(
            'header'=> $request->header,
            'content' => $request->content
        )
        );
        if($post){
            return '{
                "success":true,
                "message":"successful"
            }' ;
        } else {
            return '{
                "success":false,
                "message":"Failed"
            }';
        }
    }

    public function addview(Request $request){
    // return $request->id;
        $view = DB::table('titles')->select('views')->where('id','=',$request->id)->get();
        $addview = DB::table('titles')->where('id','=',$request->id)
        ->update(array(
            'views'=> $view[0]->views+1
        )
        );
        if($addview){
            return '{
                "success":true,
                "message":"successful"
            }' ;
        } else {
              return '{
                "success":false,
                "message":"Failed"
            }';
        }
    }
    public function getAllPost()
    {
        $post = DB::select('select count(id) as "all_post", (select COUNT(id) from titles where status = "N") as "pending", 
        (select COUNT(id) from titles where status = "Y") as "approved",(select COUNT(id) from contributes where status = "N" or status = "E") as "editted" from titles');
      return $post;

    }
    public function name(){
        $name = DB::select('SELECT titles.id, name_title, location, t_image, about, views, status, count(comment) as "comment" from titles
         left outer join comment_tbs on (titles.id = comment_tbs.title_id) left outer join categories on(categories.id = titles.category_id) 
         WHERE activity_id = 1 group by titles.id, name_title, location, t_image, about, views, status');
        //  $name2 =DB::table('titles')->select("titles.id", "name_title"," location", "t_image", "about"," views"," status"),DB::raw('count(comment) as comment'
        //  )
    }

    public function userupdate(Request $request)
    {
        $id=$request->id;
     
        // return $id;
       
        $update=DB::table('users')
        ->where('id', $id)
        ->update(['firstname' =>$request->firstname,'middlename' => $request->middlename,'lastname'=>$request->lastname,'phone'=>$request->phone,'family'=>$request->family,'role_id'=>$request->role_id,'address'=>$request->address]); 
      
        return $update;
        // if($update){
        //     return '
        //         "success":"true"
        //     ';
        // }
    }
    public function usertrash(Request $request)
    {
        $id=$request[0];
     
        //  return $id;
       
        $trash=DB::table('users')
    ->where('id', $id)
    ->update(['status' =>'T']); 
    return $trash;
        // if($trash){
        //     return '
        //         "success":"true"
        //     ';
        // }
    }
    public function movetrashuser(Request $request)
    {
    $id=$request[0];
     
    //  return $id;
   
    $updatetitle=DB::table('users')
    ->where('id', $id)
    ->update(['status' =>'Y']); 
  
     return $updatetitle;
    // if($update){
    //     return '
    //         "success":"true"
    //     ';
    // }
    }
    public function deleteuser(Request $request){
        $id=$request[0];
        // return $id;
        $deletecat=DB::table('users')->where('id', $id)->update(['status' =>'D']); 
        // ->delete();
        return $deletecat;
    }
    public function getFollows(Request $request){
        $id =$request[0];
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
                     join  contents on(t.id = contents.name_id) where t.status = "Y" order by id desc'),
            // 'name'=>title::orderBy('id','desc')->join('categories','titles.category_id','=','categories.id')
            // ->join('activities','categories.activity_id','=','activities.id')
            // ->join('users','titles.user_id','=','users.id')
            //    ->join ('contents','titles.id','=','contents.name_id')
            // ->select('titles.*','categories.catname','contents.header','contents.content','categories.destription','categories.activity_id','activities.actname','users.firstname','users.lastname','users.middlename', 'users.familybackground', 'users.image')
            // ->where('titles.status','=','Y')
            // ->get(),
            // 'gallery'=>DB::select('select DISTINCT galleries.*,name_title, location, t_image,t.user_id,users.firstname,
            // users.lastname,users.middlename,users.image,users.email, (select status from follows l where l.user_id = '.$id.
            // ' and l.followed_user_id = t.user_id ) as "follow" from titles t LEFT JOIN follows f ON (t.user_id = f.followed_user_id) 
            // left join galleries on (galleries.title_id= t.id) join users on (t.user_id = users.id) where t.status = "Y" order by id desc')
            'gallery'=>Galleries::orderBy('id')->join('titles','galleries.title_id','=','titles.id')
            ->join('users','titles.user_id','=','users.id')
             ->select('galleries.*','titles.name_title','titles.location','titles.t_image','users.firstname','users.lastname','users.middlename','users.image','users.email')
         //    ->where('title_id','=',$id)
            ->get(),
        //     'gallery'=>Galleries::orderBy('id')->join('titles','galleries.title_id','=','titles.id')
        //    ->join('users','titles.user_id','=','users.id')
        //    ->leftJoin('follows','follows.user_id','=','titles.user_id')
        //     ->select('galleries.*','titles.name_title','titles.location','titles.t_image','titles.user_id','users.firstname','users.lastname','users.middlename','users.image','users.email')
        //     // ->where('follows.followed_user_id', '=', $id )
        //     // ->where('follows.user_id', '=', 'titles.user_id')
        // //    ->where('title_id','=',$id)
        //    ->get(),
           ]
        );
        }
    }
        public function unFollow(Request $request){
            // return $request;
            $id = $request->user_id;
            $user = $request->follower_id;
            $unfollow = DB::update('UPDATE follows SET status ="Unfollowed" WHERE user_id = '.$user.' AND 
            followed_user_id = '.$id);
            // $unfollow = DB::table('follows')->update(['status'=>'Unfollowed'])
            // ->where('followed_user_id','=',$id )
            // ->where('user_id','=',$user) ;
            if($unfollow){
                return 0;
            }
        }
        public function follow2(Request $request){
            // return $request;
            $id = $request->user_id;
            $user = $request->follower_id;
            $follow = DB::update('UPDATE follows SET status ="Following" WHERE user_id = '.$user.' AND 
            followed_user_id = '.$id);
            // $unfollow = DB::table('follows')->update(['status'=>'Unfollowed'])
            // ->where('followed_user_id','=',$id )
            // ->where('user_id','=',$user) ;
            if($follow){
                return 0;
            }
        }
}
