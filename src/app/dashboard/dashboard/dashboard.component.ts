import {Component, OnInit} from '@angular/core';


/**
 * @title Basic use of `<table mat-table>`
 */
var labelss = ['producs', '25k', '50k', '60k'];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  };
}
