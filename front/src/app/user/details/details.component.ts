import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/service/jarwis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  profres: any;
  image: any;
  ftitle: any;
  article: any;
  gallery: any;
  timeline: any;
  followed: any;
  url:any;
  appUrl:any;
  token: any;

  constructor(private Jarwis: JarwisService, private router: Router,) { }

  ngOnInit() {
    this.Jarwis.geturl().subscribe(
      data=>{
       
       this.url= data;
      let y:any = this.url.url;
       this.appUrl = y[0].url;
    //  console.log("url",this.appUrl);
      }
    )
    this.Jarwis.getArticle().subscribe(
      data=>{
      this.ftitle = data; 

      this.article=this.ftitle.name
      this.gallery=this.ftitle.gallery
      // this.article= this.ftitle.foll;
          console.log(this.gallery);
      }
    )
    this.Jarwis.profile().subscribe(
      data=>{
      
      this.profres = data;
      this.image=this.appUrl+this.profres.image
     
    });
    this.Jarwis.timelinebyfollow().subscribe(
      data=>{
      this.followed = data; 
          console.log(this.followed);
      }
    )
    this.Jarwis.displaytimeline().subscribe(
      data=>{
      this.timeline = data; 
          console.log(this.timeline);
      }
    )
    
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
