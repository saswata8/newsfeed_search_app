import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../Services/newsapi.service';
import { Search } from 'src/model/search';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  searchHistoryList = new Array<any>();
  newsApiService : NewsapiService;

  constructor(private service : NewsapiService) {
    this.newsApiService = service;
  }

  ngOnInit() {
    this.getsearchlist();
  }
  
  getsearchlist(){
    this.newsApiService.getSearchList().subscribe(response=>{
      this.searchHistoryList=response;
    });

  }
  deleteSearch(search)
  {
    this.newsApiService.deleteSearch(search.searchHistoryId).subscribe(response=>{
      console.log(response);
      alert(response);
      this.getsearchlist();
    });
  }

  onLogout()
  {
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.reload();
  }
}
