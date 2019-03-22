import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/model/user';
import { AdminService } from '../Services/admin.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminservice : AdminService
  userList : Array<User>;
  formdata : FormGroup;

  constructor(private service : AdminService, private fb : FormBuilder) { 
    this.adminservice = service;
    this.formdata = this.fb.group({
      searchText : new FormControl()
    })
  }

  ngOnInit() {
    this.userList=new Array<User>();
    this.getUserList();
  }

  getUserList()
  {
    this.adminservice.getUserList().subscribe(response => {
      this.userList = response;
    });
  }

  searchUser(search)
  {
    if(search.length == 0)
    {
      this.getUserList();
    }
    else
    {
      console.log("else");
      
      this.adminservice.searchUser(search.searchText).subscribe(response =>
        {
          this.userList = response;
        });
    }
  }
  
  blackListUser(user)
  {
    this.adminservice.blackListuser(user.email).subscribe(response =>
      {
        alert(response);
        this.userList[this.userList.indexOf(user)].status = false;
      })
  }

  onLogout()
  {
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.reload();
  }
}
