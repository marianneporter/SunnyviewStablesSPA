import { Component, OnInit } from '@angular/core';
import { EntryStatusService } from '../entry-status.service';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: [ './entry-page.component.scss' ]
})
export class EntryPageComponent implements OnInit {

    constructor(private entryPageState: EntryStatusService) { }

    ngOnInit(): void {
    }

    startLogin() {
        this.entryPageState.loginRequestStarted();
    }

}
