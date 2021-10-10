import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

    constructor(private router: Router) { }

    noHorsesError() {
        let errorMessage =  "noHorses";
        this.routeToErrorPage(errorMessage);
    }

    routeToErrorPage(errorMessage: string) {
        this.router.navigate(['/error'], { queryParams: { error: errorMessage } });
    }
}
