import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
       providedIn: 'root'
})
export class UpdateGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router ) {}

    updateAllowed: boolean = this.authService.updateAllowed;    

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        
        if (!this.updateAllowed) {
            this.router.navigate(['/entry']);
        }

        return this.updateAllowed;

    }  
}