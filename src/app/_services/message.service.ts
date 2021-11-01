import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    constructor(private snackBar: MatSnackBar) { }

    photoErrorInvalidFile = 'The file you attempted to upload was not a valid photo file';
    photoErrorNotLandscape = 'Photo must be in landscape format';
    formNotChangedError = 'Please edit horse, add/change photo file or cancel';
    formInvalidError = 'Form is not valid please correct errors and try again';
    successStatus = (horseName, op) => { return `${horseName} has been ${op} successfully`};
    successStatusWithPhotoError = (horseName, op) => {return `${horseName} has been ${op} successfully.  Photo uploaded was invalid`};
    photoErrorOnServer = (horseName) => { return `Photo for ${horseName} could not be added due to invalid format`};   

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
    
    createStatusMessage(horseName:string,
                        dataUpdated: boolean,
                        photoUploadSuccess: boolean,
                        uploadedPhoto: boolean,
                        addMode: boolean):string {
    
        const photoUploadError = uploadedPhoto && !photoUploadSuccess;
        const operation = addMode ? 'added' : 'updated';
      
        if (dataUpdated && photoUploadError) {
            return this.successStatusWithPhotoError(horseName, operation);
        }
        
        if (!dataUpdated && photoUploadError) {
            return this.photoErrorOnServer(horseName);
        }

        return this.successStatus(horseName, operation);
    }
}
