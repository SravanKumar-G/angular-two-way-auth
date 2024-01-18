import {  HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "../auth/auth.service"; 

import { exhaustMap, take } from "rxjs/operators";
import { Observable } from "rxjs";


@Injectable()

export class TokenInterceptor  implements HttpInterceptor{

    constructor(public _authService: AuthService){}
    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{

        
        return this._authService.user.pipe(
            take(1),
            exhaustMap((user:any)=>{
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    // params: new HttpParams().set('auth',user.token)
                     setHeaders: { Authorization: `Bearer ${user.token}` }
                })
                return next.handle(modifiedReq);
            })
            )
        
    }

}