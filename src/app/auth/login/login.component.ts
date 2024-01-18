import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {NgxOtpInputComponent, NgxOtpInputConfig} from 'ngx-otp-input';
import { AuthService } from '../auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

import CryptoJS from "crypto-js";
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,AfterViewInit {
 hide = true;
 RememberMe = true;
 email_show = true;
 otp_show= false;
 resetpassbt= false;
 login_show= true;
 loginmode = true;
intervaltime:any;
 display_err:any;
 wel_ani :boolean= false;
 otp_sen_count: number = 0;
view_pass= false;
otp_timeout:any;
otp_text_time:boolean=false;
reset_otp:boolean=false;
 errors = this._shared_serviec.errorMsgs

 public myform: FormGroup;

 isLinear = true;
 formNameGroup : FormGroup;
 formPasswordGroup : FormGroup;
 formEmailGroup : FormGroup;
 formPhoneGroup : FormGroup;
uservalidemail: any;
 uservalidemailupdate = new Subject<string>();

  @ViewChild('contentPlaceholder') ngxOtp: NgxOtpInputComponent;


  constructor( private router: Router,private _shared_serviec:SharedService,private _authService: AuthService, private fb: FormBuilder,private renderer: Renderer2) {
    this.createForm();
    this.uservalidemailupdate.pipe(
      debounceTime(10),
      distinctUntilChanged())
      .subscribe(value => {
        // this.consoleMessages.push(value);
        this.uservalidemail =value;
        console.log(this.uservalidemail);
      });

   }

  ngOnInit(): void {
    localStorage.removeItem("loggedin user data");
    localStorage.removeItem("SelectedServicesdata");
    // this._authService.user.subscribe(res=>{
    //   if(res){
    //     if(this.wel_ani == false){
    //       this.wel_ani = true;
    //       // alert("jldjf");
    //     }
    //     setTimeout(() => {
    //       this.router.navigate(['/backend'])
    //     }, 400);

    //   }
    // })
    if(this.otp_show == false){
      this.router.navigate(['/backend'])
    }
    this.log_in_form();

  }
  ngAfterViewInit() {
    var elem = this.renderer.selectRootElement('#myInputemail');
    elem.focus();
  }
  mobileNumber = new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);



  log_in_form(){
    this.myform = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
  }

  createForm() {
    this.formNameGroup  = this.fb.group({
      userName: ['', Validators.required]
    });

    this.formPasswordGroup  = this.fb.group({
      passWord: ['', Validators.required]
    });
    this.formEmailGroup  = this.fb.group({
      emailID: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.formPhoneGroup  = this.fb.group({
      mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
    });
    }


  getErrorMessage() {
    if (this.mobileNumber.hasError('required')) {
      return 'Mobile Number Required';
    }
    return this.mobileNumber.hasError('pattern') ? 'You must enter a valid mobile number' : '';
  }
  viewotp(){
    this.otp_show = true;
    this.email_show = false;
    console.log("jdl")
  }

  move(e:any, p:any, c:any, n:any){
    var length =  c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if(length == maxlength){
      if(n != ""){
        n.focus();
      }
    }
    if(e.key === 'Backspace'){
      if(p != ""){
        p.focus();
      }

    }

  }
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };

  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: any): void {
    // this.router.navigate(['/backend'])
    console.log("filled",value);
    const Otp_valu = value;
    const email = this.myform.value.email;
    this._authService.SetOtp(Otp_valu,email).subscribe(res =>{
console.log(res);

      if(this.wel_ani == false){
        this.wel_ani = true;

        // alert("jldjf");
      }
      setTimeout(() => {
        this.router.navigate(['backend']);
        this._shared_serviec.opensnacbar('login success');
      // this.opensnacbar('login success');
      }, 500);
    })


  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getError(el):any {
    switch (el) {
      case 'email_req':
        if (this.myform.get('email').hasError('required')) {
          return 'Email Required ';
        }
        break;
        case 'email_req1':
        if (this.myform.get('email').hasError('email')) {
          return 'Please Enter Valid Email Id';
        }
        break;
      case 'pass':
        if (this.myform.get('password').hasError('required')) {
          return 'Password Required';
        }
        break;
      default:
        return '';
    }
  }
  onSubmit() {
    if (this.myform.valid) {

      const email = this.myform.value.email;
        const password = this.myform.value.password;
        // console.log(this.formEmailGroup.value);
        // const email = this.formEmailGroup.value.emailID;
        // const password = this.formPasswordGroup.value.passWord;
      const encryptedPassword = CryptoJS.AES.encrypt(JSON.stringify(password), environment.secretKey).toString();

      this._authService.SingIn(email, encryptedPassword).subscribe(res =>{
          console.log(res);
          this.login_show = false;
          this.otp_show = true;
          this.otp_text_time = true;
          this.reset_otp = false;
          this.otp_timer(3);
          this.resetpassbt = true;
          this._shared_serviec.opensnacbar('OTP sent successfully..!');
        // this.view_data();

        // if(this.wel_ani == false){
        //   this.wel_ani = true;
        //   // alert("jldjf");
        // }
        // setTimeout(() => {
        //   this.router.navigate(['backend']);
        //   this._shared_serviec.opensnacbar('login success');
        // // this.opensnacbar('login success');
        // }, 500);




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


    // this.post = post;
  }

resend_otp(){
  this.otp_sen_count++;
  this.otpClear();
  console.log(this.otp_sen_count)
  const email = this.myform.value.email;
this._authService.ResendOtp(email).subscribe(res =>{
    console.log(res);
    this.login_show = false;
    this.otp_show = true;
    this.otp_text_time = true;
    this.reset_otp = false;
    this.otp_timer(3);
    // if(this.otp_sen_count < 2){
      this._shared_serviec.opensnacbar('OTP sent successfully..!');
    // }
    // this._shared_serviec.opensnacbar('You Cannot Reset Your OTP More Than Three Times');

  // this.view_data();

  // if(this.wel_ani == false){
  //   this.wel_ani = true;
  //   // alert("jldjf");
  // }
  // setTimeout(() => {
  //   this.router.navigate(['backend']);
  //   this._shared_serviec.opensnacbar('login success');
  // // this.opensnacbar('login success');
  // }, 500);




  }),
  (err:any)=>{

   console.log(err)
   this.display_err = err;
   this.login_show = true;
   this.otp_show = false;

  // this.display_err = this.errors[err.error.error.message];
  // if(!err.error || !err.error.error){
  //   this.display_err = this.errors[]
  // }
  }
}

  onModeSwitch(){
    this.loginmode = !this.loginmode;
    console.log(this.loginmode)
  }

  // opensnacbar(message:string){
  //   console.log("sancbar");
  //   // this._snackBar.openFromComponent(SnackbarComponent,{
  //   //   data:{
  //   //     message:message,
  //   //     snackBar:this._snackBar
  //   //   }
  //   // })
  //   this._shared_serviec.opensnacbar(message);
  // }

  view_pass_input(){
    console.log(this.uservalidemail);
    const valid_email = this.uservalidemail;
    this._authService.validemail(valid_email).subscribe((res)=>{
      this.view_pass = true;
      setTimeout(() => {
        this.renderer.selectRootElement('#passInput').focus();
      }, 500);
    }),
    (err:any)=>{
      console.log(err)
      this.display_err = err;
     }

  }


  otp_timer(minute) {
    if(this.otp_sen_count > 2){
      this.resteform();
    }
    this.reset_otp = false;
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    this.intervaltime = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.otp_timeout = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(this.intervaltime);
        this.otp_text_time = false;
        this.reset_otp = true;
      }
    }, 1000);
    console.log(this.intervaltime)
  }
  resteform(){
    clearInterval(this.intervaltime);
    this.myform.reset();
    this.otp_show = false;
    this.login_show = true;
    this.view_pass = false;
    this.reset_otp =false;
    this.resetpassbt= false;
  }

  otpClear() {
    this.ngxOtp.clear();
  }
}
