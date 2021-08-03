import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-horse-add-update',
  templateUrl: './horse-add-update.component.html',
  styleUrls: ['./horse-add-update.component.scss']
})
export class HorseAddUpdateComponent implements OnInit {

    horseForm: FormGroup;

    addMode = true;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {

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