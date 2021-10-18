
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AddOwnerDialogComponent } from 'src/app/owner/add-owner-dialog/add-owner-dialog.component';
import { AddReturn } from 'src/app/_models/addReturn';
import { SelectItem } from 'src/app/_models/forms/selectItem';
import { Horse } from 'src/app/_models/horse';
import { Owner } from 'src/app/_models/owner';
import { UpdateReturn } from 'src/app/_models/updateReturn';
import { DatesService } from 'src/app/_services/dates.service';
import { FormsService } from 'src/app/_services/forms.service';
import { HorseService } from 'src/app/_services/horse.service';

@Component({
  selector: 'app-horse-add-update',
  templateUrl: './horse-add-update.component.html',
  styleUrls: ['./horse-add-update.component.scss']
})
export class HorseAddUpdateComponent implements OnInit {

    @ViewChild("fileInput")  fileInput: ElementRef;

    horseForm: FormGroup;

    horseFormData: FormData;

    horse: Horse;

    addMode = true;
    listMode = false;

    addReturn: AddReturn;
    updateReturn: UpdateReturn;

    // getters for select lists
    get heights():SelectItem[] { return this.formsService.horseHeights; }
    get colours():SelectItem[] { return this.formsService.colours; }
    get sexes():SelectItem[]   { return this.formsService.sexes; }

    //getters for form elements
    get nameFromForm()   { return this.horseForm.get('name'); }
    get dobFromForm()    { return this.horseForm.get('dob'); } 
    get sexFromForm()    { return this.horseForm.get('sex'); }
    get colourFromForm() { return this.horseForm.get('colour'); }
    get heightFromForm() { return this.horseForm.get('height'); }    
    get ownersFromForm() { return this.horseForm.get('owners'); }

    uploadedPhoto : File = null;
    fileName ='';
    invalidPhoto = false;

    photoErrorInvalidFile = 'The file you attempted to upload was not a valid photo file';
    photoErrorNotLandscape = 'Photo must be in landscape format';
    formNotChangedError = 'Please edit horse, add/change photo file or cancel';
    formInvalidError = 'Form is not valid please correct errors and try again';
    successStatus = (horseName, op) => { return `${horseName} has been ${op} successfully`};
    successStatusWithPhotoError = (horseName, op) => {return `${horseName} has been ${op} successfully.  Photo uploaded was invalid`};
    photoErrorOnServer = (horseName) => { return `Photo for ${horseName} could not be added due to invalid format`};    

    previewPhoto: any;

    owners: Owner[];
    ownersSelect: SelectItem[];
    addedOwner: Owner;

    minDob: Date = this.datesService.subtractYearsFromToday(40);
    maxDob: Date = this.datesService.todaysDate;

    addOwnerDialogRef: MatDialogRef<AddOwnerDialogComponent>;    

    constructor( private route: ActivatedRoute,
                 private addOwnerDialog: MatDialog,
                 private snackbar: MatSnackBar,
                 private fb: FormBuilder,
                 private formsService: FormsService,
                 private horseService: HorseService,
                 private datesService: DatesService,
                 private router: Router,
                 private deviceService: DeviceDetectorService) { }

    ngOnInit(): void {

        this.route.data.subscribe(data => {

            if (+this.route.snapshot.params['id'] !== 0) {
                this.owners = data['addUpdateData'][0];
                this.horse = data['addUpdateData'][1];
                this.addMode = false;
            } else {
                this.owners = data['addUpdateData'];
            }

            this.listMode = this.route.queryParams['listMode'] == 'list';

            this.populateOwnerSelect();
            this.initialiseForm();          
        });
    }

    initialiseForm() {
 
        this.horseForm = this.fb.group({
            name :  [ this.addMode ? '' : this.horse.name, [Validators.required]],
            dob  :  [ this.addMode ? '' : this.horse.dob, [Validators.required]],
            sex  :  [ this.addMode ? '' : this.horse.sex, [Validators.required]],
            colour: [ this.addMode ? '' : this.horse.colour, [Validators.required]],
            height: [ this.addMode ? ''  : this.horse.heightHands, [Validators.required]],
            owners: [ this.addMode ? [] : this.horse.owners.map(o => o.id.toString()), [Validators.required]]                       
        })
    }

    populateOwnerSelect() {
    
        this.ownersSelect =this.owners.map(function(owner) {
            return { id: owner.id.toString(),
                     name: `${owner.firstName} ${owner.lastName}` }
        } );                 
    }

