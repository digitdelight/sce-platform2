import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../service/jarwis.service';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MapServiceService } from '../map-service.service';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map, windowWhen} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public catForm: FormGroup;
  res: any; rese: any; resp: any; resl: any; resn: any; resb: any; resa: any ; resh: any;  reseh: any;  resph: any; reslh: any; resnh: any; resbh: any; resah: any; resc: any; resec: any; respc: any ; reslc: any; resnc: any; resbc: any; resac: any ; actname1: any; actname2: any; actname3: any; actname4: any; actname5: any; actname: any;
p:any;
  title: any;
  searchdata: any;
  searchs:any;
  response: any;

  id: any;
  id1: any;
  id2: any;
  id3: any;
  id4: any;
  id5: any;
  ptotal: any;
  pres: any;
  tpost: any;
  url:any;
  appUrl:any;
  edittedpost:any;
  content:any;
  respo:any;
  public selectedid:any;
  constructor(private formBuilder:FormBuilder,private Jarwis: JarwisService,private router: Router,private mapserver: MapServiceService, private coordGet: MapServiceService,public snackBar: MatSnackBar) { }

  public lat;
  data: any;
  newArr = [];
  public beach;
  public marker;
  public fakerIt = [];
  public posts=[];
  public act:any;
  public cat:any;
  // public form = {
  //   category_id: null,
  //   name_title:'',
  //   location:null,
  //   about: 'Content',
  //   t_image:null,
  //   image:null,
  //   videos:null,
  //   contents:null,
  //   }
  public img=[];
  ngOnInit() {
    // this.router.navigateByUrl('');
  this.gets();
  this.catForm =  this.formBuilder.group({
    category_id: null,
    name_title:'',
    location:null,
    about: 'Content',
    // t_image:null,
    image:null,
    videos:null,
    contents:null,
    quote:null
  }); 
  }
  getcat(){
    let act = this.act.cat;
    let cat = act.filter(y=>y.activities_id == this.selectedid);
    this.cat = cat;
    
  }
 onSubmit(){
   console.log(this.catForm.value.image);
   this.content=[{header:this.catForm.value.name_title, content:this.catForm.value.contents,quote: this.catForm.value.quote, c_image:this.catForm.value.image}]
   this.catForm.value.contents = this.content;
   console.log("forms",this.catForm.value);
   this.Jarwis.content(this.catForm.value).subscribe(
    data => this.handleResponse(data),
      error => this.handleError(error)
 );
    //   this.disabled=true;
    // this.sav= 'Posting';
 }
 uploadFile(event){
  let files =event.target.files[0];
  let reader = new FileReader();
  let vm = this;
  reader.onloadend =()=> {
    // body...
    this.catForm.value.image = [];
     this.catForm.value.image.push(reader.result);
 
  }
  reader.readAsDataURL(files);
}
uploadFiles(event){
  let files =event.target.files[0];
  let reader = new FileReader();
  let vm = this;
  reader.onloadend =()=> {
    // body...
    this.catForm.value.image = reader.result;
 
  }
  reader.readAsDataURL(files);
}
  gets(){
    this.Jarwis.geturl().subscribe(
      data=>{
      this.url= data;
      let y:any = this.url.url;
      this.appUrl = y[0].url;
      }
    )
    this.fakerIt = this.mapserver.localGovt();
        this.Jarwis.getAllPost().subscribe(data=>{
        this.posts = JSON.parse(JSON.stringify(data));
        console.log("All post",this.posts);
      });

      this.Jarwis.displayevent().subscribe(
        data=>{
          // All data which contain category and subcat
        this.rese = data;  
        //this is one category which is event
        this.reseh=this.rese.event[0]
        this.actname=this.reseh.actname
        this.id=this.reseh.id 
        //this is all subcat under event category
        this.resec=this.rese.subevent

        }
      )

      this.Jarwis.getalladmintitle().subscribe(
        data=>{
        this.resa = data;  
        // this.resah=this.resa.event[0]
        // this.actname1=this.resah.actname
        // this.id1=this.resah.id
        // this.resac=this.resa.arti_cat

        console.log("resa",this.resa)
       
        
     })
     this.Jarwis.getallrecenttitle().subscribe(
      data=>{
      // this.resa = data;  
      // this.resah=this.resa.event[0]
      // this.actname1=this.resah.actname
      // this.id1=this.resah.id
      // this.resac=this.resa.arti_cat

      console.log("recent",data)
     
      
   })
     this.Jarwis.getalledittedpost().subscribe(
       data=>{
         this.edittedpost = data;
         console.log("editeed post", this.edittedpost);
       },
       error=>{
         console.log(error.error);
       }
     )
     this.Jarwis.getactcat().subscribe(
      data=>{
      
      this.act = data;  
      
      })
  }
reject(id){
  this.Jarwis.rejectContribution(id).subscribe(
    data=>{
      console.log(data)
      this.gets();
    },
    error=>{
      console.log(error.error.error);
    }
  )
}
rejects(id){
  this.Jarwis.rejectPost(id).subscribe(
    data=>{
      console.log(data)
      this.gets();
    },
    error=>{
      console.log(error.error.error);
    }
  )
}
  navigat(id){
    // console.log(id)
   this.router.navigate(['Category/'+id+''])
  }
  
  navigates(id){
    
    this.router.navigate(['edit/'+id+'']);
    this.ngOnInit()
  }
  navigatecontribute(id){
    
    this.router.navigate(['contribute/']);
    this.ngOnInit()
  }
  navigate(id){
    this.router.navigate(['Content/'+id+''])
  }
  reload(){
    window.location.reload();
    return false;
    // this.ngOnInit();
   }
   handleError(error: any): void {
    // this.disabled=false;
    // this.sav= 'Contribute';
    let snackBarRef = this.snackBar.open("Failed", 'Dismiss', {
      duration: 5000
    })
  }

  
  
  handleResponse(data) {    
    let snackBarRef = this.snackBar.open("Thank you for your contribution, The Editorial team will like to confirm your contribution before it's been publish.", 'Dismiss', {
      duration: 5000
    }) 
  //  this.disabled=true;
  //   this.router.navigateByUrl('/User/(side:Details)');
  }
}
