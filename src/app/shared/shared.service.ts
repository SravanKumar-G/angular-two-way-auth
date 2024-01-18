import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable, Subject, pipe, throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { catchError, map } from 'rxjs/operators';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogPromptComponent } from './dialog-prompt/dialog-prompt.component';
import { DialogContenComponent } from './dialog-conten/dialog-conten.component';
import { DialogApproveUserComponent } from './dialog-approve-user/dialog-approve-user.component';
import { environment } from 'src/environments/environment';

import * as XLSX from 'xlsx';




@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public SearchvalueSubject = new Subject<any>();

  public toggleState = new Subject();

  public Selected_Services_data = new Subject<any>();

 toggleVal = false;

  toggled = false;
  _hasBackgroundImage = true;
  private API_URL= environment.API_URL;



  constructor(private http:HttpClient,private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  toggle() {
    this.toggled = ! this.toggled;
  }
  emitData(){
    this.toggleVal = !this.toggleVal;
    this.toggleState.next(this.toggleVal);
 }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  openpromt_confirm(promData:any){
    const dialogRef = this.dialog.open(DialogPromptComponent,{
      data:promData
    });
    return dialogRef.afterClosed()
  }

  service_selection_dialog(promData:any){
    const dialogRef = this.dialog.open(DialogPromptComponent,{
      data:promData, disableClose: true
    })
     dialogRef.afterClosed().subscribe((res)=>{
      console.log(res);
      this.passSeelctservValue(res);
     })
  }
  passSeelctservValue(data) {
    //passing the data as the next observable
    this.Selected_Services_data.next(data);
  }
  chang_pass_dialog(promData:any){
    const dialogRef = this.dialog.open(DialogContenComponent,{
      data:promData
    });
    return dialogRef.afterClosed()
  }

  conatac_us(promData:any){
    const dialogRef = this.dialog.open(DialogContenComponent,{
      data:promData,
      
    });
    return dialogRef.afterClosed()
  }

  approve_user_dialog(promData:any){
    const dialogRef = this.dialog.open(DialogApproveUserComponent,{
      data:promData
    });
    return dialogRef.afterClosed()
  }

  update_user_dialog(promData:any){
    const dialogRef = this.dialog.open(DialogApproveUserComponent,{
      data:promData
    });
    return dialogRef.afterClosed()
  }



  view_head = new BehaviorSubject(true);



  opensnacbar(message:string){
    console.log("sancbar", message);
    this._snackBar.openFromComponent(SnackbarComponent,{
      data:{
        message:message,
        snackBar:this._snackBar
      },
      panelClass:'panel-done',
      duration:1000,
      horizontalPosition:'right',
      verticalPosition:'top',
    })
  }

  errorMsgs:any = {
    UNKNOWN: 'PLEASE CHECK INTERNET',
    EMAIL_EXISTS:'EMAIL EXISTS',
    OTP_UNVERIFIED:'PLEASE ENTER VALID OTP',
    NOT_ACTIVATED: 'NOT ACTIVATED',
    INVALID_MOBILE: 'INVALID MOBILE',
    INVALID_CREDENTIALS:'INVALID CREDENTIALS!',
    EMAIL_NOT_FOUND:"EMAIL NOT FOUND",
    INVALID_EMAIL:'PLEASE CHECK EMAIL',
    INVALID_PASSWORD: 'INVALID PASSWORD',
    INVALID_NAME:"INVALID NAME",
    PASSWORD_MANDATORY: "PASSWORD_MANDATORY",
    MOBILE_EXISTS: "MOBILE NUMBER ALREADY EXISTS.",
    WRONG_OTP: "WRONG OTP",
    OTP_EXPIRED: "OTP EXPIRED",
  }
  err_hand(err:HttpErrorResponse){
    console.log(err.error.message);
    return throwError(this.opensnacbar(this.errorMsgs[err.error.message]))

    // this.display_err = this.errors[err.error.error.message];
  }

  fetchdata(product: any){
    return this.http.post<any>(this.API_URL + 'api/user/getAllUsers',product).pipe(
    )
  }

  dashboard_data_static(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/dashboard/getAllReports',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  dashboard_data(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/dashboard/getReports',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  getLoggedInUserLocations(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/dashboard/getLoggedInUserLocations',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }


  getWarehouseReports(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/dashboard/getWarehouseReports',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  getReports_data(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/reports/getReports',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  Delivered_Summary(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/delivered/summary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  Delivered_Route_wise(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/delivered/routeWiseSummary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  Delay_Analysis(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/delivered/delayedAnalysis',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  Delay_Analysis2(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/delivered/delayedAgeingConsignments',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  exceptionAnalysis(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/delivered/exceptionAnalysis',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  inTransitSummary(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/inTransit/summary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  POD_Summary_api(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/pod/summary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }
  roted_wise_dispatch(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/pod/routeWiseSummary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  receivedSummary(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/pod/receivedSummary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }
  notReceivedSummary(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/pod/notReceivedSummary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }
  

  getRouteWiseSummary(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/inTransit/routeWiseSummary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }
  upComingEtaSummary(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/inTransit/upComingEtaSummary',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  inTransitDelayAgeing(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/transportation/inTransit/inTransitDelayAgeing',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }


  getTrasportDataReports(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/dashboard/transportData',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  getTransportJourney(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/dashboard/getTransportJourneyReports',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }
  getSLAReports(data:any): Observable<any>{
    return this.http.post<any>(this.API_URL + 'api/dashboard/getSLAReports',data)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }

  getOutstandingPayments(data:any): Observable<ArrayBuffer>{
    return this.http.post<any>(this.API_URL + 'api/dashboard/getAllOutStandingPayments',data, {responseType: "arraybuffer" as "json"})
      .pipe(
        map((data)=>{
          return data
        })
      )
  }




  reject_user(pass:any){
    return this.http.get<any>(this.API_URL +`api/user/rejectUser/${pass}`,pass)
      .pipe(
        catchError(err=>{
          console.log(err);
          return this.err_hand(err);

        })
      )
  }
  set_password(password:any,id:number){
    return this.http.put<any>(this.API_URL + `api/user/update/${id}`,password)
      .pipe(
        catchError(err=>{
          console.log(err);
          return this.err_hand(err);

        })
      )
  }
  approved_user(locationId:number,id:number){
    return this.http.post<any>(this.API_URL + `api/user/approveUser/${id}`,locationId)
      .pipe(
        catchError(err=>{
          console.log(err);
          return this.err_hand(err);

        })
      )
  }

  update_user(locationId:number,id:number,fullName:any,customerCode:number){
    return this.http.put<any>(this.API_URL + `api/user/updateUser/${id}`,
    {
      locationId:locationId,
      fullName:fullName,
      customerCode:customerCode,
    })
      .pipe(
        catchError(err=>{
          console.log(err);
          return this.err_hand(err);

        })
      )
  }

  downloadExcel(tableId, fileName, col1, col2) {
    const element = document.getElementById(tableId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {raw: true});
    ws['!cols'] = [];
    ws['!cols'][col1] = {hidden: true};
    ws['!cols'][col2] = {hidden: true};
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName + '.xlsx');
  }

  getAllLocations(id:any): Observable<any>{
    return this.http.get<any>(this.API_URL + `api/locations/getAllLocations/${id}`)
      .pipe(
        map((data)=>{
          return data
        })
      )
  }
get_all_asl_filter(){
  return this.http.get<any>(this.API_URL+`api/auth/getAllLocations`)
  .pipe(
    map((data)=>{
      return data
    })
  )
}

  logout(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'api/user/logout')
      .pipe(
        map((data)=>{
          return data
        })
      )
  }
  passSearchValue(data:any) {
    //passing the data as the next observable
    this.SearchvalueSubject.next(data);
  }

}
