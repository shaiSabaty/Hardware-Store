import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
   
   export class HttpErrorInterceptor implements HttpInterceptor {
    dialog:MatDialog;
      //  constructor( dialog:MatDialog){
      //    this.dialog = dialog;
      //  }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            window.alert(errorMessage);

           // this.checkError(errorMessage);
            
           
            return throwError(errorMessage);
          })
        )
    }

  //   checkError(error:string){
  //     if(error!==""){
  //         alert(error);
  //     //  console.log();
  //     this.dialog.open(DialogMessageComponent,{
  //         data:error
  //     });
  //      // this.router.navigate["/login"];
  //      // location.reload() ;
  //         //return;
  //     }
  // }
   }