import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
       providedIn: 'root'
})
export class LoggedInRerouteGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router ) {}

    loggedIn: boolean = this.authService.loggedIn;
   
    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {

        if (this.loggedIn) {
            this.router.navigate(['/horse']);
        }

        return true; 

    }  
}
