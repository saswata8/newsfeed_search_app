import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { User } from 'src/model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtResponse } from 'src/model/jwtResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata : FormGroup;
  submitted : boolean;
  jwtResponse : jwtResponse;
  message : string;
  
  constructor(private loginService : LoginService, private fb : FormBuilder, private router:Router) { }

  ngOnInit() {
    this.submitted = false;
    this.formdata = this.fb.group({
      email : ['',Validators.required],
      password : ['',Validators.required]
    });
  }

  onLogin(user:User)
  {
      console.log("Inside onLogin");
      this.submitted = true;
      if(this.formdata.invalid)
      {
        console.log("Inside invalid");
        return;
      }
      this.loginService.loginUser(user).subscribe(
        (response:jwtResponse)=>{
        console.log(response.authorities[0].authority);
        window.localStorage.setItem('Token',response.token);
        window.localStorage.setItem('Email',response.username);
        window.localStorage.setItem('Authorities',response.authorities[0].authority);
        if(response.token == null)
          alert("Sorry! You are blacklisted! Please contact admin!");
        else
        {
          alert("Succcessfully logged in!");

          if(response.authorities[0].authority == 'ROLE_User')
            this.router.navigate(['user-dashboard']);
          else
            this.router.navigate(['admin-dashboard']);
        }
      },
      error=>
      {
        if(error.status == 400)
          alert("Please provide correct email/password!");
        else
          alert("Something went wrong! Please try again later.");
      });
  }

  get myForm()
  {
    return this.formdata.controls;
  }
}
