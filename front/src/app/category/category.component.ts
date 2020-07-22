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
  like: any;
  items= [];
  item= [];
  following= [];
  existingLike: any;
  liked= [];
  existingItem:any;
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
     
    });
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


    this.actRoute.paramMap.subscribe((params => {
      let id = params.get('id');
      
      this.Jarwis.gettitles(id).subscribe(data=>{
        this.response = data;
        this.loading=false;
        this.actname=this.response.acti[0].actname
        this.title=this.response.title
        this.cat=this.response.cat
        // this.follows=this.response.follow;
        this.like=this.ftitle.like;
        this.existingItem=this.ftitle.foll;
        this.existingLike=this.ftitle.liked;
        // console.log(this.follows)
        var newArr =[]
        for(var i in this.existingItem){
            newArr.push(JSON.stringify(this.existingItem[i]))
        }
        
         
       
     for(var i in newArr){
      this.following.push(JSON.parse(newArr[i]))
  }
 
    //  console.log(this.following)
    //  console.log(this.existingItem)

     for (let e = 0; e < this.following.length; e++) {
      for (let art = 0; art < this.article.length; art++) {
        if(this.article[art].id == this.following[e].id){
          this.article.splice(0,1)
        }
      }
      }
        // this.id4=this.resnh.id
        this.lenght= this.title.length
        // console.log(this.lenght)
        // console.log(this.response)
     
      })
    
        }));

        this.Jarwis.getfootertitle().subscribe(
          data=>{
          this.ftitle = data; 
          this.footer=this.ftitle[0] 
          console.log(this.footer)      
          
          }
        )
  }
  navigates(id){
    this.token=localStorage.getItem('token');
    //  console.log(this.token)
  if(this.token == null){
    this.router.navigate(['Login']);
  }else
  {    this.router.navigate(['Category/'+id+'']);
      this.ngOnInit()
    }
    
  }
  navigate(id){
    this.token=localStorage.getItem('token');
    //  console.log(this.token)
  if(this.token == null){
    this.router.navigate(['Login']);
  }else
  {    this.router.navigate(['Content/'+id+'']);
      this.ngOnInit()
    }
    
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
        this.Jarwis.follow({title_id:id,followed_user_id:follow_id}).subscribe(
          data =>  {
            let snackBarRef = this.snackBar.open("follow", 'Dismiss', {
              duration: 2000
            }) 
            console.log(data);
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

          refresh(){          
            this.ngOnInit()
          }

          nav(id){
            this.token=localStorage.getItem('token');
            //  console.log(this.token)
          if(this.token == null){
            this.router.navigate(['Login']);
          }else
          {    this.router.navigate(['Content/'+id+'']);
              this.ngOnInit()
            }
            
          }

}
