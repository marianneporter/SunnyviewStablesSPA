import {  Component, OnInit, ViewChild } from '@angular/core';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Horse } from 'src/app/_models/horse';
import { HorseData } from 'src/app/_models/horseData';
import { AuthService } from 'src/app/_services/auth.service';
import { ConstantsService } from 'src/app/_services/constants.service';
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
  
    initialListPageSize: number;
    currentPageSize:number;
    pageSizeOptions: number[];
    cardPageIndex = 0;
    cardPageSize:number;  

    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private deviceService: DeviceDetectorService,
                private constants: ConstantsService,
                private horseService: HorseService,
                private authService: AuthService,
                private snackbar: MatSnackBar) { 

        this.initialListPageSize = this.constants.listPageSize;
        this.currentPageSize     = this.constants.listPageSize;
        this.pageSizeOptions     = this.constants.listPageSizeOptions;
        this.cardPageSize        = this.constants.cardPageSize;

         
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
        
        this.updateAccessAllowed = this.authService.updateAllowed;
    }

    onHorseSelected(id: number) {
        
        this.router.navigate( ['horse', id],
                              { queryParams: { pageSize: this.listMode=='List'
                                               ? this.currentPageSize : this.cardPageSize},
                                queryParamsHandling: 'merge' });
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

    returnToList() {
        this.searchParam='';
        this.loadHorses(0, this.currentPageSize, false);
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
            duration: 6000
        });

        sessionStorage.removeItem('message');
       
    }

    switchQueryParams() {

        const urlTree = this.router.createUrlTree([], {
            queryParams: { listMode: this.listMode,
                           pageSize: this.listMode=="List" ? this.currentPageSize : this.cardPageSize },
            queryParamsHandling: "merge",
            preserveFragment: true });
        
        this.router.navigateByUrl(urlTree); 
        
    }

}
