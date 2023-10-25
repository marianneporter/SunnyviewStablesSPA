import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

    constructor(private router: Router,
                private messageService: MessageService) { }

    handleError(errorResponse: HttpErrorResponse) {       
        this.messageService.displayErrorSnackbar("Sorry! Sunnyview Stables Application is not Available - please try later");
        this.router.navigate(['/entry']);
    }

}
