import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
       providedIn: 'root'
})
export class TestForMobileGuard implements CanActivate {

    constructor(private deviceService: DeviceDetectorService,
                private authService: AuthService,
                private router: Router ) {}

    get loggedIn(): boolean {
        return this.authService.loggedIn;
    }

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        if (this.deviceService.isMobile()) {
            if (this.loggedIn) {
                this.router.navigate(['/horse']);
                return false;
            } else {
                this.router.navigate(['/mobile']);
            }
        }
        return true; 
    }  
}
