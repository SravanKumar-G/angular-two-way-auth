import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatButtonModule} from '@angular/material/button';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { AuthService } from '../auth/auth.service';


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent
  ],
  exports: [
    MatButtonModule
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    NgxOtpInputModule,
    CmsRoutingModule
  ],
  providers:[
    
    // httpInterceptorProviders
  ]
})
export class CmsModule { }
