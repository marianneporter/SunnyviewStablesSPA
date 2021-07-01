import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from '../_models/auth/loginResponse';
import { UserLogin } from '../_models/auth/userLogin';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                public jwtHelper: JwtHelperService) { }

    decodedToken: any;

    loggedIn: boolean = false;

    userName: string = '';

    login(userLogin: UserLogin) : Observable<any> {

        const url = environment.baseUrl + "auth/login";

        return this.http.post<LoginResponse>(url, userLogin)
        .pipe(            
            map((response: LoginResponse) => {        
                if (response) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user)); 
                    this.userName= `${response.user.firstName} ${response.user.lastName}`;            
                    this.decodedToken = this.jwtHelper.decodeToken(response.token); 
                    this.loggedIn=true;    
                }         
            })
        )
    }  

    logout() {
        this.loggedIn=false;
        localStorage.removeItem('token');
    }
    
    setLoginStatus() {
        const token = localStorage.getItem('token');

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.loggedIn=true;
        }              
    }


}
