import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EntryStatusService } from '../entry-status.service';

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
            animate('1s linear')
        ])  
    ]),         
]
})
export class LoginComponent implements OnInit {


   get loginVisibility(): string {
     //  return 'invisible';
       return this.entryPageState.loginRequested ? 'visible' : 'invisible';       
   }


    constructor(private entryPageState: EntryStatusService) { }

    ngOnInit(): void {
    }    

    closeSlider() {
   
        this.entryPageState.loginRequestEnded();
    }


}
