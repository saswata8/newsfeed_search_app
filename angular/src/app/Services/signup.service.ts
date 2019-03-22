import { Injectable } from '@angular/core';
import { User } from 'src/model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  //http:HttpClient;
  constructor(private http:HttpClient) 
  {
   
  }

  signupUser(user: User)
  {
    console.log("Inside signup service")
    return this.http.post('http://localhost:6757/user/register',user,{responseType:'text', observe:'response'});
  }
}
