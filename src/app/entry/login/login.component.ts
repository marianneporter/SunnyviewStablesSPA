import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EntryStatusService } from '../entry-status.service';
import { LoginFormComponent } from '../login-form/login-form.component';



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
export class LoginComponent  {

    @Output() loginSuccess = new EventEmitter<boolean>();

    @ViewChild(LoginFormComponent) 
    form: LoginFormComponent;

    loginVisibility = 'invisible';

    constructor(private entryPageState: EntryStatusService) { 

        this.entryPageState.loginRequested.subscribe(
            (value) => this.loginVisibility = value ? 'visible' : 'invisible' )
    }

    cancelLoginAttempt() { 
        this.form.cancelLoginAttempt();
        this.entryPageState.loginRequestEnded();
    }

    completedLogin() {
        this.loginSuccess.emit(true);
    }
}
