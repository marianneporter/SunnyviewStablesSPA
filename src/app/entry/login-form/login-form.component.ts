import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/_services/auth.service';

export function serverLoginValidator(serverLoginError: boolean) : ValidatorFn {

    return (control: FormGroup): {[key: string]:boolean} | null => { 
     
       return serverLoginError ?  { 'serverLoginError': true } : null;
 
    };
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
 
    @Output() loginSuccess = new EventEmitter<boolean>(); 

    loginForm: FormGroup;

    serverLoginError: boolean = false;
    
    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private deviceService: DeviceDetectorService,
                private matSnackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group ({
            email : [ '', [ Validators.required, Validators.email, serverLoginValidator(false) ]],
            password : [  '', [ Validators.required, serverLoginValidator(false) ] ],  
        })    
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
                    if (!this.deviceService.isMobile())
                    {
                        this.cancelLoginAttempt();
                    }  
                }
            }               
        )          
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
    
    openErrorSnackbar() {       
        this.matSnackBar.open('Login cannot be completed - please try later', 'Close', {
            duration: 5000
        });
    }

    cancelLoginAttempt() {
 
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
}
