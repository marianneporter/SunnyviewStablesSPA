import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-entry',
  templateUrl: './mobile-entry.component.html',
  styleUrls: ['./mobile-entry.component.scss']
})
export class MobileEntryComponent  {

    constructor(private router: Router) { }


    loginSuccess() {
        this.router.navigate(['/horse']);
    }

}
