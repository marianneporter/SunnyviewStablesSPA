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

    login(userLogin: UserLogin) : Observable<any> {

        const url = environment.baseUrl + "auth/login";

        return this.http.post<LoginResponse>(url, userLogin)
        .pipe(
            
            map((response: LoginResponse) => {    
            debugger;            
            if (response) {
                localStorage.setItem('token', response.token);
                debugger;
                localStorage.setItem('user', JSON.stringify(response.user));               
                this.decodedToken = this.jwtHelper.decodeToken(response.token);     
   
                }         
            })
        )
    }   


}
