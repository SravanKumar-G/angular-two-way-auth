import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { SideNavComponent } from 'src/app/shared/side-nav/side-nav.component';


@Component({
  selector: 'app-backend-layout',
  templateUrl: './backend-layout.component.html',
  styleUrls: ['./backend-layout.component.scss']
})
export class BackendLayoutComponent implements OnInit, AfterViewInit {
  sidenavWidth = 70;
  side_triger=false;
  ngStyle: string;
  view_head=false;
  view_side_nav = false;
  @ViewChild(SideNavComponent) child:(SideNavComponent);

  constructor(private _sheard:SharedService, private rendrer:Renderer2) {
    this._sheard.view_head.subscribe(res => {
      this.view_head = res;
      console.log(res)
    })
   }

  ngOnInit(): void {
    this._sheard.toggleState.subscribe((res:any)=>{
      this.view_side_nav = res;
      // alert(this.view_side_nav)
    })
  }
  emitData(){
  this._sheard.emitData()
}
  increase() {
    this.sidenavWidth = 200;
    this.side_triger = true;
    this.child.side_triger =true;
    console.log(this.child.side_triger);
    
  }
  decrease() {
    this.sidenavWidth = 70;
    this.side_triger = false;
    this.child.side_triger =false;
    console.log(this.child.side_triger);
  }

  
ngAfterViewInit(): void {
 
}

}