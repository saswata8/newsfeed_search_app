import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let url : string;
        let authReq : any;

        authReq = req;
        url = req.url;

        if(url.includes('http://localhost'))
        {
            console.log(url);
            let token :string;
            token = window.localStorage.getItem('Token');

            if(token != null)
            {
                authReq = req.clone({
                    headers : req.headers.append('Authorization','Bearer ' + token)
                });
            }
        }
        return next.handle(authReq);
    }
}