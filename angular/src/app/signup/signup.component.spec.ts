import { TestBed, ComponentFixture } from "@angular/core/testing";
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupService } from '../Services/signup.service';

describe('signup component tests',() =>
{
  let signup : SignupComponent;
  let fixture : ComponentFixture<SignupComponent>;
  let service : SignupService;

    beforeEach(()=>
    {
        TestBed.configureTestingModule(
          {
            declarations: [SignupComponent],
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule]
          }).compileComponents();

          fixture = TestBed.createComponent(SignupComponent);
          signup = fixture.componentInstance;
          fixture.detectChanges();
          service = TestBed.get(SignupService);
    });

    it('is signup component defined',()=>
    {
        expect(signup).toBeDefined();
    });

    it('is signup valid',()=>
    {
      let name = signup.formdata.controls["name"];
      name.setValue("Saswata");

      let email = signup.formdata.controls["email"];
      email.setValue("saswata.ch@gmail.com");

      let password = signup.formdata.controls["password"];
      password.setValue("Saswata@123");

      expect(signup.formdata.valid).toBeTruthy();
    });

    it('check error message with invalid name',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('saswata1234');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();
      
      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#namePatternError');
      expect(text.innerHTML).toContain('Name can only be alphabets');
    });

    it('check error message with empty name',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#nameEmptyError');
      expect(text.innerHTML).toContain('Name is required');
    });

    it('check error message with length of name less than min length',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('s');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      
      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#nameMinLengthError');
      expect(text.innerHTML).toContain('Name must be between 2 and 30 characters');
    });

    it('check error message with length of name more than max length',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('xvbdcbhfvngfhnfdmbkhjslmnfjksdbndjkbnjkdvnhjkdfhnvjfdjdjbdjksfhcshfcjubhsfcjsdfh');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#nameMaxLengthError');
      expect(text.innerHTML).toContain('Name must be between 2 and 30 characters');
    });

    it('check error message with empty password',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('Mohahada');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#passwordEmptyError');
      expect(text.innerHTML).toContain('Password is required');
    });

    it('check error message with length of password less than min length',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('Mohahada');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('gdg@12');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#passwordMinLengthError');
      expect(text.innerHTML).toContain('Password must be at least 8 characters');
    });

    it('check error message for no capital letter in password',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('Mohahada');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('gdg@123454');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#passwordPatternError');
      expect(text.innerHTML).toContain('Password must contain at least 1 capital letter, 1 small letter, 1 digit and 1 special character');
    });

    it('check error message for no small letter in password',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('Mohahada');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('GDG@123454');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#passwordPatternError');
      expect(text.innerHTML).toContain('Password must contain at least 1 capital letter, 1 small letter, 1 digit and 1 special character');
    });

    it('check error message for no special character in password',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('Mohahada');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('GDGfgf123454');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#passwordPatternError');
      expect(text.innerHTML).toContain('Password must contain at least 1 capital letter, 1 small letter, 1 digit and 1 special character');
    });

    it('check error message for no digit in password',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('Mohahada');

      let email = signup.formdata.controls["email"];
      email.setValue('hada@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('GDGdfsd@');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();

      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#passwordPatternError');
      expect(text.innerHTML).toContain('Password must contain at least 1 capital letter, 1 small letter, 1 digit and 1 special character');
    });

    it('check error message with empty email',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('saswata');

      let email = signup.formdata.controls["email"];
      email.setValue('');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();
      
      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#emailEmptyError');
      expect(text.innerHTML).toContain('Email is required');
    });

    it('check error message with invalid email',()=>{
      let name = signup.formdata.controls["name"];
      name.setValue('saswata');

      let email = signup.formdata.controls["email"];
      email.setValue('ndsgmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      fixture.debugElement.query(By.css('#register')).nativeElement.click();
      
      fixture.detectChanges();
      let text = fixture.debugElement.nativeElement.querySelector('#emailPatternError');
      expect(text.innerHTML).toContain('Email is not valid');
    });

    it('check signup service',()=>{
      
      let spy = spyOn(service,'signupUser').and.callFake(()=>{
       signup.message='User successfully registered! Please login!';
      });
  
      let name = signup.formdata.controls["name"];
      name.setValue('saswata');

      let email = signup.formdata.controls["email"];
      email.setValue('nds@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(signup.message).toContain('User successfully registered! Please login!');
    })

    it('check signup service with existing data',()=>{

      let spy = spyOn(service,'signupUser').and.callFake(()=>{
        signup.message='User already exists! Please login!';
       });

      let name = signup.formdata.controls["name"];
      name.setValue('cts');

      let email = signup.formdata.controls["email"];
      email.setValue('cts@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(signup.message).toContain('User already exists! Please login!');
    })

    it('check signup service when server is down',()=>{

      let spy = spyOn(service,'signupUser').and.callFake(()=>{
        signup.message='Something went wrong! Please try again later.';
       });

      let name = signup.formdata.controls["name"];
      name.setValue('cts');

      let email = signup.formdata.controls["email"];
      email.setValue('cts@gmail.com');

      let password = signup.formdata.controls["password"];
      password.setValue('Admin@123');

      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(signup.message).toContain('Something went wrong! Please try again later.');
    })
})