import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../service/jarwis.service';
import { Router, ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import {} from 'googlemaps';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MapServiceService } from '../map-service.service';
import { MatSnackBar } from '@angular/material';
import { ContributeComponent } from '../contribute/contribute.component';
import { AuthService } from '../service/auth.service';
declare let jQuery: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  res: any;
  response: any;
  contents: any;
  actname: any;
  catname: any;
  image: any;
  name: any;
public detail;
public data;
public loggedIn: boolean;
map: google.maps.Map;
id: any;
  bio: any;
  disable= false;
    sav= 'Comment';
  public form = {
    comment: null,
    title_id: null,
   
  };
  folllow= "Follow";
  loading=true;
  comment: any;
  title: any;
  dates: any;
  about: any;
  uimage: any;
  marker: google.maps.Marker;
  error: any;
  cat: any;
  result: any;
  view: any;
 public tid;
  location: any;
  public orderForm: FormGroup;
  img:any;
  follows:any;
  images: any;
  ftitle: any;
  footer: any;
  videos:any;
  post=true;
  mapv=false;
  imgs=false;
  video=false;
  contribute=false;
  stream=false
  isPopupOpened = true;
  gallery: any;
  c_image:any;
  title_id: any;
  article:any;
  cgallery: any;
  contributes:any;
  url:any;
  appUrl:any;
  public responses:any;
  uid:any;
  user_id: any;
  sharepath:any;
constructor(private Jarwis: JarwisService, private Auth: AuthService, private formBuilder: FormBuilder,public snackBar: MatSnackBar,private router: Router, public actRoute: ActivatedRoute, private coordGet: MapServiceService,private dialog?: MatDialog,) { }
@ViewChild('map') mapElement: any;



