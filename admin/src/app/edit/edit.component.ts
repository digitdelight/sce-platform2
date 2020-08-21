import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../service/jarwis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public form = {
    category_id: null,
   header:null,
    contents:null,
    }
      disabled=false;
      sav= 'Update';
      id: any;
      data: any;
      public orderForm: FormGroup;
      public items = [];
      image: any;
      url:any;
      appUrl:any;

      res: any;
      response: any;
      contents: any;
      actname: any;
      catname: any;
      name: any;
      public detail;
      public loggedIn: boolean;

      comment: any;
      title: any;
      dates: any;
      about: any;
      uimage: any;
      marker: google.maps.Marker;
      error: any;
      cat: any;
      result: any;
      initcontent:any;
      contentimage:any;
      contribute:any;
  bio: any;
  location: any;
  paramsid: any;
  t_image: any;
  img= [];
  galleryimage: any;
  gallery: any;

  constructor(private Jarwis: JarwisService, private router: Router, public actRoute: ActivatedRoute,  private formBuilder: FormBuilder,public snackBar: MatSnackBar ) { }

  getLength(): Number{
    return this.items.length
  }
  addItem(): void{
    let header = this.orderForm.value.header;
    let content = this.orderForm.value.content;

    let existingItem = this.items.filter(i => i.header==header && i.content == content)
    if(existingItem.length == 0){
      let id = this.items.length;
      this.items.push({id: id,header: header, content: content})      
      
    }else{
      let snackBarRef = this.snackBar.open('Information already exist', 'Dismiss', {
        duration: 2000
      })
    }
  }

 

  deleteItem(id): void{
    for (let i = 0; i < this.items.length; i++) {
      if(this.items[i].id == id){
        this.items.splice(0,1)
      }
      
    }
  }

  
  ngOnInit() {
    this.Jarwis.geturl().subscribe(
      data=>{
       
       this.url= data;
      let y:any = this.url.url;
       this.appUrl = y[0].url;
    //  console.log("url",this.appUrl);
      }
    )
    this.orderForm =  this.formBuilder.group({
      name_title:this.title,
      gcontents: this.formBuilder.array([
        // {
        //   header:'',
        //   content: ''
        // }
      ])
      // list: '',
      // c_image:''
    });
    

   
  this.actRoute.paramMap.subscribe((params => {  
      
    this.paramsid= this.actRoute.snapshot.params['id'];
   // id = data[x].id;  
   this.Jarwis.getcontent(this.paramsid).subscribe(data=>{
     this.response = data;
     console.log(this.response)
     this.res=this.response.name[0];
     this.contribute = this.response.contribute;
     this.actname=this.res.actname;
     this.catname=this.res.catname;
     this.location=this.res.location;                  
     this.title=this.res.name_title;
     this.about=this.res.about;
     this.dates=this.res.created_at;
     // this.cat=this.response.name
     this.name=this.res.firstname+" "+this.res.lastname+" "+this.res.middlename
     // console.log(this.cat)
     this.contents=this.response.content
     // console.log(this.contents);
     this.comment=this.response.comment
     this.contentimage = this.response.t_name
     this.orderForm =  this.formBuilder.group({
      name_title:this.title,
      gcontents: this.formBuilder.array([
       
      ])
     
    });
     for (let i in this.contents){
       // console.log('here')
       const control = <FormArray>this.orderForm.controls['gcontents'];
       const contentCtrl = this.formBuilder.group({
         header:  this.contents[i].header,
         content: this.contents[i].content,
         id:this.contents[i].id        
         });
       control.push(contentCtrl);
     }
     let val=this.orderForm.value;
    this.result=val.gcontents;
   //  console.log(this.result)
     console.log(this.orderForm.value)
     if(this.res.t_image){
     this.image=this.appUrl+this.res.t_image;
     }
     else if(this.res.c_image){
       this.image = this.appUrl+this.res.c_image;
     }
     this.uimage=this.appUrl+this.res.image;
      
     })
   

     
 // this.Jarwis.productdetail2(id).subscribe(data=>{
 //   this.response2 = data;
  

}));
 
}
uploadGallery(event){
  let files =event.target.files;
  if (files){
    for(let file of files){
      let reader= new FileReader();
      let vm = this;
      reader.onload =()=> {
       this.img.push(reader.result);
      
      }
      reader.readAsDataURL(file);
      
  }
  }
  this.galleryimage =this.img;
   
}
uploadFiles(event){
  let files =event.target.files[0];
  let reader = new FileReader();
  let vm = this;
  reader.onloadend =()=> {
    // body...
    this.t_image = reader.result;
 
  }
  reader.readAsDataURL(files);
}
onSubmit() {
 // console.log(this.paramsid)
//  console.log(this.orderForm.value) 
this.disabled=true;
 this.sav= 'Updating';
 this.Jarwis.updatecontent({fdata:this.orderForm.value,id:this.paramsid,t_image:this.t_image,galleryimage:this.galleryimage}).subscribe(
   data => this.handleResp(data),
     error => this.handleErr(error)
);

}
handleErr(error: any): void {
 this.disabled=false;
 this.sav= 'Update';
}

handleResp(data) {    
 let snackBarRef = this.snackBar.open('Update Successfully', 'Dismiss', {
   duration: 2000
 })
this.disabled=false;
this.sav= 'Update';
// this.router.navigateByUrl('/admin');
this.ngOnInit()
//  this.router.navigateByUrl('/User/(side:Details)');
}
onSubmit2() {
  // this.disabled = true;
 //  console.log(this.orderForm.value) 
  this.Jarwis.updatelive({id:this.paramsid}).subscribe(
    data => this.handleResponse(data),
      error => this.handleError(error)
 );
//  this.disabled=false;
  // this.sav= 'Updating';
 }
 handleError(error: any): void {
  let snackBarRef = this.snackBar.open('Failed', 'Dismiss', {
    duration: 2000
  })
  // this.disabled=false;
  // this.sav= 'Update';
 }
 
 
 
 handleResponse(data) {    
  let snackBarRef = this.snackBar.open('Successful', 'Dismiss', {
    duration: 2000
  })
  // this.disabled=true;
 this.router.navigateByUrl('/admin');
 //  this.router.navigateByUrl('/User/(side:Details)');
 }

}
