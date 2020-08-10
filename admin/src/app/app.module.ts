import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JarwisService } from './service/jarwis.service';
import {ReactiveFormsModule} from "@angular/forms";
import { CategoryComponent } from './category/category.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AccountComponent } from './user/account/account.component';
import { FormsModule } from '@angular/forms';
import { BeforeLoginService } from './service/before-login.service';
import { AfterLoginService } from './service/after-login.service';
import { TokenService } from './service/token.service';
import { AuthService } from './service/auth.service';
import { ProfileComponent } from './user/profile/profile.component';
import { DetailsComponent } from './user/details/details.component';
import { PostComponent } from './user/post/post.component';
import { MypostComponent } from './user/mypost/mypost.component';
import {MatSelectModule,MatInputModule,MatButtonModule,MatListModule, MatSnackBarModule, MatToolbarModule, MatDialogModule,MatCardModule,MatIconModule,} from '@angular/material';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete'​;
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateComponent } from './user/update/update.component';
import { TrashComponent } from './trash/trash.component';
// import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PopulationComponent } from './population/population.component';
import { EditComponent } from './edit/edit.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { EditactComponent } from './editact/editact.component';
import { EditcatComponent } from './editcat/editcat.component';
import { AllusersComponent } from './allusers/allusers.component';
import { AlladminsComponent } from './alladmins/alladmins.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ModalComponent } from './modal/modal.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ContributeComponent } from './contribute/contribute.component';
import { EditcontributeComponent } from './editcontribute/editcontribute.component';
// import { BnNgIdleService } from 'bn-ng-idle';

@NgModule({
  declarations: [
    
    AppComponent,
    CategoryComponent,
    ContentComponent,
    HomeComponent,
    LoginComponent,
    SigninComponent,
    AccountComponent,
    ProfileComponent,
    DetailsComponent,
    PostComponent,
    MypostComponent,
    AddcategoryComponent,
    AboutComponent,
    ContactComponent,
    UpdateComponent,
    DashboardComponent,
    PopulationComponent,
    EditComponent,
    AddactivityComponent,
    TrashComponent,
    EditactComponent,
    EditcatComponent,
    AllusersComponent,
    AlladminsComponent,
    EdituserComponent,
    ModalComponent,
    ContributeComponent,
    EditcontributeComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
     MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    // LazyLoadImageModule.forRoot({
    //   preset: scrollPreset 
    // }),
    MatToolbarModule,
    MatAutocompleteModule​,
    MatFormFieldModule,
  
  ],
  providers: [JarwisService,TokenService,AuthService,BeforeLoginService,AfterLoginService],
  entryComponents: [EditcatComponent,EditactComponent,EdituserComponent,ModalComponent,EditcontributeComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
