import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from "../_services/error.service";


@Injectable()
export class HorseInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
   
        return next.handle(req).pipe(
            catchError(error => {   
                // auth components deal with own errors and messaging
                if(req.url.includes('auth')) {
                    return throwError(error);
                }
               
                // produce general error message and reroute to entry
                // with snackbar message for all other errors 
                this.errorService.handleError(error);  
                return;             
             }) 
        )
    }
}

export const HorseInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HorseInterceptor,
    multi: true
}