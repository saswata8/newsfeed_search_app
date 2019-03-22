import { Component, OnInit } from '@angular/core';
import { SignupService } from '../Services/signup.service';
import { User } from 'src/model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formdata : FormGroup;
  submitted : boolean;
  message:string;
  constructor(private fb: FormBuilder, private signupService:SignupService, private router:Router) { 
   
  }

  ngOnInit() {
    this.formdata = this.fb.group(
      {
        'name' : ['', [Validators.required,Validators.minLength(2), Validators.maxLength(30),Validators.pattern('^[a-zA-Z]+$')]],
        'email' : ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._-]+@[A-Za-z0-9]+\\.[A-Za-z]{2,4}$')]],
        'password' : ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%&*]).{8,}$')]]
      })
    this.submitted=false;
  }

  onRegister(user:User)
  {
    this.submitted = true;
    console.log("Inside Register");
    
    if(this.formdata.invalid)
    {
      console.log("inside invalid");
      return;
    }
    this.signupService.signupUser(user).subscribe(
      response =>
      {
        console.log('called1')
        this.message = response.body;
        alert(response.body);
        this.router.navigate(['login']);
      },
      error =>
      {
        if(error.status == 409)
        {
          alert("User already exists! Please login!");
          this.router.navigate(['login']);
        }
        else
        {
          alert("Something went wrong! Please try again later.");
          return;
        }
      });
      console.log('called');
    }

  get myForm()
  {
    return this.formdata.controls;
  }
}
