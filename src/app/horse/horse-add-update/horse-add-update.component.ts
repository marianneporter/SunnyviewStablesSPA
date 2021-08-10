import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOwnerDialogComponent } from 'src/app/owner/add-owner-dialog/add-owner-dialog.component';
import { AddReturn } from 'src/app/_models/addReturn';
import { SelectItem } from 'src/app/_models/forms/selectItem';
import { Owner } from 'src/app/_models/owner';
import { DatesService } from 'src/app/_services/dates.service';
import { FormsService } from 'src/app/_services/forms.service';
import { HorseService } from 'src/app/_services/horse.service';

@Component({
  selector: 'app-horse-add-update',
  templateUrl: './horse-add-update.component.html',
  styleUrls: ['./horse-add-update.component.scss']
})
export class HorseAddUpdateComponent implements OnInit {

    horseForm: FormGroup;

    horseFormData: FormData;

    addMode = true;

    addReturn: AddReturn;

    // getters for select lists
    get heights():SelectItem[] {
        return this.formsService.horseHeights;
    }

    get colours():SelectItem[] {
        return this.formsService.colours;
    }

    get sexes():SelectItem[] {
        return this.formsService.sexes;
    }

    //getters for form elements
    get nameFromForm() {
        return this.horseForm.get('name');
    }

    get dobFromForm() {
        return this.horseForm.get('dob');
    } 

    get sexFromForm() {
        return this.horseForm.get('sex');
    }

    get colourFromForm() {
        return this.horseForm.get('colour');
    }

    get heightFromForm() {
        return this.horseForm.get('height');
    }
    
    get ownersFromForm() {
        return this.horseForm.get('owners');
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
                 private formsService: FormsService,
                 private horseService: HorseService,
                 private datesService: DatesService,
                 private router: Router) { }

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

    submitForm() {
        debugger;
        console.log(this.nameFromForm);
        console.log(this.dobFromForm);
        this.horseFormData = new FormData();
        this.horseFormData.append('name', this.nameFromForm.value);
        this.horseFormData.append('sex', this.sexFromForm.value);
        this.horseFormData.append('colour', this.colourFromForm.value);
        this.horseFormData.append('heightHands', this.heightFromForm.value);
        this.horseFormData.append('dob', this.datesService.convertJSDateToYYYYMMDD(this.dobFromForm.value))

        this.ownersFromForm.value.forEach(ownerId => {
            this.horseFormData.append('ownerIds', ownerId )
        });

        this.horseFormData.append('imageFile', this.uploadedPhoto);
        
        debugger;
        this.horseService.addHorse(this.horseFormData)
        .subscribe({
          next: (data: AddReturn) => {
              debugger;
              this.addReturn= { ...data };          
              alert(`Horse Added Successfully ${this.addReturn.name}`);
              this.router.navigate(['/horses']);
          },
          error: err => {
              console.log("error occurred while adding cottage");
          }
        });


    }
}