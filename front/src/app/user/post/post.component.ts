import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../service/jarwis.service';
import {FormBuilder, FormGroup, Validators, NgForm, FormControl,FormArray} from "@angular/forms";
import { MatSnackBar } from '@angular/material';

import { MapServiceService } from 'src/app/map-service.service';
import { Router } from '@angular/router';

declare let jQuery: any;
declare let Switchery:any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
public res:any;
public response:any;
public selectedid:any;
public location:any;
public img=[];
public video=[];
public form = {
category_id: null,
name_title:'',
location:null,
about: 'Content',
t_image:null,
image:null,
videos:null,
contents:null,
}
  disabled=false;
  sav= 'Contribute';
  id: any;
  data: any;
  public orderForm: FormGroup;
  public orderForm2: FormGroup;
  public items = [];
  image: any;
  constructor(private Jarwis: JarwisService, private router: Router, private formBuilder: FormBuilder,public snackBar: MatSnackBar,private coordGet: MapServiceService ) { }
  ngOnInit() {
    this.Jarwis.getact().subscribe(
      data=>{
     
      this.res = data;  
      
      console.log(this.res)
      }
    )
    this.orderForm =  this.formBuilder.group({
      header: '',
      content: '',
      quote: '',
       c_image:''
    }); 
    this.orderForm2 =  this.formBuilder.group({
      header: '',
      content: '',
      quote: '',
       c_image:''
    }); 
  } 
  dataChanged(event){
    this.form.category_id=event
   this.id=this.form.category_id
     this.Jarwis.post(this.id).subscribe(data=>{
        this.response = data;
     
     
      })
  }
 
  onSubmit() {
if(this.items.length == 0){
  this.form.contents=[{ id: 1,header: this.orderForm.value.header, content: this.orderForm.value.content, c_image :this.orderForm.value. c_image, quote: this.orderForm.value.quote}] ;  
  if (this.form.contents.length == 0){
    let snackBarRef = this.snackBar.open("Content are required ", 'Dismiss', {
      duration: 4000
    })
   
  }else{
    if (this.form.image == null){
      let snackBarRef = this.snackBar.open("Image are required ", 'Dismiss', {
        duration: 4000
      })
     
    }else{
     
        this.Jarwis.content(this.form).subscribe(
    data => this.handleResponse(data),
      error => this.handleError(error)
 );
      this.disabled=true;
    this.sav= 'Posting';
    }
    
  }
} else {
  this.form.contents=[{ id: 1,header: this.orderForm.value.header, content: this.orderForm.value.content, c_image :this.orderForm.value. c_image, quote: this.orderForm.value.quote}] ;  
  this.items.map(item=>{
    this.form.contents.push([item]);
  }) 
  this.form.contents.push([{ id: 1,header: this.orderForm2.value.header, content: this.orderForm2.value.content, c_image :this.orderForm.value. c_image, quote: this.orderForm2.value.quote}]) ;
    console.log(this.form);
    if (this.form.contents.length == 0){
      let snackBarRef = this.snackBar.open("Content are required ", 'Dismiss', {
        duration: 4000
      })
     
    }else{
      if (this.form.image == null){
        let snackBarRef = this.snackBar.open("Image are required ", 'Dismiss', {
          duration: 4000
        })
       
      }else{
       
          this.Jarwis.content(this.form).subscribe(
      data => this.handleResponse(data),
        error => this.handleError(error)
   );
        this.disabled=true;
      this.sav= 'Posting';
      }
      
    }
  
  }
   
  }
  handleError(error: any): void {
    this.disabled=false;
    this.sav= 'Contribute';
    let snackBarRef = this.snackBar.open("Post", 'Dismiss', {
      duration: 8000
    })
  }

  
  
  handleResponse(data) {    
    let snackBarRef = this.snackBar.open("Thank you for your contribution, our Editorial team will like to confirm your contribution before it goes live.", 'Dismiss', {
      duration: 8000
    }) 
   this.disabled=true;
    this.router.navigateByUrl('/User/(side:Details)');
  }

  getLength(): Number{
    return this.items.length
  }
  addItem(): void{
    let header = this.orderForm2.value.header;
    let content = this.orderForm2.value.content;
    let c_image=this.orderForm.value.c_image;
    let quote=this.orderForm2.value.quote;
    let existingItem = this.items.filter(i => i.header==header && i.content == content && i.quote == quote )
    // this.items=[{ id: 1,header: this.orderForm.value.header, content: this.orderForm.value.content, c_image :this.orderForm.value. c_image, quote: this.orderForm.value.quote}] ;
    if(existingItem.length == 0){
      let id = this.items.length;
      this.items.push({id: id,header: header, content: content, c_image : c_image, quote: quote});    
      console.log(this.items);
      // this.orderForm.value.header=""
      // this.orderForm.value.content=""
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
  uploadFile(event){
    let files =event.target.files[0];
    let reader = new FileReader();
    let vm = this;
    reader.onloadend =()=> {
      // body...
      this.orderForm.value.c_image = reader.result;
   
    }
    reader.readAsDataURL(files);
  }
  uploadFiles(event){
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
    this.form.image =this.img;
    // console.log(event)
    // console.log(this.form.image)
  }
  
  getCoord(coord) {
    this.coordGet.getLocality(coord).subscribe(data=>{

      let lat = this.data.results[0].geometry.location.lat;
      let long = this.data.results[0].geometry.location.lng;
      console.log('lat= '+ lat +' and long= '+ long );
  })
}
}

