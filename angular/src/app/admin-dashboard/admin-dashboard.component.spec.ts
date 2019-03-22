import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminService } from '../Services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let service : AdminService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(AdminService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check getUserList',()=>{
    spyOn(component,'getUserList').and.callFake(()=>{
      service.getUserList();
    })
    let spy = spyOn(service,'getUserList');

    component.getUserList();
    expect(spy).toHaveBeenCalledTimes(1);
  })

  it('check searchUser',()=>{
    let spy = spyOn(service, 'searchUser').and.callFake(()=>{

    });

    let searchText = component.formdata.controls['searchText'];
    searchText.setValue('da');

    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    
    expect(spy).toHaveBeenCalledTimes(1);
  })

  it('check blackListUser',()=>{
    let user = {userId:1, email:'cts@gmail.com', name:'cts'}
    spyOn(component,'blackListUser').and.callFake(()=>{
      service.blackListuser(user.userId);
    })

    let spy = spyOn(service,'blackListuser');
    component.blackListUser(user);
    expect(spy).toHaveBeenCalledTimes(1);
  })
});