onSubmit() {

  this.Auth.authStatus.subscribe(value => this.loggedIn = value);

  this.disable= true;
    this.sav= 'Comment';
  let token=localStorage.getItem('token')

  if (token==null){
    let snackBarRef = this.snackBar.open('Please, Login to proceed', 'Dismiss', {
      duration: 4000
    })
  this.router.navigateByUrl('/Login');
  }
  else{  
    
     this.Jarwis.comment(this.form).subscribe(
    
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
  }
 
 
}
handleResponse(data) {
  let snackBarRef = this.snackBar.open('Comment Successfully', 'Dismiss', {
    duration: 2000
  });
  this.disable= false;
    this.sav= 'Comment';
  this.ngOnInit()
}

handleError(error) {
  this.disable= false;
    this.sav= 'Comment';
  this.error = error.error.errors;
}
 
    
  ngOnInit() {
    this.sharepath = this.Jarwis.getcurrentroute();
  
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.Jarwis.profile().subscribe(
      data=>{
      
      this.responses = data;
      this.uid=this.responses.id;
      console.log(this.uid)
      // this.image=this.appUrl+this.response.image
     
    });
    this.Jarwis.geturl().subscribe(
      data=>{
       
       this.url= data;
      let y:any = this.url.url;
       this.appUrl = y[0].url;
     console.log("url",this.appUrl);
      }
    )
    this.Jarwis.getArticle().subscribe(
      data=>{
        // this.loading=false;
      this.ftitle = data; 

      this.article=this.ftitle.name
      this.gallery=this.ftitle.gallery 
              
          this.image= this.appUrl+this.article.t_image;
      }
    )

    this.orderForm =  this.formBuilder.group({
     
      gcontents: this.formBuilder.array([
        // {
        //   header:'',
        //   content: ''
        // }
      ])
      // list: '',
      // c_image:''
    });
    (function($) {
      "use strict";
      // select2
      $('.select2').select2({
        minimumResultsForSearch: -1
      });

      // easyPieChart
      $('.chart').easyPieChart({
        barColor: '#5eb404',
        trackColor: '#e3e3e3',
        easing: 'easeOutBounce',
        onStep: function(from, to, percent) {
          $(this.el).find('span').text(Math.round(percent));
        }
      });
      // lightbox
      // $('[data-lightbox]').lightbox();
      $('[data-lightbox]').lightbox({
        disqus: 'gameforestyakuzieu'
      });
      $('.owl-logos').owlCarousel({
        margin: 100,
        nav: false,
        autoplay: true,
        dots: false,
        responsive: {
          0: {
            items: 1
          },
          500: {
            items: 2
          },
          701: {
            items: 3
          },
          1000: {
            items: 5
          }
        }
      });

      $('.owl-videos').owlCarousel({
        margin: 15,
        loop: true,
        dots: false,
        autoplay: true,
        responsive: {
          0: {
            items: 1
          },
          700: {
            items: 2
          },
          800: {
            items: 3
          },
          1000: {
            items: 4
          },
          1200: {
            items: 6
          }
        }
      });
      $('.search-video, .navbar-search .form-control').keyup(function() {
        var search = $(this).val().toLowerCase();
        $.each($('.card-title'), function() {
          if ($(this).text().toLowerCase().indexOf(search) === -1) {
            $(this).parent().parent().parent().hide();
          } else {
            $(this).parent().parent().parent().show();
          }
        });
      });
      // Background Player
      $(".player").mb_YTPlayer();
    })(jQuery);

    this.Jarwis.getfootertitle().subscribe(
      data=>{
      this.ftitle = data; 
      this.footer=this.ftitle[0]           
      
      }
    )

    this.Jarwis.getact().subscribe(
      data=>{
      
      this.result = data;   
      
      }
    )


    this.actRoute.paramMap.subscribe(( params => {  
      
      var id= this.actRoute.snapshot.params['id'];
     
      this.tid= this.actRoute.snapshot.params['id'];
      this.viewig();      
                    this.loading=false;
                       
                    this.Jarwis.getcontent(id).subscribe(data=>{
                    this.response = data;                   
                    this.res=this.response.name[0];
                    this.actname=this.res.actname;
                    this.view=this.res.views;
                    this.catname=this.res.catname;
                    this.form.title_id=this.res.id;
                    this.title=this.res.name_title;
                    this.user_id=this.res.user_id;
                    this.about=this.res.about;
                    this.dates=this.res.created_at;
                    this.bio=this.res.familybackground;
                    this.name=this.res.firstname+" "+this.res.lastname+" "+this.res.middlename;
                    this.location= this.response.content[0].location;
                   this.img=this.res.t_image;

                    this.contents=this.response.content;
                    this.comment=this.response.comment;  
                    this.gallery=this.response.gallery;
                    this.cgallery=this.response.cgallery;
                    this.contributes=this.response.contribute;                   
                    this.videos=this.response.video;
                    this.follows=this.response.follow; 
                    if(this.follows == 1 )   {
                      this.folllow = "Following";
                    }  else{
                      this.folllow = "Follow";
                    } 
                    this.images=this.appUrl+this.res.t_image
                    this.uimage=this.appUrl+this.res.image;
                     
                    })
                
              }));   

              this.actRoute.paramMap.subscribe(( params => {  
      
                var id= this.actRoute.snapshot.params['id'];
               
                this.tid= this.actRoute.snapshot.params['id'];
                this.viewig();
                          
          
                if(typeof params.get('id') == 'string') { 
                  
                  this.loading=false;
                  this.Jarwis.getalltitle().subscribe(data=>{
                      for(let x in data){
                        data[x]              
                        if(data[x].name_title==params.get('id') || data[x].location==params.get('id')){
                          this.detail = data[x];                
                          id = data[x].id;
                          
                              this.Jarwis.getcontent(id).subscribe(data=>{
                              this.response = data;                              
                              this.res=this.response.name[0];
                              this.actname=this.res.actname;
                              this.view=this.res.views;
                              this.catname=this.res.catname;
                              this.form.title_id=this.res.id;
                              this.title=this.res.name_title;
                              this.about=this.res.about;
                              this.dates=this.res.created_at;
                              this.bio=this.res.familybackground;
                              this.name=this.res.firstname+" "+this.res.lastname+" "+this.res.middlename;
                              this.location= this.response.content[0].location;
                             this.img=this.res.t_image;
                             this.user_id=this.res.user_id;
                              this.contents=this.response.content;
                              this.comment=this.response.comment;  
                              this.gallery=this.response.gallery;
                              this.cgallery=this.response.cgallery;
                              this.contributes=this.response.contribute;                   
                              this.videos=this.response.video; 
                              this.follows=this.response.follow;
                              if(this.follows == 1 )   {
                                this.folllow = "Following";
                              }  else{
                                this.folllow = "Follow";
                              } 
                              this.images=this.appUrl+this.res.t_image
                              this.uimage=this.appUrl+this.res.image;
                          })   
                        }} 
                         
                          
                        })  } 
         
                            } 
          ));   
   
  }
  swip (show){
    var view = (show == 'post')?this.post=true:this.post=false;
    if (show == 'mapv'){this.mapv=true;
      this.coordGet.getLocality(this.response.content[0].location).subscribe(data=>{
        this.data = data;
  
        let lat = this.data.results[0].geometry.location.lat;
        let long = this.data.results[0].geometry.location.lng;
     
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng:  long},
          zoom: 17,
          panControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          
          rotateControl: true,
         
        })
        this.marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: lat, lng:  long},
          
        });
      })
    }else{this.mapv=false;}
    var view = (show == 'image')?this.imgs=true:this.imgs=false;
    var view = (show == 'video')?this.video=true:this.video=false;
    var view = (show == 'stream')?this.stream=true:this.stream=false;
    if (show == 'contribute'){
      if(this.loggedIn){
      this.contribute=true;

      this.actRoute.paramMap.subscribe(( params => {  
      
        var id= this.actRoute.snapshot.params['id'];
       
        this.tid= this.actRoute.snapshot.params['id'];
        this.viewig();
                         
                      this.Jarwis.getcontent(id).subscribe(data=>{
                      this.response = data;                      
                      this.res=this.response.name[0];
                      this.actname=this.res.actname;                     
                      this.catname=this.res.catname;
                      this.form.title_id=this.res.id;
                      this.title=this.res.name_title;
                      this.about=this.res.about;
                      this.title_id=this.res.id;
                      this.dates=this.res.created_at;
                      this.bio=this.res.familybackground;
                      this.name=this.res.firstname+" "+this.res.lastname+" "+this.res.middlename;
                      this.location= this.response.content[0].location;
                     this.img=this.res.t_image;
                     this.user_id=this.res.user_id;
                      this.contents=this.response.content;
                      this.comment=this.response.comment;  
                    this.gallery=this.response.gallery;     
                    this.videos=this.response.video;         
                      this.images=this.appUrl+this.res.t_image
                      this.uimage=this.appUrl+this.res.image;
                       
                      })
                    
                }));
              }else{
                this.router.navigate(['Login']);
                this.ngOnInit()
              }
    } else{this.contribute=false;}  
  }
  onContribute(id){    
    this.isPopupOpened = true;  
    let contribute = this.contents.filter(c => c.id == id);
    
   const dialogRef = this.dialog.open(ContributeComponent, {
     minWidth: '50%',
     data: {contribute: contribute[0]}
     
   }); 
   

    dialogRef.afterClosed().subscribe(result => {
     this.isPopupOpened = false;
     if(result == 'undefined'){

     }else{
      this.Jarwis.contribute(result).subscribe(
        data =>  {
          let snackBarRef = this.snackBar.open("Thank you for your contribution, our Editorial team will like to confirm your contribution before it goes live.", 'Dismiss', {
            duration: 8000
          }) 
        }
        );    
       this.ngOnInit()
     }
    });
  
  }
  uploadFiles(event){
    let files =event.target.files[0];
    let reader = new FileReader();
    let vm = this;
    reader.onloadend =()=> {
      // body...
      this.c_image = reader.result;
   
    }
    reader.readAsDataURL(files);
  }
  saveimage(){
    this.Jarwis.contributeimage({c_image:this.c_image,title_id:this.title_id}).subscribe(
      data =>  {
        let snackBarRef = this.snackBar.open("Thank you for your contribution, our Editorial team will like to confirm your contribution before it goes live.", 'Dismiss', {
          duration: 8000
        }) 
      }
      );   
     this.ngOnInit()
  }
  follow(id){
    // this.follows=this.article
    let follows = this.article.filter(c => c.id == id);
    let follow=follows[0]
    let follow_id=follow.user_id
    
    this.Jarwis.follow({title_id:id,followed_user_id:follow_id}).subscribe(
      data =>  {
        let snackBarRef = this.snackBar.open("follow", 'Dismiss', {
          duration: 2000
        }) 
        // this.folllow = "Following";
        this.ngOnInit()
      },
      error => {
        let snackBarRef = this.snackBar.open("You are following already", 'Dismiss', {
          duration: 2000

        })
        // this.folllow = "Following";
      }
      
      );
      }

      likes(id){        
        this.Jarwis.like(id).subscribe(
          data =>  {
            let snackBarRef = this.snackBar.open("like", 'Dismiss', {
              duration: 2000
            }) 
            this.ngOnInit()
          }
          
          );
          }
 navigate (id){
    this.router.navigate(['Content/'+id+''])
   
  }
  naviga (id){
    this.router.navigate(['Category/'+id+''])
   
  }
  viewig(){
    this.Jarwis.updateView({id:this.tid}).subscribe(
   );
   
  }

  nav(id){
    this.router.navigate(['Content/'+id+'']);
    this.ngOnInit()
  }
}
