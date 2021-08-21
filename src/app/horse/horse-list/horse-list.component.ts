import {  Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, of } from 'rxjs';
import { Horse } from 'src/app/_models/horse';
import { HorseService } from 'src/app/_services/horse.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit {

    innerWidth: any

    @HostListener('window:resize', ['$event'])
        onResize(event:any) {
            this.innerWidth = window.innerWidth;
    }

    horses: Horse[];

    horseCount: number = 0 ;

    initialPageSize = 2;
    pageSizeOptions = [2, 4, 6];

    mobilePageIndex = 0;
    mobilePageSize = 3;
 
   

    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private horseService: HorseService) { }

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        
        this.route.data.subscribe(data => {
            this.horseCount=data['horseCount'];
          

        });     
      
        this.horseService.getHorses('',
                        'asc',
                        0,
                        this.innerWidth > 600 ? this.initialPageSize 
                                              : this.mobilePageSize )
            .subscribe(
                (data) => {
                    this.horses = data;
                }
            ) 
        
    }

    onHorseSelected(id: number) {
        this.router.navigate(['horse', id]);
    }

    pageChangeEvent(pageEvent: PageEvent) {
 
        this.horseService.getHorses('',
                                    'asc',
                                    pageEvent.pageIndex,
                                    pageEvent.pageSize )
            .subscribe(
                (data) => {
                    this.horses = data;
                }
            )  
    }

    loadMore() {
      
        this.mobilePageIndex++;
        let additionalHorses: Horse[];
        this.horseService.getHorses('',
                      'asc',
                      this.mobilePageIndex,
                      this.mobilePageSize ).subscribe(
            (data: Horse[]) => {
                additionalHorses = data;
                this.horses = this.horses.concat(additionalHorses);                
                console.log(additionalHorses);
                console.log(this.horses);
                console.log(this.horses.length);
                console.log(this.horseCount);
                
            } );
     
    }

    search() {
        alert("hello");
    }



}
