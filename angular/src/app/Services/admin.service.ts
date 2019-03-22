import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  getUserList()
  {
    return this.http.get<Array<User>>('http://localhost:6757/admin/getAllUser');
  }

  searchUser(searchText)
  {
    return this.http.get<Array<User>>('http://localhost:6757/admin/searchUser/'+searchText);
  }

  blackListuser(userId)
  {
    return this.http.get('http://localhost:6757/admin/blacklistUser/'+userId,{responseType:'text'});
  }
}
