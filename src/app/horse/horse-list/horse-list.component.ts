import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { async, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Horse } from 'src/app/_models/horse';
import { HorseService } from 'src/app/_services/horse.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit, AfterViewInit {

    horses$: Observable<Horse[]>;

    horseCount: number = 0 ;

    initialPageSize = 2;
    pageSizeOptions = [2, 4, 6];

    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(private route: ActivatedRoute,
                private horseService: HorseService) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.horseCount=data['horseCount'];
        })
    }

    ngAfterViewInit() {
        
     this.horses$ = this.horseService.getHorses('',
                                     'asc',
                                      0,
                                      this.initialPageSize);
   
    }

    pageChangeEvent(pageEvent: PageEvent) {
 
        this.horses$ = this.horseService.getHorses('',
                      'asc',
                      pageEvent.pageIndex,
                      pageEvent.pageSize );  
    }



}
