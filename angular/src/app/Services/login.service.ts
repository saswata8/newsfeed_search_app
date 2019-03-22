import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/user';
import { jwtResponse } from 'src/model/jwtResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  email : string;
  constructor(private http : HttpClient) { }
    

  loginUser(user:User)
  {
      this.email = user.email;
      window.localStorage.setItem('Email',user.email);
      console.log(this.email);
      console.log("Inside login service");
      return this.http.post<jwtResponse>("http://localhost:6757/user/login",user);
  }
}
