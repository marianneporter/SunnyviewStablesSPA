import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {


    constructor(private location: Location,
                private authService: AuthService) { }

    logout() {
        this.authService.logout();
        this.location.go('/entry');
        window.location.reload();    
    }

}
