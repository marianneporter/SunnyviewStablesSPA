import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    constructor(private snackBar: MatSnackBar) { }

    displayStatusMessage() {

        if (sessionStorage.getItem('message')) {
            const statusMessage = sessionStorage.getItem('message');
            this.snackBar.open(statusMessage, 'dismiss', {
                duration: 6000
            });
            sessionStorage.removeItem('message');     
        } 
    }

    storeStatusMessage(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }
    
    displayErrorSnackbar(message: string) {
        this.snackBar.open(message, 'dismiss', {
            duration: 5000,
            panelClass: ['error-snackbar']
        });        
    }   



}
