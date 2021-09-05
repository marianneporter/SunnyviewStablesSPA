import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EntryStatusService } from '../entry-status.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';



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

    get loginVisibility(): string {
        return this.entryPageState.loginRequested ? 'visible' : 'invisible';       
    }

    constructor(private entryPageState: EntryStatusService,
                private fb: FormBuilder,
                private authService: AuthService,
                private matSnackBar: MatSnackBar) { }

    ngOnInit(): void {
   
    }

    cancelLoginAttempt() {
        this.closeSlider();

    //     this.loginForm.reset();

    //     Object.keys(this.loginForm.controls).forEach(key => {
    //         this.loginForm.get(key).setErrors(null);
    //         this.loginForm.get(key).setValue(null);
    //         this.loginForm.get(key).markAsPristine();
    //         this.loginForm.get(key).markAsUntouched();
    //         this.loginForm.get(key).updateValueAndValidity();           
    //     });  
    //    this.loginForm.markAsPristine();
    //    this.loginForm.markAsUntouched();
    //    this.loginForm.updateValueAndValidity();
    }
    
    closeSlider() {   
        this.entryPageState.loginRequestEnded();
    }

    completedLogin() {
        this.loginSuccess.emit(true);
    }







}
