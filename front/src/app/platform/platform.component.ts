import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {} from 'googlemaps';
import { Router } from '@angular/router';
import { JarwisService } from '../service/jarwis.service';
import { TokenService } from '../service/token.service';
import { MapServiceService } from '../map-service.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {startWith, map} from 'rxjs/operators';
import { NgForm } from '@angular/forms';

declare let jQuery: any;
declare var $:any;

// declare var form_wizard: any;
// declare var steps:any;
// declare var mutil_list:any;

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  defaultImage='https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg'

  control = new FormControl();
  filteredStreets: Observable<string[]>;
   @ViewChild('map') mapElement: any;
   map: google.maps.Map;

   uimage: string;
    // defaultImage = 'assets/img/logo.png';
    image:any;

    public lat;
  data: any;
  newArr = [];
  public beach;
  public marker;
  public fakerIt = [];

  public valToSearch;

  p:any;
  footer: any;
  resa: any;
  resah: any;
  actname1: any;
  id1: any;
  resac: any;
  documentArray: any;
  article: any;
  loading=true;
  folllow = "Follow";
token:any;
  mySlideImages = [1,2,3].map((i)=> `https://picsum.photos/640/480?image=${i}`);
  myCarouselImages =[1,2,3,4,5,6].map((i)=>`https://picsum.photos/640/480?image=${i}`);
  mySlideOptions={items: 1, dots: true, nav: false};
  myCarouselOptions={items: 3, dots: true, nav: true};
  gallery: any;
  follows: any;
  url:any;
  appUrl:any;
  loggedIn: boolean;

  constructor( private Auth: AuthService,
    private router: Router,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private mapserver: MapServiceService, 
    private coordGet: MapServiceService,
    public snackBar: MatSnackBar,
  ) { }
  public response:any;
  public res:any;
  ftitle: any;
  id:any;

  public form = {
    email: null,
  };
  
  onSubmit(form:NgForm){

    this.Jarwis.subscribe(form.value).subscribe(
      data=>{
        this.response = data;
        let snackBarRef = this.snackBar.open("Subscribed Successfully", 'Dismiss', {
          duration: 2000
        }) 
          
        this.ngOnInit();
  },
  error=>{
    let snackBarRef = this.snackBar.open("You have Subscribed already", 'Dismiss', {
      duration: 2000
    }) 
    this.ngOnInit();
  }
  )

  }
  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  // }
  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.Jarwis.geturl().subscribe(
      data=>{
       
       this.url= data;
      let y:any = this.url.url;
       this.appUrl = y[0].url;
    //  console.log("url",this.appUrl);
      }
    )
    this.Jarwis.profile().subscribe(
      data=>{
      
      this.response = data;
      this.id=this.response.id;
      console.log(this.id)
      this.image=this.appUrl+this.response.image
      if(this.loggedIn){
      this.Jarwis.getFollow(this.id).subscribe(
        data=>{
          this.loading=false;
          this.ftitle = data; 
          // this.follows=this.ftitle.follow;
          // console.log("follows logged in",this.follows,"status", this.loggedIn)
          // if(this.follows == 0 )   {
          //   this.folllow = "Follow";
          // }  else{
          //   this.folllow = "Following";
          // } 
          this.article=this.ftitle.name
          this.gallery=this.ftitle.gallery
              console.log(this.gallery);
              this.image= this.appUrl+this.article.t_image;
        }
      )
      }
     
    });

    
      
 if(!this.loggedIn)
      {
        this.Jarwis.getArticle().subscribe(
          data=>{
            this.loading=false;
          this.ftitle = data; 
          // this.follows=this.ftitle.follow;
          // console.log(this.follows)
          // if(this.follows == 0 )   {
          //   this.folllow = "Follow";
          // }  else{
          //   this.folllow = "Following";
          // } 
          this.article=this.ftitle.name
          this.gallery=this.ftitle.gallery
              console.log("not logged");
              this.image= this.appUrl+this.article.t_image;
          }
        )
      }
      this.Jarwis.getact().subscribe(
        data=>{        
        this.res = data;          
        }
      )

      this.Jarwis.getfootertitle().subscribe(
        data=>{
        this.ftitle = data; 
        this.footer=this.ftitle[0] 
        console.log(this.footer)      
        
        }
      )

      this.Jarwis.displayartifact().subscribe(
        data=>{
        this.resa = data;  
        this.resah=this.resa.event[0]
        this.actname1=this.resah.actname
        this.id1=this.resah.id
        this.resac=this.resa.subevent
         console.log(this.resac)

         let result: any = data;
         this.documentArray = this.resa.subevent;
         let string:string
         for(let i=0;i<=this.documentArray.length -1;i++){
           string += '<div class="card-img"><a href="video-post.html"><img src='+this.appUrl+this.resac.t_image+' class="card-img-top" alt="Anthem Official Gameplay Reveal"></a><div class="card-meta"><span>6:46</span></div></div><div class="card-block"><h4 class="card-title"><a href="video-post.html">Anthem Official Gameplay Reveal</a></h4><div class="card-meta"><span><i class="fa fa-clock-o"></i> 2 weeks ago</span><span>447 views</span></div></div>';
         }
        string = string.replace('undefined','');
        jQuery().append(string);
       },
       error => {
         console.log(error);

        
        }
      );
      $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#result").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
      (function($) {
        "use strict";
  
          // owl carousel
          $('.owl-posts').owlCarousel({
            margin: 5,
            loop: true,
            dots: false,
            autoplay: true,
            responsive: {
              0: {
                items: 1
              },
              1024: {
                items: 1,
                center: false
              },
              1200: {
                items: 2,
                center: true
              }
            }
          });
    
          $('.owl-videos').owlCarousel({
            margin: 15,
            loop: true,
            dots: false,
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
        })(jQuery); 
      
  }

  locateMe(event: any) {
    // let search = "Abeokuta";
    // this.Jarwis.search(search).subscribe(
    //    data=>{
    //      console.log("search",data);
    //    }
    // )
    this.valToSearch = event.target.value;
    // alert(this.valToSearch.category)
    //map Init
    this.coordGet.getLocality(this.valToSearch).subscribe(data=>{console.log(data)
      this.data = data;

      let lat = this.data.results[0].geometry.location.lat;
      let long = this.data.results[0].geometry.location.lng;
      console.log('lat= '+ lat +' and long= '+ long );

      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng:  long},
        zoom: 10,
        panControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        // overviewMapControl: true,
        rotateControl: true,
        //mapTypeId: google.maps.mapTypeId.ROADMAP
      })
      this.marker = new google.maps.Marker({
        map: map,
        
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: lat, lng:  long},
        
      });
    })
  }

  public search(): void {
 
    console.log(this.valToSearch);
    this.mapserver.getLocality(this.valToSearch.status).subscribe(data=>{
      if(this.data.results[0].address_components[1].short_name=='OG'){
        let lat = this.data.results[0].geometry.location.lat;
        let long = this.data.results[0].geometry.location.lng;
       
          this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: long },
          zoom: 10,
          panControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          // overviewMapControl: true,
          rotateControl: true,
          //mapTypeId: google.maps.mapTypeId.ROADMAP
        })

      }
      else {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 6.9075, lng: 3.5813 },
          zoom: 10,
          panControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          // overviewMapControl: true,
          rotateControl: true,
          //mapTypeId: google.maps.mapTypeId.ROADMAP
        })
  
      }
    })
  }

  likes(id){
// console.log(id)
this.Jarwis.like(id).subscribe(
  data =>  {
    let snackBarRef = this.snackBar.open("like", 'Dismiss', {
      duration: 2000
    }) 
    this.ngOnInit()
  }
  
  );
  }
  follow(id){
    // this.follows=this.article
    let follows = this.article.filter(c => c.id == id);
    let follow=follows[0]
    let follow_id=follow.user_id
     console.log(follow_id)
    this.Jarwis.follow({followed_user_id:follow_id}).subscribe(
      data =>  {
        let snackBarRef = this.snackBar.open("following", 'Dismiss', {
          duration: 2000
        }) 
        // this.folllow = "Following"
        // console.log(data)
        this.ngOnInit()
      },
      error => {
        let idd = this.id;
        this.Jarwis.follow2({follower_id:idd,user_id:follow_id}).subscribe(
          data =>  {
            let snackBarRef = this.snackBar.open("following", 'Dismiss', {
              duration: 2000
            }) 
            // this.folllow = "Following"
            // console.log(data)
            this.ngOnInit()
          },
          error => {
            let snackBarRef = this.snackBar.open("Try again later", 'Dismiss', {
              duration: 2000
    
            })
           
          }
          
          );
       
      
      }
      
      );
      }
      unfollow(id){
        // this.follows=this.article
        let follows = this.article.filter(c => c.id == id);
        let follow=follows[0]
        let follow_id=follow.user_id;
        let idd = this.id;
        //  console.log(follow_id)
        this.Jarwis.unFollow({follower_id:idd,user_id:follow_id}).subscribe(
          data =>  {
            let snackBarRef = this.snackBar.open("Unfollowed", 'Dismiss', {
              duration: 2000
            }) 
            // this.folllow = "Following"
            // console.log(data)
            this.ngOnInit()
          },
          error => {
            let snackBarRef = this.snackBar.open("Try again", 'Dismiss', {
              duration: 2000
    
            })
            // this.folllow = "Follow"
          }
          
          );
          }
  navigate(id){
    this.router.navigate(['Category/'+id+''])
    this.ngOnInit()
  }

  nav(id){
  //  this.token=localStorage.getItem('token');
  //  console.log(this.token)
// if(this.token == null){
//   this.router.navigate(['Login']);
// }else
// {   
   this.router.navigate(['Content/'+id+'']);
    this.ngOnInit()
  // }

  }

  refresh(){
    window.location.reload();
    return false;
    // this.router.navigate(['Platform']);
    this.ngOnInit()
  }

}
