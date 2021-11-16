import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { EntryStatusService } from '../entry-status.service';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: [ './entry-page.component.scss' ]
})
export class EntryPageComponent implements OnInit {

    constructor(private entryPageState: EntryStatusService,
                private authService: AuthService,
                private router: Router ){ }

    get loggedIn(): boolean {
        return this.authService.loggedIn;
    }

    ngOnInit(): void {
    }

    startLogin() {
        this.entryPageState.loginRequestStarted();
    }

    enterApp() {   
        this.router.navigate(['/horse']);
    }

}
