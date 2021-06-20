import { Component, OnInit } from '@angular/core';
import { Horse } from 'src/app/_models/horse';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit {

    horses: Horse[] = [];

    constructor() { }

    ngOnInit(): void {
    }

}
