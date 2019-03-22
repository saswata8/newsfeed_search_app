import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './user-dashboard.component';
import { NewsapiService } from '../Services/newsapi.service';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let service : NewsapiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(NewsapiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check saveSearchService',()=>{
    let spy = spyOn(service,'saveSearch')

    let query = component.formdata.controls['search'];
    query.setValue('pulwama');

    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit',null);

    expect(spy).toHaveBeenCalledTimes(1);
  })

  it('check getArticlesService',()=>{
    let query = 'balakot';
    spyOn(component,'searchArticles').and.callFake(()=>{
      service.getArticlesByID(query);
    })

    let spy = spyOn(service,'getArticlesByID');
    component.searchArticles(query);
    expect(spy).toHaveBeenCalledTimes(1);
  })
});
