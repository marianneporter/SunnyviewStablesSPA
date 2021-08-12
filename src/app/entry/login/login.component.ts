import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EntryStatusService } from '../entry-status.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export function serverLoginValidator(serverLoginError: boolean) : ValidatorFn {

    return (control: FormGroup): {[key: string]:boolean} | null => { 
     
       return serverLoginError ?  { 'serverLoginError': true } : null;
 
    };
}


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

    @Output() loginSuccess = new EventEmitter<boolean>();
    loginForm: FormGroup;

    serverLoginError: boolean = false;

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    get loginVisibility(): string {
        return this.entryPageState.loginRequested ? 'visible' : 'invisible';       
    }

    constructor(private entryPageState: EntryStatusService,
                private fb: FormBuilder,
                private authService: AuthService,
                private matSnackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group ({
            email : [ '', [ Validators.required, Validators.email, serverLoginValidator(false) ]],
            password : [  '', [ Validators.required, serverLoginValidator(false) ] ],  
        })
    }

    cancelLoginAttempt() {
        this.closeSlider();
        debugger;
        this.loginForm.reset();

        Object.keys(this.loginForm.controls).forEach(key => {
            this.loginForm.get(key).setErrors(null);
            this.loginForm.get(key).setValue(null);
            this.loginForm.get(key).markAsPristine();
            this.loginForm.get(key).markAsUntouched();
            this.loginForm.get(key).updateValueAndValidity();           
        });  
       this.loginForm.markAsPristine();
       this.loginForm.markAsUntouched();
       this.loginForm.updateValueAndValidity();
    }
    
    closeSlider() {   
        this.entryPageState.loginRequestEnded();
    }

    login() {
      
        this.authService.login({email: this.email.value, password: this.password.value}).subscribe(
            () => {
 
                this.loginSuccess.emit();        
            },
            (error: HttpErrorResponse) => {  
  
                if (error.status == 401) { 
                     this.serverLoginError=true;
                     this.updateValidators(true);
                } else {
                    this.openErrorSnackbar();
                    this.cancelLoginAttempt();
                }
            }               
        )          
    }

    openErrorSnackbar() {
        this.matSnackBar.open('Login cannot be completed - please try later', 'Close');
    }

    userInput() {
        if ( this.serverLoginError) {
            this.serverLoginError=false;
            this.updateValidators(false);
        }
    }

    updateValidators(status: boolean) {
        this.email.clearValidators();
        this.password.clearValidators();
        this.email.setValidators( [ Validators.required, Validators.email, serverLoginValidator(status)])
        this.password.setValidators([ Validators.required, serverLoginValidator(status) ])
        this.email.updateValueAndValidity();
        this.password.updateValueAndValidity();      
    }

}
