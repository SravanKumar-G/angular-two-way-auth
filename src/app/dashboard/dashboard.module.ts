import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';

import {MatGridListModule} from '@angular/material/grid-list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipPipe } from './search-pip.pipe';
import { MatSelectModule } from '@angular/material/select';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';







@NgModule({
  declarations: [
    DashboardComponent,
    SearchPipPipe,
  ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatTableModule,
        MatIconModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatMenuModule,
        MatButtonModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        DragDropModule,
        MatGridListModule,
        MatFormFieldModule,
        MatSelectModule,
        HighchartsChartModule,
        CarouselModule,
        MatTabsModule,
        NgScrollbarModule,
        NgxDaterangepickerMd.forRoot(),
        DashboardRoutingModule,
        SharedModule,

    ]
})
export class DashboardModule { }
