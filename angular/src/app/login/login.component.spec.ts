import { TestBed, ComponentFixture } from "@angular/core/testing";
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../Services/login.service';

describe('login component tests',() =>
{
  let login : LoginComponent;
  let fixture : ComponentFixture<LoginComponent>;
  let service : LoginService;

    beforeEach(()=>
    {
        TestBed.configureTestingModule(
          {
            declarations: [LoginComponent],
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule]
          }).compileComponents();

          fixture = TestBed.createComponent(LoginComponent);
          login = fixture.componentInstance;
          service = TestBed.get(LoginService);
          fixture.detectChanges();
    });

    it('is login component defined',()=>
    {
        expect(login).toBeDefined();
    });

    it('is login valid',()=>
    {
      let email = login.formdata.controls["email"];
      email.setValue("saswata.ch@gmail.com");

      let password = login.formdata.controls["password"];
      password.setValue("Saswata@123");

      expect(login.formdata.valid).toBeTruthy();
    });

    it('check error message with empty email',()=>{

      let email = login.formdata.controls["email"];
      email.setValue('');

      let password = login.formdata.controls["password"];
      password.setValue('Admin@123');

      fixture.debugElement.query(By.css('#loginbtn')).nativeElement.click();
      
      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#emailEmptyError');
      expect(text.innerHTML).toContain('Email is required');
    });

    it('check error message with empty password',()=>{

      let email = login.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = login.formdata.controls["password"];
      password.setValue('');

      fixture.debugElement.query(By.css('#loginbtn')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#passwordEmptyError');
      expect(text.innerHTML).toContain('Password is required');
    });

    it('check login service with valid data',()=>{

      let spy = spyOn(service,'loginUser').and.callFake(()=>{
        login.message = 'Succcessfully logged in!';
      })

      let email = login.formdata.controls["email"];
      email.setValue("saswata.ch@gmail.com");

      let password = login.formdata.controls["password"];
      password.setValue("Saswata@123");

      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(login.message).toContain('Succcessfully logged in!');
    })

    it('check login service with invalid data',()=>{

      let spy = spyOn(service,'loginUser').and.callFake(()=>{
        login.message = 'Please provide correct email/password!';
      })

      let email = login.formdata.controls["email"];
      email.setValue("saswata.ch@gmail.com");

      let password = login.formdata.controls["password"];
      password.setValue("Saswata@123");

      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(login.message).toContain('Please provide correct email/password!');
    })

    it('check login service with blacklisted user',()=>{

      let spy = spyOn(service,'loginUser').and.callFake(()=>{
        login.message = 'Sorry! You are blacklisted! Please contact admin!';
      })

      let email = login.formdata.controls["email"];
      email.setValue("hada2@gmail.com");

      let password = login.formdata.controls["password"];
      password.setValue("Admin@123");

      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(login.message).toContain('Sorry! You are blacklisted! Please contact admin!');
    })

    it('check login service when server is down',()=>{

      let spy = spyOn(service,'loginUser').and.callFake(()=>{
        login.message = 'Something went wrong! Please try again later.';
      })

      let email = login.formdata.controls["email"];
      email.setValue("hada2@gmail.com");

      let password = login.formdata.controls["password"];
      password.setValue("Admin@123");

      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(login.message).toContain('Something went wrong! Please try again later.');
    })
})
