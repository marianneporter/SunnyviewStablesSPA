import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/app/_models/horse';

@Component({
  selector: 'app-horse-cards',
  templateUrl: './horse-cards.component.html',
  styleUrls: ['./horse-cards.component.scss']
})
export class HorseCardsComponent implements OnInit {

    @Input() horses: Horse[];  

    constructor() { }

    ngOnInit(): void {
    }

}
