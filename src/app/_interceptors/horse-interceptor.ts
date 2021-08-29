import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from "../_services/error.service";


@Injectable()
export class HorseInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
   
        return next.handle(req).pipe(
            tap(
                evt => {
                    if (evt instanceof HttpResponse)  {
                   
                        if(req.url.includes('horses')) {  
                                
                                if (req.url.includes('count')  ) {
                                    let count = evt.body;  

                                    if (count == 0) {
                                        this.errorService.noHorsesError(); 
                                    }
                                }
                               
                                return;                                                        
                        } 
                    }                    
                    
                }
            )
        )
    }
}

export const HorseInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HorseInterceptor,
    multi: true
}