import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
       providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router ) {}

    get loggedIn(): boolean {
        return this.authService.loggedIn;
    }

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {

        if (!this.loggedIn) {
            this.router.navigate(['/entry']);
        }

        return this.loggedIn; 

    }  
}
