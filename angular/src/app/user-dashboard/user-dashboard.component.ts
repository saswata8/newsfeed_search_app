import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../Services/newsapi.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  mArticles:Array<any>;
  mSources:Array<any>;
  formdata:FormGroup;
  submitted : boolean;

  constructor(private newsapi:NewsapiService, private fb:FormBuilder) { }

  ngOnInit() {
    this.submitted = false;
    this.formdata = this.fb.group(
      {
        search : new FormControl()
      }
    )
     //load articles
     this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
     //load news sources
     this.newsapi.initSources().subscribe(data=> this.mSources = data['sources']); 
  }

  get myForm()
  {
    return this.formdata.controls;
  }

  searchArticles(source:any){
    this.submitted = true;
    console.log("selected source is: "+source.search);
    if(this.formdata.invalid)
      return;
    this.newsapi.getArticlesByID(source.search).subscribe(data => this.mArticles = data['articles']);
    this.newsapi.saveSearch(source.search).subscribe(data=>console.log(data));
  }
  
  onLogout()
  {
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.reload();
  }
}
