import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OwnerDto } from 'src/app/_models/ownerDTO';
import { OwnersService } from 'src/app/_services/owners.service';

@Component({
  selector: 'app-add-owner-dialog',
  templateUrl: './add-owner-dialog.component.html',
  styleUrls: ['./add-owner-dialog.component.scss']
})
export class AddOwnerDialogComponent implements OnInit {

    ownerForm: FormGroup;

    ownerToAdd: OwnerDto;

        //getters for form elements
    get emailFromForm() {
        return this.ownerForm.get('email');
    }

    get firstNameFromForm() {
        return this.ownerForm.get('firstName');
    } 

    get lastNameFromForm() {
        return this.ownerForm.get('lastName');
    }

    addOwnerError = 'Owner cannot be added at this time';
    emailAlreadyExistsError = 'There is already an owner with this email';

    constructor(public dialogRef: MatDialogRef<AddOwnerDialogComponent>,
                private fb : FormBuilder,
                private snackbar: MatSnackBar,
                private ownersService: OwnersService) { }

    ngOnInit(): void {
        this.ownerForm = this.fb.group({
            email :  ['', [Validators.required, Validators.email]],
            firstName  : ['', [Validators.required]],
            lastName  : ['', [Validators.required]]                   
        })
    }

    addOwner() {
 
        this.ownerToAdd = {
            id: 0,
            email: this.emailFromForm.value,
            firstName: this.firstNameFromForm.value,
            lastName: this.lastNameFromForm.value
        }
   
        this.ownersService.addOwner(this.ownerToAdd).subscribe(
            (newOwner) => {
                this.ownerToAdd = {...newOwner}
                this.dialogRef.close(this.ownerToAdd);
            },
            (error) => {
                if (error.status==409) {
                    this.displayErrorSnackbar(this.emailAlreadyExistsError);
                } else {
                    this.displayErrorSnackbar(this.addOwnerError);
                }
            }
        )        
    }

    displayErrorSnackbar(message: string) {
        this.snackbar.open(message, 'dismiss', {
            duration: 5000,
            panelClass: ['error-snackbar']          
        });        
    }   

    close() {
        this.dialogRef.close();
    }

}
