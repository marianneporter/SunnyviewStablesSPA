import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Horse } from 'src/app/_models/horse';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit {

    horses: Horse[] = [];

    displayedColumns: string[] = ['name', 'height', 'colour'];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.horses=data['horses'];
        })
    }

    // onRowClicked(row) {
    //     console.log('Row clicked ', row.name);
    // }

   

}
