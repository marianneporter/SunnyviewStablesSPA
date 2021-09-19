import {  Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import { Horse } from 'src/app/_models/horse';
import { HorseData } from 'src/app/_models/horseData';
import { AuthService } from 'src/app/_services/auth.service';
import { HorseService } from 'src/app/_services/horse.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit {

    isMobile: boolean = false;
    updateAccessAllowed = false;

    statusMessage : string;

    horseData: HorseData;

    horses: Horse[];

    searchParam="";
    searchActive: boolean = false;

    listMode = "Card";

    horseCount: number = 0;
  
    initialListPageSize = 2;
    currentPageSize = 2;
    pageSizeOptions = [2, 4, 6];

    cardPageIndex = 0;
    cardPageSize = 12;   

    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private deviceService: DeviceDetectorService,
                private horseService: HorseService,
                private authService: AuthService,
                private snackbar: MatSnackBar) { 
         
        if (this.deviceService.isMobile()) {
            this.listMode = 'Card'
        } else {
            if (this.route.snapshot.queryParams['listMode']) {
                this.listMode = this.route.snapshot.queryParams['listMode'];
            } else {
                this.listMode="List";
            }
        }       

        this.switchQueryParams();
    }

    ngOnInit(): void {
   
        this.checkForMessage(); 

        this.route.data.subscribe(data=> {
            this.horseData=data['horseData'];          
            this.horseCount = this.horseData.searchCount;
            this.horses=this.horseData.horses;         
        });    
        
        this.updateAccessAllowed = this.authService.updateAccessAllowed;
    }

    onHorseSelected(id: number) {
        this.router.navigate(['horse', id], { queryParamsHandling: 'merge' });
    }

    pageChangeEvent(pageEvent: PageEvent) {
        this.currentPageSize=pageEvent.pageSize;
        this.loadHorses(pageEvent.pageIndex, pageEvent.pageSize, false);  
    }

    loadMore() {      
        this.cardPageIndex++; 
        this.loadHorses(this.cardPageIndex, this.cardPageSize, true);      
    }

    switchToCard() {
        this.cardPageIndex = 0;
        this.listMode = 'Card';
        this.switchQueryParams();
        this.loadHorses(this.cardPageIndex, this.cardPageSize, false);
    }

    switchToList() {
        this.cardPageIndex = 0;
        this.listMode = 'List';
        this.switchQueryParams();
        this.loadHorses(0, this.initialListPageSize, false);       
    }

    search() {
        alert("in search method");
        console.log(this.paginator);
        this.searchActive=true;
        this.loadHorses(0,
                       (this.listMode=='List' ? this.initialListPageSize : this.cardPageSize),                     
                       false);
    }

    resetSearch() {
        this.searchParam = '';
        this.searchActive = false;
        this.loadHorses(0,
            (this.listMode=='List' ? this.initialListPageSize : this.cardPageSize),                     
            false);        

    }

    loadHorses(pageIndex: number,
               pageSize: number,            
               concatHorses: boolean) {
 
        this.horseService.getHorses( pageIndex, pageSize, this.searchParam).subscribe(
            (data: HorseData) => {     
                this.horseCount = data.searchCount;
 
                let horsesFromApi = data.horses;
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
        });

        sessionStorage.removeItem('message');
       
    }

   

    switchQueryParams() {

        const urlTree = this.router.createUrlTree([], {
            queryParams: { listMode: this.listMode },
            queryParamsHandling: "merge",
            preserveFragment: true });
        
        this.router.navigateByUrl(urlTree); 
        
    }

}
