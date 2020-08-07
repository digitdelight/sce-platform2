<?php
use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
    'middleware' => 'api',
], function () {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('adminLogin','AuthController@adminLogin');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::post('resetPassword', 'ChangePasswordController@process');
    
});
Route::post('gettitles','DisplayController@gettitles');
Route::get('gettitlesforadmin/{id}','DisplayController@gettitlesforadmin');
Route::get('getUtitles','DisplayController@getUtitles');
Route::get('getUcontent','DisplayController@getUContent');
Route::post('comment','CommentController@store');
Route::post('subscribe','MailController@subscribe');
Route::post('me','AuthController@updateprofile');
Route::get('roleuser', 'RoleController@roleuser');
Route::post('role','RoleController@store');
Route::post('cate','CategoryController@store');
Route::post('movetrashc','CategoryController@movetrashc');
Route::post('activity','ActivitiesController@store');
Route::post('content','ContentController@store');
Route::post('name_t','Name_titleController@store');
Route::get('getact', 'ActivitiesController@index');
Route::get('getactcat', 'ActivitiesController@getactcat');
Route::post('movetrasha','ActivitiesController@movetrasha');
Route::post('deleteact','ActivitiesController@deleteact');


Route::get('displayevent','DisplayController@displayevent');
Route::get('displayartifact','DisplayController@displayartifact');
Route::get('displaybusiness','DisplayController@displaybusiness');
Route::get('displaypeople','DisplayController@displaypeople');
Route::get('displaynews','DisplayController@displaynews');
Route::get('displaytourist','DisplayController@displaytourist');


Route::get('timelinebyfollow','DisplayController@displaytimelinebyfollow');
Route::get('displaytimeline','DisplayController@displaytimelinebyuser');
Route::get('displaygallery','DisplayController@displaygallery');
Route::get('displayactbytitle','DisplayController@displayactbytitle');
Route::get('getalltitle','DisplayController@getalltitle');
Route::get('getalladmintitle','DisplayController@getalladmintitle');
Route::get('getfootertitle','DisplayController@getfootertitle');
Route::get('search/{searchTerm}','DisplayController@search');
Route::get('usertrashtitle','DisplayController@usertrashtitle');
Route::get('cattrashtitle','DisplayController@cattrashtitle');
Route::get('acttrashtitle','DisplayController@acttrashtitle');
Route::get('getalltrashtitle','DisplayController@getalltrashtitle');
Route::get('geturl','DisplayController@getUrl');
Route::get('getalledittedpost','DisplayController@getalledittedpost');

Route::get('getcontent/{id}','ContentController@getcontent');
Route::post('updatecontent','ContentController@update');
Route::post('updatelive','ContentController@updatelive');
Route::get('getcontentonly/{id}','ContentController@getcontentonly');
Route::get('getcat', 'CategoryController@index');
Route::get('post/{id}','ContentController@getactid');
Route::post('trash','ContentController@trash');
Route::post('deletetitle','ContentController@destroytitle');
// Route::post('deletetitle','ContentController@destroytitle');

Route::get('comments','UserController@getComments');
Route::get('rates','UserController@getRates');
Route::get('all','UserController@getAll');
Route::get('getArticle','UserController@getArticle');
Route::get('titlerates','UserController@getRatesforTitle');
Route::get('titlecomment','UserController@getcommentforTitle');
Route::post('addview','UserController@addview');
Route::post('updatePost','UserController@updatepost');
Route::get('getAllPost','UserController@getAllPost');
Route::get('getUsers','UserController@getUsers');
Route::get('getAdmins','UserController@getAdmins');
Route::post('userupdate','UserController@userupdate');
Route::post('usertrash','UserController@usertrash');
Route::get('name','UserController@name');
Route::post('movetrashu','UserController@movetrashuser');
Route::post('deleteuser','UserController@deleteuser');
Route::post('getFollows','UserController@getFollows');
Route::post('unFollow','UserController@unFollow');
Route::post('follow2','UserController@follow2');

Route::get('getalltrashtitle','DisplayController@getalltrashtitle');
Route::post('trash','ContentController@trash');
Route::post('deletetitle','ContentController@destroytitle');


Route::post('updateView','ContentController@updateView');
Route::post('cateupdate','CategoryController@update');
Route::post('catetrash','CategoryController@catetrash');
Route::post('deletecat','CategoryController@deletecat');

Route::post('actupdate','ActivitiesController@update');
Route::post('acttrash','ActivitiesController@acttrash');

Route::get('name','UserController@name');
Route::post('contribute','ContributeController@store');
Route::get('getContribute','ContributeController@index');
Route::post('editcontribute','ContributeController@update');
Route::get('imgcontribute','ContributeController@imgcontribute');
Route::get('livecontribute','ContributeController@livecontribute');
Route::post('contributeimg','ContributeController@contributeimage');
Route::post('editimgcontribute','ContributeController@editimgcontribute');
Route::post('rejectPost','ContributeController@rejectPost');
Route::post('rejectContribution','ContributeController@rejectContribution');
Route::post('like','LikesController@likes');
Route::post('follow','LikesController@follow');

Route::post('subscribe','MailController@subscribe');
//  Route::get('test',function(){rolecate
//      return response()->json([
//          'user'=>['fname'=>'tawa',
//          'lname'=>'adio']
//      ]); 
//  }); destroytitle


Route::post('contactus','ContactUsController@contactus');
