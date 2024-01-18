import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
import {environment} from "../../../environments/environment";

import CryptoJS from "crypto-js";


@Component({
  selector: 'app-dialog-conten',
  templateUrl: './dialog-conten.component.html',
  styleUrls: ['./dialog-conten.component.scss'],
})
export class DialogContenComponent implements OnInit {
  public myform: FormGroup;
  hide = true;
  display_err:any;
  updatedid:number;
  contact_cont:boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data,private fb: FormBuilder, private _shared_serviec: SharedService, private renderer: Renderer2) { }


  ngOnInit(): void {
    console.log(this.data);
    if(this.data =="contact_us_popup"){
this.contact_cont = false;
    }
    this.chang_pass_form();
  }

  chang_pass_form(){
    this.myform = this.fb.group({

      password: ['', Validators.required],
    });
  }

  getError(el):any {
    switch (el) {

      case 'pass':
        if (this.myform.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit() {
    if (this.myform.valid) {
      const id = this.data;
      const password = this.myform.value;
      console.log(this.myform.value);
      const encryptedPassword = CryptoJS.AES.encrypt(JSON.stringify(this.myform.value.password), environment.secretKey).toString();
      const pass = {password: encryptedPassword}
      this._shared_serviec.set_password(pass,id).subscribe((res)=>{
        console.log(res);
        this.renderer.selectRootElement('.cdk-overlay-backdrop').click();
        this._shared_serviec.opensnacbar("password change successfully");
      }),
      (err:any)=>{

        console.log(err)
        this.display_err = err;
       // this.display_err = this.errors[err.error.error.message];
       // if(!err.error || !err.error.error){
       //   this.display_err = this.errors[]
       // }
       }
    }


  }



}
