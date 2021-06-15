import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntryStatusService } from '../entry-status.service';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: [ './entry-page.component.scss' ]
})
export class EntryPageComponent implements OnInit {

    constructor(private entryPageState: EntryStatusService,
                private router: Router ){ }

    ngOnInit(): void {
    }

    startLogin() {
        this.entryPageState.loginRequestStarted();
    }

    enterApp() {
        debugger;
        this.router.navigate(['/horse']);
    }

}
