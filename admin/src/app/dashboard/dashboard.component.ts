import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { JarwisService } from '../service/jarwis.service';
import { TokenService } from '../service/token.service';
declare let jQuery: any;
declare let $ : any;
// declare let particlesJS : any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  res: any;
  response: any;
  url:any;
  appUrl:any;
 

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Jarwis: JarwisService,
    private Token: TokenService,
  ) { }

  ngOnInit() {
    new jQuery();
    // new theme();
    
    this.Jarwis.geturl().subscribe(
      data=>{
       
       this.url= data;
      let y:any = this.url.url;
       this.appUrl = y[0].url;
    //  console.log("url",this.appUrl);
      }
    )
    this.Jarwis.getact().subscribe(
      data=>{
      
      this.res = data;  
      
      }
    )

    // this.Jarwis.getfootertitle().subscribe(
    //   data=>{
    //   this.ftitle = data; 
    //   this.footer=this.ftitle[0] 
      
     
      
    //   }
    // )

    this.Jarwis.profile().subscribe(
      data=>{
      this.response = data;
   
    })

    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;
    
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }
  
  // if(window.onclose()){

  // }
  // @HostListener('window:loadend')

  // async ngOnDestroy() {
  //   localStorage.removeItem('token');
  // }
  // @HostListener('window:close', ['$event'])
  //   closeHandler(event) {
  //       window.sessionStorage.clear();
  //       localStorage.removeItem('token');
  //   }
  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('');
  }

  navigate(){
   
    this.router.navigate(['']);
    this.ngOnInit();
  }

  navigates(id){
    this.ngOnInit();
    this.router.navigate(['population/'+id+'']);
  }

  navigatestrash(){
    this.ngOnInit();
    this.router.navigate(['trash/']);
  }
  Contribute(){
    this.ngOnInit();
    this.router.navigate(['contribute/']);
  }
  reload(){
    window.location.reload();
    return false;
    // this.ngOnInit();
   }
   
}
