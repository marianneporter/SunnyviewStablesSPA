import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HorseAddUpdateComponent } from '../horse/horse-add-update/horse-add-update.component';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<HorseAddUpdateComponent> {
    canDeactivate(component: HorseAddUpdateComponent) {
        if (!component.formSubmitted && component.horseForm.dirty ) {
            return confirm('Are you sure you want to continue?  Any unsaved changes will be lost');
        }    
        return true;  
    }   
}