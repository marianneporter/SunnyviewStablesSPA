import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-entry',
  templateUrl: './mobile-entry.component.html',
  styleUrls: ['./mobile-entry.component.scss']
})
export class MobileEntryComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        debugger;
    }

    loginSuccess() {
        this.router.navigate(['/horse']);
    }

}
