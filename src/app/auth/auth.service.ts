import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, map, tap } from 'rxjs';

import { User } from './app-user/user.model';



import { SharedService } from '../shared/shared.service';
import { AuthRespons } from './auth-respons.interface/auth-respons.interface';
import { UserRespons } from './user-respons.interface/user-respons.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenExpirationTimer:any;
  private API_URL= environment.API_URL;
 user  = new BehaviorSubject<User>(null)

  constructor(private http:HttpClient, private _shared_service: SharedService,  private router:Router ) {

  }

  // SingIn(email:any,password:any){
  //  return this.http.post<AuthRespons>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1NnqWxMub5KjsQqtV9LOxogWuvsw4tSY',{
  //   email:email,
  //   password:password,
  //   returnSecureToken:true,
  //   }).pipe(
  //     catchError(err=>{
  //      return this._shared_service.err_hand(err);

  //     }),
  //     tap((res:any)=>{
  //       this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
  //     })
  //   )
  // }

  SingIn(email:any,password:any){
    return this.http.post<AuthRespons>(this.API_URL+'api/auth/login',{
     email:email,
     password:password,
     }).pipe(
       catchError(err=>{
        console.log(err)
        return this._shared_service.err_hand(err);
       }),
      //  tap((res:any)=>{
      //    this.authenticatedUser(res.categories,res.customerName,res.email, res.fullName, res.token, +res.expiresIn, res.locationId)
      //  })
     )
   }
   ResendOtp(email:any){
    return this.http.post<AuthRespons>(this.API_URL+'api/user/resendOtp',{
      email:email
    }).pipe(
      catchError(err=>{
       console.log(err)
       return this._shared_service.err_hand(err);
      }),
     //  tap((res:any)=>{
     //    this.authenticatedUser(res.categories,res.customerName,res.email, res.fullName, res.token, +res.expiresIn, res.locationId)
     //  })
    )
   }

   SetOtp(otp:number,email:any){
    return this.http.post<AuthRespons>(this.API_URL+`api/user/verifyEmailOTP`,{
      emailOtp:otp,
      email:email
    })
    .pipe(
      catchError(err=>{
        console.log(err)
        return this._shared_service.err_hand(err);
      }),
      tap((res:any)=>{
        this.authenticatedUser(res.categories,res.customerName,res.email, res.fullName, res.token, +res.expiresIn, res.locationId)
      })
    )
   }

   signup(data: UserRespons) {
    return this.http.post(this.API_URL+`api/auth/saveUser`, data)
    .pipe(
      catchError(err=>{
        console.log(err)
       return this._shared_service.err_hand(err);

      })
    )
  }

  validemail(email: any) {
    return this.http.get(this.API_URL+`api/auth/validateEmail/${email}`)
    .pipe(
      catchError(err=>{
        console.log(err)
       return this._shared_service.err_hand(err);

      })
    )
  }



  getCustomerCodes() {
    return this.http.get<any>(this.API_URL+`api/auth/getCustomerCodes`)
    .pipe(
      catchError(err=>{
        console.log(err)
       return this._shared_service.err_hand(err);

      })
    )
  }

  getServices() {
    return this.http.get<any>(this.API_URL+`api/services/getServices`)
    .pipe(
      catchError(err=>{
        console.log(err)
       return this._shared_service.err_hand(err);

      })
    )
  }

  autosingIn(){
    const userData = JSON.parse(localStorage.getItem('loggedin user data')|| '{}') ;

    if(!userData){
      return;
    }
    const loggedInUser = new User(userData.categories,userData.customerName,userData.email, userData.fullName, userData._token, new Date(userData._tokenExpirationDate), userData.locationId);

    if(loggedInUser.token){
      this.user.next(loggedInUser);
      const expirationduration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      // this.autoSingOUt(expirationduration)
    }

  }

  singOut(){
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem("loggedin user data");
    localStorage.removeItem("SelectedServicesdata");
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
    this._shared_service.logout().subscribe((res) => {
      if (res) {
        console.log(res, "logouyt");
      }
    })
  }

  // autoSingOUt(expirationDuration:number){
  //  this.tokenExpirationTimer =  setTimeout(() => {
  //     this.singOut();
  //   }, expirationDuration);
  //   console.log("expdate", this.tokenExpirationTimer);
  // }

  authenticatedUser(categories:any,customerName:string,email:string, fullName:string, token:string, expiresIn:any, locationId: any){

    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user  = new User(categories,customerName,email,fullName,token, expirationDate, locationId);
    console.log("users data",user)
    this.user.next(user);

    // this.autoSingOUt(expiresIn*1000)
    localStorage.setItem('loggedin user data', JSON.stringify(user) )
  }

  // fetchdata(){
  //   return this.http.get<any>('https://fire-crud-fa8f2-default-rtdb.firebaseio.com/students-list.json').pipe(
  //     map( (resdata:any) =>{
  //       const userArray : string[] = [];
  //       for(const key in resdata){
  //         if(resdata.hasOwnProperty(key)){
  //           userArray.push({userId:key,...resdata[key]})
  //         }
  //       }
  //       return userArray;
  //     })
  //   )
  // }
  getUser(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      console.error('Error while getting local storage key ', key, err);
      return '';
    }
  }
}
