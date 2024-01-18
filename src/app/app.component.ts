import {Component, HostListener} from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public _authService: AuthService,private bnIdle: BnNgIdleService, private dialogRef: MatDialog) { }

  title = 'MASTER-TEM';
  ngOnInit(): void {
    this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
      this._authService.singOut();
      this.dialogRef.closeAll();
      console.log("logout movement stope")
    });
  
    console.log("app load")
    this._authService.autosingIn()
  }
}
