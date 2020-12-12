import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
     constructor(private authService : AuthService){}
    //  (req as HttpRequest<any>).clone({ setHeaders: { 'auth': token } })
    authToken : string;
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        this.authToken = this.authService.getAuthDataFromLocalStorage();
         console.log(  this.authToken);
        
            const authRec = req.clone({
                // setHeaders: {
                //     Authorization: `Bearer ${this.authService.getToken()}`
                   
                //     }
                   
               headers:req.headers.set('Authorization','Bearer ' + this.authToken)
            //    headers: req.headers.append('token', token)
             });
            
             return next.handle(authRec);
         
        
     
        
        
    }
    
}
