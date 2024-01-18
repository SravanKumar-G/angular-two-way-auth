import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxOtpInputModule } from "ngx-otp-input";
import { AuthService } from './auth.service';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxOtpInputModule,
    AuthRoutingModule
  ],
  providers:[
    AuthService
    // httpInterceptorProviders
  ]
  
})
export class AuthModule { }
