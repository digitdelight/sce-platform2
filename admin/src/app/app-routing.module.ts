import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { BeforeLoginService } from './service/before-login.service';
import { AfterLoginService } from './service/after-login.service';

import { AddactivityComponent } from './addactivity/addactivity.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PopulationComponent } from './population/population.component';
import { EditComponent } from './edit/edit.component';
import { TrashComponent } from './trash/trash.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AlladminsComponent } from './alladmins/alladmins.component';
import { AllusersComponent } from './allusers/allusers.component';
import { ContributeComponent } from './contribute/contribute.component';
import { EditcontributeComponent } from './editcontribute/editcontribute.component';

const routes: Routes = [

  {path: '', component: HomeComponent,canActivate: [AfterLoginService]},  
  {path: '', component: LoginComponent,canActivate: [BeforeLoginService] },
  {path: 'signup', component: SigninComponent,canActivate: [AfterLoginService] },


  {path: 'dashboard', component: DashboardComponent,canActivate: [AfterLoginService] },
  {path: 'population/:id', component: PopulationComponent,canActivate: [AfterLoginService] },
  {path: 'edit/:id', component: EditComponent,canActivate: [AfterLoginService] },
  {path: 'editcon/:id', component: EditcontributeComponent,canActivate: [AfterLoginService] },
  {path: 'trash', component:  TrashComponent,canActivate: [AfterLoginService]},
  {path: 'contribute', component:  ContributeComponent,canActivate: [AfterLoginService]},
  {path: 'Category/:id', component: CategoryComponent},
  {path: 'Content/:id', component: ContentComponent },
  {path: 'addcat', component:  AddcategoryComponent },
  {path: 'addact', component:  AddactivityComponent },
  {path: 'About', component:  AboutComponent },
  {path: 'alladmins', component:  AlladminsComponent,canActivate: [AfterLoginService] },
  {path: 'allusers', component:  AllusersComponent,canActivate: [AfterLoginService] },
  {path: 'profile', component:  ProfileComponent,canActivate: [AfterLoginService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
