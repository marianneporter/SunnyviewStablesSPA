import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/_services/auth.service';
import { faHorse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  implements OnInit {

    faHorse = faHorse;

    userName = '';

    constructor(private location: Location,
                private authService: AuthService ) { }

    ngOnInit() {
        this.userName = this.authService.userName;
    }

    logout() {
        this.authService.logout();
        this.location.go('/entry');
        window.location.reload();    
    }

}
