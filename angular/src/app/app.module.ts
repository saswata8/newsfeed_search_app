import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { SignupService } from './Services/signup.service';
import { LoginService } from './Services/login.service';
import { NewsapiService } from './Services/newsapi.service';
import { AuthInterceptor } from './auth-interceptor';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const appRoutes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'',component:SignupComponent},
  {path:'user-dashboard', component:UserDashboardComponent, canActivate:[AuthGuardGuard]},
  {path:'search-history', component:SearchHistoryComponent, canActivate:[AuthGuardGuard]},
  {path:'admin-dashboard',component:AdminDashboardComponent, canActivate:[AuthGuardGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserDashboardComponent,
    SearchHistoryComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SignupService, LoginService,NewsapiService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
