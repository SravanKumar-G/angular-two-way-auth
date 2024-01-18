import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogApproveUserComponent } from './dialog-approve-user.component';

describe('DialogApproveUserComponent', () => {
  let component: DialogApproveUserComponent;
  let fixture: ComponentFixture<DialogApproveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogApproveUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogApproveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
