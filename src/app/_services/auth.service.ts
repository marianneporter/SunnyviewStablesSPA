import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from '../_models/auth/loginResponse';
import { UserLogin } from '../_models/auth/userLogin';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                public jwtHelper: JwtHelperService) { }

    decodedToken: any;

    private _loggedIn: boolean = false;
    get loggedIn(): boolean {
        return this._loggedIn;
    }

    private _updateAllowed: boolean = false;
    get updateAllowed():boolean {
        return this._updateAllowed;
    }

    private _userName: string = '';

    private _role: string[] = [];

    public get userName() {
        return this._userName;
    }

  
    login(userLogin: UserLogin) : Observable<any> {

        const url = environment.baseUrl + "auth/login";

        return this.http.post<LoginResponse>(url, userLogin)
        .pipe(            
            map((response: LoginResponse) => {        
                if (response) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user)); 
                    this._userName= `${response.user.firstName}`;            
                    this.setTokenDetails(response.token);
                }         
            }) 
        )
    }  

    logout() {
        this._loggedIn=false;
        this._userName='';
        this._role= [];
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    
    setLoginStatus() {
        
        const token = localStorage.getItem('token');
        
        if (token) {
            if (this.jwtHelper.isTokenExpired(token)) {
                this._loggedIn=false;
                localStorage.removeItem('token');
                localStorage.removeItem('user');   
            } else {     
                let userFromStorage = JSON.parse(localStorage.getItem('user'));
                this._userName = `${userFromStorage.firstName}`;             
                this.setTokenDetails(token);
            }
        }
    }

    setTokenDetails(token: any) {
        this._loggedIn=true;
        this.decodedToken = this.jwtHelper.decodeToken(token);
        this._role = typeof this.decodedToken.role == 'string'
                          ? this._role = [this.decodedToken.role]
                          : this._role = this.decodedToken.role;

        this._updateAllowed =    this._role.includes('Manager')
                              || this._role.includes('Admin');
     
    }
 
}
