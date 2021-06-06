import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [  
    trigger('loginVisibility', [
        state('visible', style ({
            right: '0'  
        })),
        state('invisible', style ({          
            right: '-20rem',    
        })), 
        transition('visible <=> invisible', [
            animate('1s ease')
        ])  
    ]),         
]
})
export class LoginComponent implements OnInit, OnChanges {

    loginVisibility="invisible";

    @Input() loginRequested: boolean;
   
    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.loginRequested.currentValue) {
            this.loginVisibility="visible";
        }
    }

}
