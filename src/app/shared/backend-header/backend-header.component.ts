import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from '../shared.service';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-backend-header',
  templateUrl: './backend-header.component.html',
  styleUrls: ['./backend-header.component.scss']
})
export class BackendHeaderComponent implements OnInit, AfterViewInit {
arr_class = false;
searchText: any='';
userobject: any = {};
@ViewChild('myInput') myInput:ElementRef;

  constructor(private _authService: AuthService,public _shared_serviec: SharedService) { }

  ngOnInit(): void {
    this.userobject = this._authService.getUser('loggedin user data');
    console.log(this.userobject);
   
    this._shared_serviec.toggleState.subscribe((res:any)=>{
      this.arr_class = res;
      // alert(this.view_side_nav)
    })
    this._shared_serviec.SearchvalueSubject.subscribe(res=>{
      console.log("header",res);
      if(res===null){
        this.cler_val()
      }
    })
  }
  view_toggel(){
    this.arr_class = !this.arr_class;
    console.log(this.arr_class);
    this._shared_serviec.emitData();
    
  }
  singout(){
    this._authService.singOut();
    
  }
  sendTextValue(){
    console.log("function call")
   this._shared_serviec.passSearchValue(this.searchText);
  }
  
  ngAfterViewInit(): void {
    const searchterm = fromEvent<any>(this.myInput.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(500)
    ).subscribe(res=>{
      this.searchText = res;
      console.log(res)
      this.sendTextValue()
    });
    
  }
  cler_val(){
   
    this.searchText = "";
    this.sendTextValue();
  }
}
