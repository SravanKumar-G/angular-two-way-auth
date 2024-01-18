import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BackendHeaderComponent } from './backend-header/backend-header.component';
import { BackendFooterComponent } from './backend-footer/backend-footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SnackbarComponent } from './snackbar/snackbar.component';

import { SharedService } from './shared.service';
import { AppMaterialModule } from '../app-material/app-material.module';

import { DialogPromptComponent } from './dialog-prompt/dialog-prompt.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContenComponent } from './dialog-conten/dialog-conten.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogApproveUserComponent } from './dialog-approve-user/dialog-approve-user.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LoaderComponent } from './loader/loader.component';





@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BackendHeaderComponent,
    BackendFooterComponent,
    SnackbarComponent,
    SideNavComponent,
    DialogPromptComponent,
    DialogContenComponent,
    DialogApproveUserComponent,
    SearchFilterPipe,
    LoaderComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FlexLayoutModule,
    BackendHeaderComponent,
    SnackbarComponent,
    BackendFooterComponent,
    MatButtonToggleModule,
    MatDialogModule,
    AppMaterialModule,
    SideNavComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgScrollbarModule,
    SharedRoutingModule
  ],
  providers:[
    SharedService,
  ]
})
export class SharedModule { }
