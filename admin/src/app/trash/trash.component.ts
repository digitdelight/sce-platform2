import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../service/jarwis.service';
import { Router } from '@angular/router';
import { MapServiceService } from '../map-service.service';

import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  resa: any;
  // snackBar: any;
  lenght: any;
                                            
  res: any;
  resp: any;
  respo: any;
  length: any;
  leng: any;
  lengh: any;
  len: any;

  constructor(private Jarwis: JarwisService,private router: Router,private mapserver: MapServiceService, private coordGet: MapServiceService,public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.Jarwis.getalltrashtitle().subscribe(
      data=>{
      this.resa = data;    
      this.len= this.resa.length  
      this.leng= this.respo.length+this.resp.length+this.res.length+this.resa.length  
  // console.log('here', this.leng )
   })
   this.Jarwis.getusertrashtitle().subscribe(
    data=>{
    this.res = data;    
    // this.leng= this.respo.length+this.resp.length+this.res.length+this.resa.length  
  // console.log('here', this.leng )
    
 })
 this.Jarwis.getacttrashtitle().subscribe(
  data=>{
  this.resp = data;    
  this.lengh= this.resp.length  
  // this.leng= this.respo.length+this.resp.length+this.res.length+this.resa.length  
  // console.log('here', this.leng )
  
})
this.Jarwis.getcattrashtitle().subscribe(
  data=>{
  this.respo = data;    
  this.lenght= this.respo.length  
  // this.leng=this.respo.length+this.resp.length+this.res.length+this.resa.length 
  // console.log('here', this.leng )
  
})
// console.log('here', this.resa ,this.res)
  }
  navigate(id){
 this.router.navigate(['edit/'+id+'']);
  }
  gettrashpopulation(){
    this.Jarwis.getalltrashtitle().subscribe(
      data=>{
      this.resa = data;    
      this.len= this.resa.length  
      this.leng= this.respo.length+this.resp.length+this.res.length+this.resa.length  
  // console.log('here', this.leng )
   })
  }
  movetrashp(id){
    // this.Jarwis.updatelive({id:id}).subscribe(
    //   data =>{
    //     this.gettrashpopulation();
    //     let snackBarRef = this.snackBar.open("Moved Successfully", 'Dismiss', {
    //       duration: 2000
    //     }) 
    //   });
      this.Jarwis.updatetrash({id:id}).subscribe(
        data =>{
          this.gettrashpopulation();
          let snackBarRef = this.snackBar.open("Moved Successfully", 'Dismiss', {
            duration: 2000
          }) 
        });
    this.ngOnInit()
  }
  getUserTrash(){
    this.Jarwis.getusertrashtitle().subscribe(
      data=>{
      this.res = data;    
      // this.leng= this.respo.length+this.resp.length+this.res.length+this.resa.length  
    // console.log('here', this.leng )
      
   })
  }
  movetrashu(id){
    // this.router.navigate(['edit/'+id+'']);
    this.Jarwis.movetrashuser(id).subscribe(
      data =>{
        this.getUserTrash();
        let snackBarRef = this.snackBar.open("Moved Successfully", 'Dismiss', {
          duration: 2000
        }) 
      });
    this.ngOnInit()
  }

  deleteu(id){
   this.Jarwis.deleteuser(id).subscribe(
    data =>{
      let snackBarRef = this.snackBar.open("Successfully", 'Dismiss', {
        duration: 2000
      }) 
    });
  this.ngOnInit()
  }
  gettrashactivities(){
    this.Jarwis.getacttrashtitle().subscribe(
      data=>{
      this.resp = data;    
      this.lengh= this.resp.length  
      // this.leng= this.respo.length+this.resp.length+this.res.length+this.resa.length  
      // console.log('here', this.leng )
      
    })
  }
  movetrasha(id){
    
    // this.router.navigate(['edit/'+id+'']);
    this.Jarwis.movetrashact(id).subscribe(
      data =>{
        this.gettrashactivities();
        let snackBarRef = this.snackBar.open("Moved Successfully", 'Dismiss', {
          duration: 2000
        }) 
      });
    this.ngOnInit()
  }
  gettrashcat(){
    this.Jarwis.getcattrashtitle().subscribe(
      data=>{
      this.respo = data;    
      this.lenght= this.respo.length  
      // this.leng=this.respo.length+this.resp.length+this.res.length+this.resa.length 
      // console.log('here', this.leng )
      
    })
  }
  movetrashc(id){
    
    // this.router.navigate(['edit/'+id+'']);
    this.Jarwis.movetrashcat(id).subscribe(
      data =>{
        this.gettrashcat();
        let snackBarRef = this.snackBar.open("Moved Successfully", 'Dismiss', {
          duration: 2000
        }) 
      });
    this.ngOnInit()
  }

  deletec(id){
   this.Jarwis.deletecat(id).subscribe(
    data =>{
      let snackBarRef = this.snackBar.open("Delete Successfully", 'Dismiss', {
        duration: 2000
      }) 
    });
  this.ngOnInit()
  }
  deletea(id){
    // console.log(id)
   this.Jarwis.deleteact(id).subscribe(
    data =>{
      let snackBarRef = this.snackBar.open("Delete Successfully", 'Dismiss', {
        duration: 2000
      }) 
    });
  this.ngOnInit()
  }
  deletep(id){
   this.Jarwis.deletetitle(id).subscribe(
    data =>{
      let snackBarRef = this.snackBar.open("Delete Successfully", 'Dismiss', {
        duration: 2000
      }) 
    });
  this.ngOnInit()
  }
//   handleError(error: any): void {
//    // this.disabled=false;
//    // this.sav= 'Update';
//   }
  
  
  
//   handleResponse(data) { 
//     console.log(data) 
//    let snackBarRef = this.snackBar.open("Delete Successfully", 'Dismiss', {
//     duration: 2000
//   })  
//  //  this.disabled=true;
//   // this.router.navigateByUrl('/population/'+this.paramsid+'');
//   this.ngOnInit()
//   //  this.router.navigateByUrl('/User/(side:Details)');
//   }
  opencomformed(){
    console.log('here')
    const dialogRef = this.dialog.open(ModalComponent , {
        width: '250px',
        // data: {name: this.name, animal: this.animal}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
