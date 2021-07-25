import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/app/_models/horse';

@Component({
  selector: 'app-horse-list-element',
  templateUrl: './horse-list-element.component.html',
  styleUrls: ['./horse-list-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HorseListElementComponent implements OnInit {

    @Input() horses$: Observable<Horse[]>;  

    constructor() { }

    ngOnInit(): void {
    }
}
