import {  Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Horse } from 'src/app/_models/horse';
import { HorseService } from 'src/app/_services/horse.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit {

    // innerWidth: any

    // @HostListener('window:resize', ['$event'])
    //     onResize(event:any) {
    //         this.innerWidth = window.innerWidth;
    // }

    isMobile: boolean = false;

    statusMessage : string;

    horses: Horse[];

    listMode = "Card";

    horseCount: number = 0 ;

    initialListPageSize = 2;
    pageSizeOptions = [2, 4, 6];

    cardPageIndex = 0;
    cardPageSize = 12;
 
   

    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private deviceService: DeviceDetectorService,
                private horseService: HorseService,
                private snackbar: MatSnackBar) { 
        debugger;
    //    this.innerWidth = window.innerWidth;

        //this.listMode = this.innerWidth > 600 ? "List" : "Card";
        // this.isMobile = this.deviceService.isMobile();
        // debugger;
        this.listMode = this.deviceService.isMobile() ? 'Card' : 'List';
    }

    ngOnInit(): void {
        this.checkForMessage(); 

        this.route.data.subscribe(data => {
            this.horseCount=data['horseCount'];   
        });   
      
        this.loadHorses(0, (this.listMode=='List' ? this.initialListPageSize : this.cardPageSize), false);
        
    }

    onHorseSelected(id: number) {
        this.router.navigate(['horse', id]);
    }

    pageChangeEvent(pageEvent: PageEvent) {
        this.loadHorses(pageEvent.pageIndex, pageEvent.pageSize, false);  
    }

    loadMore() {      
        this.cardPageIndex++;
        this.loadHorses(this.cardPageIndex, this.cardPageSize, true);      
    }

    switchToCard() {
        this.cardPageIndex = 0;
        this.listMode = 'Card';
        this.loadHorses(this.cardPageIndex, this.cardPageSize, false);
    }

    switchToList() {
        this.cardPageIndex = 0;
        this.listMode = 'List';
        this.loadHorses(0, this.initialListPageSize, false);       
    }

    loadHorses(pageIndex: number, pageSize: number, concatHorses: boolean) {
     
        let horsesFromApi: Horse[];
        this.horseService.getHorses('',
            'asc',
            pageIndex,
            pageSize ).subscribe(
                (data: Horse[]) => {                    
                    horsesFromApi = data;
                    this.horses= concatHorses ? this.horses.concat(horsesFromApi) : horsesFromApi;                               
                } );       
    }

    checkForMessage() {

        if (sessionStorage.getItem('message')) {
            this.statusMessage = sessionStorage.getItem('message');
        } else {
            return;
        };

        this.snackbar.open(this.statusMessage, 'dismiss', {
            duration: 5000
        //    panelClass: ["photo-error-snackbar"]
        });

        sessionStorage.removeItem('message');
       
    }
}
