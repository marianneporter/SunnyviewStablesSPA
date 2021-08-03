import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'src/app/_models/forms/selectItem';
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


    constructor(private fb: FormBuilder,
                private formsService: FormsService) { }

    ngOnInit(): void {
        this.initialiseForm();
    }

    initialiseForm() {
 
        this.horseForm = this.fb.group({
            name :  '',
            dob  : '',
            sex  : '',
            colour: '',
            height: ''
                       
        })

    }
}