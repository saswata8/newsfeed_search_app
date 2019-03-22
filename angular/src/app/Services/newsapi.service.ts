import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from 'src/model/search';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NewsapiService {

  api_key = 'd7578a2f832c4a82ab1c325ca0e58ee2';

  search : Search;

  constructor(private http:HttpClient,private loginService:LoginService) {
     this.search=new Search();
   }

  initSources(){
     return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key);
  }

  initArticles(){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key);
  }

  getArticlesByID(source: string){
    return this.http.get('https://newsapi.org/v2/everything?' +
          'q='+ source +
          '&from=2019-02-12&' +
          'sortBy=popularity&apiKey=' +
          this.api_key);
   }

   saveSearch(query:string)
   {  
      console.log("Inside SaveSearch service");
      console.log(this.loginService.email);
      console.log(query);
      this.search.userId = window.localStorage.getItem('Email');
      this.search.searchTopic = query;
      return this.http.post('http://localhost:6757/user/saveSearch',this.search,{responseType:'text'});
   }

   getSearchList()
   {
      return this.http.get<any[]>('http://localhost:6757/user/showSearch/'+window.localStorage.getItem('Email'));
   }

   deleteSearch(searchHistoryId)
   {
      return this.http.delete('http://localhost:6757/user/deleteSearch/'+searchHistoryId,{responseType:'text'});
   }
}
