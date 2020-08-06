import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../../service/jarwis.service';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {FormBuilder, FormGroup, Validators, NgForm, FormControl} from "@angular/forms";
declare var $: any;
export interface Town {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public selectedid:any;
  firstname: any;
  family: any;
  email: any;
  lastname: any;
  formdata: FormGroup;
  middlename: any;
  phone: any;
  familybackground: any;
  town: any;
  gender: any;
  disable= "disabled";
  disabled= false;
  sav= 'Update';
  
  public submissionForm: FormGroup;
  image: any;
  datas: { formdata: any; };
  error: any;
  constructor( private http: HttpClient,private formBuilder: FormBuilder,private Token: TokenService, private Jarwis: JarwisService,private router: Router,
    public snackBar: MatSnackBar) { }
  public response:any;
  public form ={
    emails:'',
    pass:'',
    id:''

  };
  Towns: Town[] = [
    {value: 'true', viewValue: 'Yes'},
    {value: 'flase', viewValue: 'No'},
    // {value: 'Ota', viewValue: 'Ota'}
  ];
  dataChanged(event){
    if (event=='false'){
      // console.log(event)
      this.submissionForm.controls.family.disable();
    //  this.disabled= true;
    }else{
      // console.log(event)
      this.submissionForm.controls.family.enable();
      // this.disabled= false;
    }
    // console.log(event)
   }
 ngOnInit() {
 
   this.submissionForm = this.formBuilder.group(
     
     {
       firstname: [''],
      lastname: [''],
      middlename:[''],
      email:[''],
      family:[''],
      phone:[''],
      familybackground:[''],
      town:[''],
      gender:[''],
      address:[''],
      id:[''],
    },
  )
    this.displayprofile()
  }
 
  displayprofile(){
 this.Jarwis.profile().subscribe(
   data=>{

   this.response = data;
  
   this.submissionForm = this.formBuilder.group(
    
    {
      firstname: [this.response.firstname],
      lastname: [this.response.lastname],
      email:[this.response.email],
  family:[this.response.family],
  middlename:[this.response.middlename],
  phone:[this.response.phone],
  familybackground:[this.response.familybackground],
  town:[this.response.town],
  gender:[this.response.gender],
  address:[this.response.address],
  id:[this.response.id]
    },
  )
   this.image=this.response.image

 })
 
}
uploadFile(event){
  let files =event.target.files[0];
  let reader = new FileReader();
  let vm = this;
  reader.onloadend =()=> {
    
    this.image = reader.result;
 
  }
  reader.readAsDataURL(files);
}

onSubmit1() {
  this.disabled=true;
  this.sav= ' Updating';
  this.Jarwis.updateprofile({formdata:this.submissionForm.value,image:this.image}).subscribe(
    data => this.handleResponse(data),
   error => this.handleError(error)
 );
 
}
handleError(error) {
  this.disabled=false; 
  this.error = error.error.errors;
  console.log(this.error);
  this.disabled=false;
  this.sav= 'Update';
}
handleResponse(data) {  
  window.location.reload();
  let snackBarRef = this.snackBar.open("Updated Successfully", 'Dismiss', {
    duration: 2000
  }) 
  this.router.navigateByUrl('/User/(side:Details)');
  this.disabled=false;
  this.sav= 'Updated';

  this.ngOnInit()
}


}
