import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/_services/auth.service';
import { faHorse } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  implements OnInit {

    faHorse = faHorse;

    userName = '';

    constructor(private location: Location,
                private authService: AuthService,
                private router: Router,
                private deviceService: DeviceDetectorService ) { }

    ngOnInit() {
        this.userName = this.authService.userName;
    }

    logout() {
        this.authService.logout();
      
        if (this.deviceService.isMobile()) {
            this.location.go('/mobile-entry');
        } else {
            this.location.go('/entry');
        }
       
        window.location.reload();  
 
    }

}
