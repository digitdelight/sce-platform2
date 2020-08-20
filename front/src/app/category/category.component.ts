import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../service/jarwis.service';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../service/token.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  response: any;
  cat: any;
  actname: any;
  title: any;
  lenght: void;
  p:any;
  ftitle: any;
  footer: any;
  res: any;
  article: any;
  loading=true;
  control: any;
  filteredStreets:any;
  search:any;
  locateMe:any;
  folllow ="Follow";
  follows: any;
  url:any;
  appUrl:any;
  loggedIn: boolean;
  id: any;
  token: any;
  actid:any;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Jarwis: JarwisService,
    public actRoute: ActivatedRoute,
    private Token: TokenService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.Jarwis.profile().subscribe(
      data=>{
      
      this.response = data;
      this.id=this.response.id;
      console.log(this.id)
      // this.image=this.appUrl+this.response.image
     
  
   
    this.actRoute.paramMap.subscribe((params => {
      let id = params.get('id');
      this.actid = id;
      alert("before");
      this.Jarwis.gettitles({id:this.actid, user_id:this.id}).subscribe(data=>{
        alert("after");
        this.response = data;
        this.loading=false;
        this.actname=this.response.acti[0].actname
        this.title=this.response.title
        this.cat=this.response.cat
       
        // this.id4=this.resnh.id
        this.lenght= this.title.length
        // console.log(this.lenght)
        // console.log(this.response)
     
      })
    
        }));
      });
      if(!this.loggedIn){
        this.actRoute.paramMap.subscribe((params => {
          let id = params.get('id');
          this.actid = id;
      this.Jarwis.gettitles({id:this.actid, user_id:this.id}).subscribe(data=>{
        this.response = data;
        this.loading=false;
        this.actname=this.response.acti[0].actname
        this.title=this.response.title
        this.cat=this.response.cat
       
        // this.id4=this.resnh.id
        this.lenght= this.title.length
        // console.log(this.lenght)
        // console.log(this.response)
     
      })
    }));
    }
    
        this.Jarwis.getfootertitle().subscribe(
          data=>{
          this.ftitle = data; 
          this.footer=this.ftitle[0] 
          console.log(this.footer)      
          
          }
        )
        this.Jarwis.geturl().subscribe(
          data=>{
           
           this.url= data;
          let y = this.url.url;
           this.appUrl = y[0].url;
          console.log("url",this.appUrl);
          }
        )
        this.Jarwis.getact().subscribe(
          data=>{        
          this.res = data;          
          }
        )
    
    
  }
  
  navigates(id){
  //   this.token=localStorage.getItem('token');
  //   //  console.log(this.token)
  // if(this.token == null){
  //   this.router.navigate(['Login']);
  // }else
  // {  
      this.router.navigate(['Category/'+id+'']);
      this.ngOnInit()
    // }
    
  }
  navigate(id){
  //   this.token=localStorage.getItem('token');
  //   //  console.log(this.token)
  // if(this.token == null){
  //   this.router.navigate(['Login']);
  // }else
  // {   
     this.router.navigate(['Content/'+id+'']);
      this.ngOnInit()
    // }
    
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
      // follow(id){
      //   // this.follows=this.article
      //   let follows = this.article.filter(c => c.id == id);
      //   let follow=follows[0]
      //   let follow_id=follow.user_id
      //    console.log(follow_id)
      //   this.Jarwis.follow({title_id:id,followed_user_id:follow_id}).subscribe(
      //     data =>  {
      //       let snackBarRef = this.snackBar.open("following", 'Dismiss', {
      //         duration: 2000
      //       }) 
      //       // this.folllow = "Following"
      //       // console.log(data)
      //       this.ngOnInit()
      //     },
      //     error => {
      //       let snackBarRef = this.snackBar.open("You are following already", 'Dismiss', {
      //         duration: 2000
    
      //       })
      //       // this.folllow = "Follow"
      //     }
          
      //     );
      //     }
      follow(id){
        // this.follows=this.article
        let follows = this.title.filter(c => c.id == id);
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
            // alert("follow");
            // this.follows=this.article
            let follows = this.title.filter(c => c.id == id);
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
          refresh(){  
            window.location.reload();
            return false;        
            this.ngOnInit()
          }

          nav(id){
          //   this.token=localStorage.getItem('token');
          //   //  console.log(this.token)
          // if(this.token == null){
          //   this.router.navigate(['Login']);
          // }else
          // { 
            // alert("here");
               this.router.navigate(['Content/'+id+'']);
              this.ngOnInit()
            // }
            
          }

}
