import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
import { AuthService } from 'src/app/auth/auth.service';
import { debounceTime, fromEvent, map } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-dialog-approve-user',
  templateUrl: './dialog-approve-user.component.html',
  styleUrls: ['./dialog-approve-user.component.scss']
})
export class DialogApproveUserComponent implements OnInit,AfterViewInit {
  public myform: FormGroup;
  hide = false;
  display_err:any;
  updatedid:number;
  find_cus_code:number;
  find_cus_name:any;
  find_loc_id:number;
  unfilteredDataToSearch: any[] = [];
  filteredDataToSearch: any[] = [];
  unfilteredCustomerData: any[] = [];
  filteredCustomerData: any[] = [];
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('myInput') myInput:ElementRef;
  // custerselect serchbox start
  // @ViewChild('toggleButton') toggleButton: any;
  // @ViewChild('toggleButton1') toggleButton1: any;
  // @ViewChild('menu') menu: any;
  // @ViewChild('menu1') menu1: any;
  isMenuOpenselect = false;
  isMenuOpenselect1 = false;
  selectedName: any;
  selectedType: any;
  searchText: any='';


  // custerselect serchbox end

  constructor(@Inject(MAT_DIALOG_DATA) public data,private fb: FormBuilder, private _shared_serviec: SharedService, private renderer: Renderer2, private _authService: AuthService) { 
  
  }
  ngAfterViewInit(): void {
   
//     this.renderer.listen('window', 'click',(e:Event)=>{
      
//      if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
//          this.isMenuOpenselect=false;
//      }
    
//  });
//  this.renderer.listen('window', 'click',(e:Event)=>{
      
//   if(e.target !== this.toggleButton1.nativeElement && e.target!==this.menu1.nativeElement){
//       this.isMenuOpenselect1=false;
//   }
 
// });
const searchterm = fromEvent<any>(this.myInput.nativeElement, 'keyup').pipe(
  map(event => event.target.value),
  debounceTime(500)
).subscribe(res=>{
  this.searchText = res;
  console.log(res)
  
});
  }
  
   

  ngOnInit(): void {
    this.getCustomers();
    console.log(this.data);
   if(this.data[0] == 'Approve User'){
    this.Approve_User_form();
    // alert("appro");
   }

   if(this.data[0] == 'Update User'){
    this.update_user();
    this.Update_User_form();
    // let output = this.unfilteredCustomerData.find((a)=>{this.data[2] == a.customerCode});
    // console.log(output)
    // alert("update");
   }
    
    
    
    // this.getLocations(this.data)
    
  }

  Approve_User_form(){
    this.myform = this.fb.group({
      locationId: ['', Validators.required],
      customerCode: ['', Validators.required],
    });
  }

  Update_User_form(){
    this.myform = this.fb.group({
      locationId: ['', Validators.required],
      customerCode: ['', Validators.required],
    });
  }

  getError(el):any {
    switch (el) {

      case 'loca':
        if (this.myform.get('locationId').hasError('required')) {
          return 'locationId required';
        }
        break;
      case 'customer':
        if (this.myform.get('customerCode').hasError('required')) {
          return 'Customer required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit() {
    if (this.myform.valid) {
      if(this.data[0]=== "Update User"){
        // alert("Update User");
        const id = this.data[1];
      const locationId = this.myform.value.locationId;
      const fullName = this.data[4];
      const customerCode = this.myform.value.customerCode;
      console.log("=>>>>>>",locationId,id,fullName,customerCode);
      this._shared_serviec.update_user(locationId,id,fullName,customerCode).subscribe((res)=>{
        console.log(res);
    
        const data ={
          title: "Are you Sure Want To Update User Details?",
          text: "After Updating User Details You Need To Login Again"
        };
        this._shared_serviec.openpromt_confirm(data).subscribe((res)=>{
          if(res){
            console.log(res);
          this.renderer.selectRootElement('.cdk-overlay-backdrop').click();
          this._shared_serviec.opensnacbar("successfully");
          this._authService.singOut();
          }
        })
        
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
      if(this.data[0] === "Approve User"){
        const id = this.data[1];
        const locationId = this.myform.value;
        console.log(this.myform.value, "=>");
        this._shared_serviec.approved_user(locationId,id).subscribe((res)=>{
          console.log(res);
           this.renderer.selectRootElement('.cdk-overlay-backdrop').click();
          this._shared_serviec.opensnacbar("successfully");
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

    getLocations(id:any){
    this.unfilteredDataToSearch = [];
    this._shared_serviec.getAllLocations(id).subscribe(res=>{
      console.log(res);
      this.unfilteredDataToSearch = res.result;
      console.log("unfilteredDataToSearch",this.unfilteredDataToSearch);
      this.filteredDataToSearch = this.unfilteredDataToSearch.map((w) => {
        return {
          text: w.location ,
          value: w.location_id,
        };
      });
    })
  }

  getCustomers(){
    this._authService.getCustomerCodes().subscribe(res=>{
      console.log(res);
      this.unfilteredCustomerData = res.result;
      console.log("unfilteredDataToSearch",this.unfilteredDataToSearch);
      this.filteredCustomerData = this.unfilteredCustomerData.map((w) => {
        return {
          text: w.CustomerName ,
          value: w.CustomerCode,
        };
      });
    })
  }

// start
lookup(e) {
  this.filteredDataToSearch = this.unfilteredDataToSearch
    .filter(
      (i) =>
        (i.location)
          .toString()
          .toLowerCase()
          .indexOf(e.value) > -1
    )
    .map((w) => {
      return {
        text: w.location,
        value: w.location_id,
      };
    });

}

customerlookup(e) {
  this.filteredCustomerData = this.unfilteredCustomerData
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

  customerclean(t) {
    t.value = '';
    this.customerlookup(t.value);
  }
// end

update_user(){
  this._authService.getCustomerCodes().subscribe(res=>{
    console.log(res.result);
    const dataObj = res.result.find(data => data.CustomerName === this.data[2]);
    this.find_cus_code=  dataObj.CustomerCode ;
    this.find_cus_name = dataObj.CustomerName;
console.log("find_cus_code",this.find_cus_code, this.find_cus_name);

// this.getLocations(this.find_cus_code);
this._shared_serviec.getAllLocations(this.find_cus_code).subscribe(res=>{
  console.log(res.result);
  this.unfilteredDataToSearch = res.result;
  this.filteredDataToSearch = this.unfilteredDataToSearch.map((w) => {
    return {
      text: w.location ,
      value: w.location_id,
    };
  });
  const locid = this.filteredDataToSearch.find(data => data.text === this.data[3]);
  this.find_loc_id = locid.value;
  console.log("id loc", this.find_loc_id);
})

  });

}
toggleMenus() {
  console.log(this.isMenuOpenselect)
  this.isMenuOpenselect1 = false;
  this.isMenuOpenselect = !this.isMenuOpenselect;
}
toggleMenus1() {
  console.log(this.isMenuOpenselect1)
  this.isMenuOpenselect = false;
  this.isMenuOpenselect1 = !this.isMenuOpenselect1;
}
cus_selected_menus(index, customer){
  this.find_cus_name = customer.text;
  this.find_cus_code = customer.value;
  this.getLocations(this.find_cus_code);
}
cus_selected_menus1(index, customer){
  this.find_cus_name = customer.text;
  this.find_loc_id = customer.value;
}

cler_val(){
 
  this.searchText = "";
  
}
}
