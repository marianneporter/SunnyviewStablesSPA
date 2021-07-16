import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Horse } from 'src/app/_models/horse';
import { HorseService } from 'src/app/_services/horse.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit, AfterViewInit {

    horses$: Observable<Horse[]>;

    horseCount: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;


    displayedColumns: string[] = ['name', 'height', 'colour'];

    constructor(private route: ActivatedRoute,
                private horseService: HorseService) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.horseCount=data['horseCount'];
        })
    }

    ngAfterViewInit() {
        this.horses$ = this.horseService.getHorses();
    }

    pageChangeEvent(pageEvent: PageEvent) {
        console.log(pageEvent);
        console.log('horseCount = ' + this.horseCount);
    }

    // onRowClicked(row) {
    //     console.log('Row clicked ', row.name);
    // }

   

}