    onPhotoAdded(event) {
        this.fileName = event.target.files[0].name;
        if (event.target.files.length > 0) {
            var mimeType = event.target.files[0].type;
            if (mimeType.match(/image\/*/) == null) {
                this.invalidPhoto=true;
                this.displayErrorSnackbar(this.photoErrorInvalidFile);
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
                        this.displayErrorSnackbar(this.photoErrorNotLandscape);
                        return;
                    }
                    this.previewPhoto = reader.result; 
                };               
            }

        }
    }

    clearUploadPhoto() {
        this.fileInput.nativeElement.value="";
        this.previewPhoto = null;
        this.uploadedPhoto = null;
        this.invalidPhoto = false;
    }

    openAddOwnerDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;   
    
        if (this.deviceService.isMobile()) {
            dialogConfig.maxWidth = '100vw';
            dialogConfig.maxHeight = '100vh';
            dialogConfig.height = '100%';
            dialogConfig.minWidth = '100%';
        } else {
            dialogConfig.width = '25rem';
            dialogConfig.height = '30rem';
        }

        this.addOwnerDialogRef = this.addOwnerDialog.open(AddOwnerDialogComponent, dialogConfig);     
         
        this.addOwnerDialogRef.afterClosed().subscribe(
            (result) => {
                if (result) {               
                    this.addedOwner = {...result};
                    this.addNewOwnerToForm();
                  
                    this.ownersSelect.push({id: this.addedOwner.id.toString(),
                                               name: `${this.addedOwner.firstName} ${this.addedOwner.lastName}`});
                }
            }
        )
    }
    
    addNewOwnerToForm() {
        
        let currOwners = this.horseForm.controls['owners'].value;
   
        currOwners.push(this.addedOwner.id.toString());
  
        this.horseForm.patchValue( {owners: currOwners} );
  
    }

    submitForm() {      
        
        if ( this.horseForm.invalid ) {
            this.displayErrorSnackbar(this.formInvalidError)
            return;
        }

        if (this.horseForm.untouched && !this.uploadedPhoto) {
            this.displayErrorSnackbar(this.formNotChangedError)
            return;
        }             

        this.horseFormData = new FormData();
        this.horseFormData.append('name', this.nameFromForm.value);
        this.horseFormData.append('sex', this.sexFromForm.value);
        this.horseFormData.append('colour', this.colourFromForm.value);
        this.horseFormData.append('heightHands', this.heightFromForm.value);
        this.horseFormData.append('dob', this.datesService.convertJSDateToYYYYMMDD(this.dobFromForm.value))

        this.ownersFromForm.value.forEach(ownerId => {
            this.horseFormData.append('ownerIds', ownerId )
        });

        if (this.uploadedPhoto) {
            this.horseFormData.append('imageFile', this.uploadedPhoto);
        }
        
        if (this.addMode) {
            this.horseService.addHorse(this.horseFormData)
            .subscribe({
              next: (data: AddReturn) => {
                  this.addReturn= { ...data };  
                  this.addUpdateMessageAndRouting(this.addReturn.id,
                                                  this.addReturn.photoUploaded);                 

              },
              error: err => {              
                  console.log("error occurred while adding horse"); 
              }
            });
        } else {

            this.horseFormData.append('id', this.horse.id.toString());

            this.horseService.updateHorse(this.horseFormData)
            .subscribe({
                next: (data) => {   
                    this.updateReturn = { ...data };  
                    
                    this.addUpdateMessageAndRouting( this.nameFromForm.value,
                                                     this.updateReturn.photoUploaded);
              },
                error: err => {
                    console.log("error occurred while updating horse");
              }
            });            
        }
    }

    addUpdateMessageAndRouting( id: number,
                                photoUploaded: boolean) {

        let message = this.createStatusMessage(this.nameFromForm.value,
                      this.horseForm.touched,
                      photoUploaded);  
                      
        sessionStorage.setItem('message', message);   

        if (this.listMode) {
            this.router.navigate(['/horse'], { queryParamsHandling: 'merge' } );
        } else {
            this.router.navigate(['/horse', this.horse.id], { queryParamsHandling: 'merge' } );
        }          
    }

    createStatusMessage(horseName:string, dataUpdated: boolean, photoUploadSuccess: boolean):string {
    
        const photoUploadError = this.uploadedPhoto && !photoUploadSuccess;
        const operation = this.addMode ? 'added' : 'updated';
      
        if (dataUpdated && photoUploadError) {
            return this.successStatusWithPhotoError(horseName, operation);
        }
        
        if (!dataUpdated && photoUploadError) {
            return this.photoErrorOnServer(horseName);
        }

        return this.successStatus(horseName, operation);
    }

    displayErrorSnackbar(message: string) {
        this.snackbar.open(message, 'dismiss', {
            duration: 5000,
            panelClass: ['error-snackbar']
        });        
    }   
}