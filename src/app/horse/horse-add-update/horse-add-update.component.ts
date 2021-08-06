import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddOwnerDialogComponent } from 'src/app/owner/add-owner-dialog/add-owner-dialog.component';
import { SelectItem } from 'src/app/_models/forms/selectItem';
import { Owner } from 'src/app/_models/owner';
import { FormsService } from 'src/app/_services/forms.service';

@Component({
  selector: 'app-horse-add-update',
  templateUrl: './horse-add-update.component.html',
  styleUrls: ['./horse-add-update.component.scss']
})
export class HorseAddUpdateComponent implements OnInit {

    horseForm: FormGroup;

    addMode = true;

    get heights():SelectItem[] {
        return this.formsService.horseHeights;
    }

    get colours():SelectItem[] {
        return this.formsService.colours;
    }

    get sexes():SelectItem[] {
        return this.formsService.sexes;
    }

    uploadedPhoto : File = null;
    fileName ='';
    invalidPhoto = false;
    previewPhoto: any;

    owners: Owner[];
    ownersSelect: SelectItem[];



    constructor( private route: ActivatedRoute,
                 private addOwnerDialog: MatDialog,
                 private fb: FormBuilder,
                 private formsService: FormsService) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.owners=data['owners'];
        });

        this.populateOwnerSelect();
        this.initialiseForm();
    }

    initialiseForm() {
 
        this.horseForm = this.fb.group({
            name :  '',
            dob  : '',
            sex  : '',
            colour: '',
            height: '',
            owners: ''
                       
        })
    }

    populateOwnerSelect() {
        this.ownersSelect =this.owners.map(function(owner) {
            return { id: owner.id.toString(),
                     name: `${owner.firstName} ${owner.lastName}` }
        } );                 
    }

    onPhotoAdded(event) {
        console.log(event.target.files[0]);
        console.log(event.target.files[0]);
        this.fileName = event.target.files[0].name;
        if (event.target.files.length > 0) {
            var mimeType = event.target.files[0].type;
            if (mimeType.match(/image\/*/) == null) {
                this.invalidPhoto=true;
                return;
            }

            this.uploadedPhoto=event.target.files[0]; 
            this.invalidPhoto=false;

            let reader = new FileReader();
            //start uploading file user selected
            reader.readAsDataURL(this.uploadedPhoto);
            //display photo once file uploaded
            reader.onload = (_event) => { 
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const height = img.naturalHeight;
                    const width = img.naturalWidth;
                    if (height > width) {
                        this.invalidPhoto=true;
                        return;
                    }
                    this.previewPhoto = reader.result; 
                };               
            }
        }
    }

    openAddOwnerDialog() {
        const dialogConfig = new MatDialogConfig();

   //     dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;  
        
        this.addOwnerDialog.open(AddOwnerDialogComponent, dialogConfig);
        
    }
}