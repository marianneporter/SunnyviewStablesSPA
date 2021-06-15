import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EntryStatusService } from '../entry-status.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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
                private authService: AuthService) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group ({
            email : [ '', [Validators.required, Validators.email ]],
            password : [  '', Validators.required ],  
        })
    }
    
    closeSlider() {   
        this.entryPageState.loginRequestEnded();
    }

    login() {
        debugger;
        this.authService.login({email: this.email.value, password: this.password.value}).subscribe(
            () => {
                alert('login success!'); 
                this.loginSuccess.emit();        
            },
            (error: HttpErrorResponse) => {  
                console.log(error);             
                alert('login probs!') 
            }               
        )          
    }

    getErrorMessage() {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }
      
        return this.email.hasError('email') ? 'Not a valid email' : '';       
    }


}
