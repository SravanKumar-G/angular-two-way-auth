import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dialog-prompt',
  templateUrl: './dialog-prompt.component.html',
  styleUrls: ['./dialog-prompt.component.scss']
})
export class DialogPromptComponent implements OnInit {
view_selectpromt:boolean= false;
value: any;
dis_abla_val:boolean =true;

// options: any = [
//   {
//     value: '1',
//     displayValue: 'TRASPORTATION FTL',
//     icon:'transport_icon',
//     active_icon:'transport_active_icon'
//   },
//   {
//     value: '2',
//     displayValue: 'WAREHOUSING',
//     icon:'22',
//     active_icon:'22a'
//   },
// ];
options: any = [
  // {
  //   categoryId: '1',
  //   name: 'TRASPORTATION FTL',
    
  // },
  // {
  //   categoryId: '2',
  //   name: 'WAREHOUSING',
    
  // },
];
  constructor(@Inject(MAT_DIALOG_DATA) public data,public _authService:AuthService) { }

  ngOnInit(): void {
    this._authService.getServices().subscribe((res)=>{
      this.options = res.result
      console.log("$$$$$$$$$$$$$$",this.options);
    })
    console.log(this.data);
if(this.data[0] == "service_dialog"){
  this.view_selectpromt= true;
}
  }
  
  change(event: MatButtonToggleChange) {
   
   this.dis_abla_val = false;
    this.value = event.value;
    console.log(this.value);
    if(this.value == '' ){
      this.value = null;
      this.dis_abla_val = true;
     }if(this.value?.length < 1){
      alert("jkdf")
     }
  }
  reseted_value(){
    this.value = null;
    this.dis_abla_val = true;
  }

}
