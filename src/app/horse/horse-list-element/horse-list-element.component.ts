import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/app/_models/horse';

@Component({
  selector: 'app-horse-list-element',
  templateUrl: './horse-list-element.component.html',
  styleUrls: ['./horse-list-element.component.scss']
})
export class HorseListElementComponent implements OnInit {

    @Input() horses$: Observable<Horse[]>;

    displayedColumns: string[] = ['imageUrl', 'name', 'height', 'colour', 'sex', 'dob', 'owners'];

    constructor() { }

    ngOnInit(): void {
    }
}
