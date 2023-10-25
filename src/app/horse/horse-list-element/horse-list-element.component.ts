import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Horse } from 'src/app/_models/horse';

@Component({
  selector: 'app-horse-list-element',
  templateUrl: './horse-list-element.component.html',
  styleUrls: ['./horse-list-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HorseListElementComponent {

    @Input() horses: Horse[];
    @Input() updateAccessAllowed: boolean;

    @Output() selectedId = new EventEmitter<number>();

    constructor() { }

    horseSelected(id: number) {
        this.selectedId.emit(id);
    }
}
