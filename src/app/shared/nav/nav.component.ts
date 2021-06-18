import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    screenWidth: any;
    screenHeight: any;

    constructor(private location: Location,
                private authService: AuthService) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    }

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight; 
    }

    logout() {
        this.authService.logout();
        this.location.go('/entry');
        window.location.reload();    
    }

}
