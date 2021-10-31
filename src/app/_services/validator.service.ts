import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

    constructor(private datesService: DatesService) { }

    dobSexGroupValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const dob = control.get('dob').value;
        const sex = control.get('sex').value; 
        
        if (!dob || !sex) {
            return null;
        }

        if (sex === 'Colt' || sex === 'Filly') {
            if (this.datesService.getAge(dob) > 3) {
                return {'ageSexErrorMatureHorse' : true}
            }
        } else if (sex === 'Mare' || sex === 'Stallion') {
            if (this.datesService.getAge(dob) < 4) {
                return {'ageSexErrorYoungHorse' : true}
            }
        }   

        return null;
    };   

}
