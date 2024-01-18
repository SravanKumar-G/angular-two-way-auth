import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthService } from '../auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { UserRespons } from '../user-respons.interface/user-respons.interface';
import { Observable, from, map, pluck, startWith, toArray } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  RememberMe = true;
  email_show = true;
  otp_show= false;
  loginmode = true;
  display_err:any;
  model: UserRespons;
  errors = this._shared_serviec.errorMsgs;
  location_list:any= [];


  filterControl = new FormControl();
  filteredOptions: Observable<Array<any>>;
  optionItems: Array<any>;
  toppingList: any = [];


  public myform: FormGroup;
  constructor( private router: Router,private _shared_serviec:SharedService,private _authService: AuthService, private fb: FormBuilder) { }

  unfilteredDataToSearch: any = [
    {
      id: 1,
      CustomerName: "MAGNA AUTOMOTIVE INDIA PVT LTD",
      CustomerCode: 1
  },
  ];
  filteredDataToSearch: any[] = [];

  public beComponentForm: FormGroup = new FormGroup({
    slct_cntrl: new FormControl(''),
  });


  ngOnInit(): void {
    this._authService.user.subscribe(res=>{
      if(res){
        this.router.navigate(['/backend'])
      }
    })
    this.log_in_form();
    this.getCustomer();


  }

  mobileNumber = new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);



  log_in_form(){
    this.myform = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      fullName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      // customerCode: ['', Validators.required],
      description: ['', Validators.required],


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
    otpLength: 4,
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

  handleFillEvent(value: string): void {
    this.router.navigate(['/backend'])
    console.log("filled",value);
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
          return 'Please Enter Valid Email';
        }
        break;
      case 'pass':
        if (this.myform.get('password').hasError('required')) {
          return 'Password Required';
        }
        break;
        case 'fullName':
        if (this.myform.get('fullName').hasError('required')) {
          return 'Full Name Required';
        }
        break;
        case 'mobileNumber':
        if (this.myform.get('mobileNumber').hasError('required')) {
          return 'Mobile Number Required';
        }
        break;
        // case 'customerCode':
        // if (this.myform.get('customerCode').hasError('required')) {
        //   return 'Please Select Customer Name';
        // }
        case 'description':
        if (this.myform.get('description').hasError('required')) {
          return 'Please Enter Description';
        }
        break;

        case 'status':
          if (this.myform.get('status').hasError('required')) {
            return 'status required';
          }
          break;
      default:
        return '';
    }
  }
  onSubmit() {
    if (this.myform.valid) {




        this.model = this.myform.value;
        this._authService.signup(this.model).subscribe(res =>{
          console.log(res);
        // this.view_data();
        this.router.navigate(['']);
        this.opensnacbar('Registration Success');



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

    this.model = this.myform.value;
    console.log(this.model)
    // this.post = post;
  }

  onModeSwitch(){
    this.loginmode = !this.loginmode;
    console.log(this.loginmode)
  }

  opensnacbar(message:string){
    console.log("sancbar");
    // this._snackBar.openFromComponent(SnackbarComponent,{
    //   data:{
    //     message:message,
    //     snackBar:this._snackBar
    //   }
    // })
    this._shared_serviec.opensnacbar(message);
  }

  getCustomer(){
    this._authService.getCustomerCodes().subscribe((res)=>{
      console.log(res);
      this.location_list = res.result;
      console.log("location_list=>",typeof(this.location_list));
      this.filteredDataToSearch = this.location_list.map((w) => {
        return {
          text: w.CustomerName ,
          value: w.CustomerCode,
        };
      });
  console.log(this.location_list);
      from(this.location_list)
      .pipe(pluck('CustomerName'),toArray())
      .subscribe((result:any) => {
         this.toppingList = result;
        console.log(this.toppingList);

        this.optionItems = this.toppingList.map((item) => {
          return {
            name: item,
            show: true,
          };
        });
        console.log("*************",this.optionItems);
        this.filteredOptions = this.filterControl.valueChanges.pipe(
          startWith(''),
          map((value: string) => {
            this.optionItems.forEach((option) => {
              option.show = option.name
                .toLocaleLowerCase()
                .includes(value.toLowerCase());
            });
            return this.optionItems;
          })
        );
      });
    })


  }
  onPanelClose() {
    this.filterControl.setValue('');
  }


  // start
  lookup(e) {
    this.filteredDataToSearch = this.location_list
      .filter(
        (i) =>
          (i.CustomerName)
            .toString()
            .toLowerCase()
            .indexOf(e.value) > -1
      )
      .map((w) => {
        return {
          text: w.CustomerName,
          value: w.CustomerCode,
        };
      });

  }

  clean(t) {
    t.value = '';
    this.lookup(t.value);
  }
  // end
}
