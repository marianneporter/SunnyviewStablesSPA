import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

    constructor(public dialogRef: MatDialogRef<AddOwnerDialogComponent>,
                private fb : FormBuilder,
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
            }
        )        
    }

    close() {
        console.log('closing');
        this.dialogRef.close();
    }

}
