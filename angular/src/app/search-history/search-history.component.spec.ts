import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoryComponent } from './search-history.component';
import { NewsapiService } from '../Services/newsapi.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;
  let service : NewsapiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHistoryComponent],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(NewsapiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check getSearchListService',()=>{
    spyOn(component,'getsearchlist').and.callFake(()=>{
      service.getSearchList();
    });

    let spy = spyOn(service,'getSearchList').and.callFake(()=>{
      
    });
    component.getsearchlist();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check deleteSearchService',()=>{
    let search = {searchHistoryId:1, searchTopic:'protractor', userId:'hada@gmail.com'}
    spyOn(component,'deleteSearch').and.callFake(()=>{
      service.deleteSearch(search.searchHistoryId);
    })

    let spy = spyOn(service,'deleteSearch').and.callFake(()=>{

    })
    component.deleteSearch(search);
    expect(spy).toHaveBeenCalledTimes(1);
  })
})
