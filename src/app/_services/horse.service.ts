import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddReturn } from '../_models/addReturn';
import { Horse } from '../_models/horse';
import { HorseData } from '../_models/horseData';
import { HorseDataFromAPI } from '../_models/horseDataFromAPI';
import { HorseDto } from '../_models/horseDTO';
import { ConstantsService } from './constants.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

    constructor(private http: HttpClient,
                private utility: UtilityService,
                private deviceService: DeviceDetectorService,
                private constants: ConstantsService) { }
 
    getHorses( pageIndex: number =0,
               pageSize:number = this.deviceService.isMobile() ? 
                                 this.constants.cardPageSize : this.constants.listPageSize,
               searchParam:string =""): Observable<HorseData> {
        console.log('in get horses'); 
        const url = environment.baseUrl + 'horses';

        let params = new HttpParams();
     
        params = params.append("pageIndex", pageIndex.toString());  
        params = params.append("pageSize", pageSize.toString()); 
        
        if (searchParam) {
            params = params.append("search", searchParam); 
        }               

        console.log('just about to return data');
        return this.http.get<HorseDataFromAPI>(url, { params: params })
            .pipe(
                map(data => {
                    console.log('received horse data');
                    let horseData: HorseData = {
                        countAll: data.countAll,
                        searchCount: data.searchCount,
                        horses: data.horses.map(h => this.utility.mapHorseDtoToHorse(h))
                    }
                    return horseData;
                }),
                catchError((error) => {
                    console.log('error caught in getHorses');
                    console.log(error);
                    return of(null);
                })
            )
    }   

    getHorseCount() {
        const url = environment.baseUrl + 'horses/count';

        return this.http.get<number>(url)
            .pipe(
                catchError(() => of(0))
            )              
    } 

    getHorse(id: number): Observable<Horse> {
        const url = environment.baseUrl + 'horses/' + id; 
        return this.http.get<HorseDto>(url)
            .pipe(
                map(horseDto=> {
                    return this.utility.mapHorseDtoToHorse(horseDto);
                })
            )   
    }
    
        
    addHorse(horseFormData: FormData) : Observable<AddReturn> {
        const url = environment.baseUrl + 'horses';     
        return this.http.post<AddReturn>(url, horseFormData);
    }
         
    updateHorse(horseFormData: FormData) : Observable<any> {   
        const url = environment.baseUrl + 'horses';     
        return this.http.patch<any>(url, horseFormData);
    }  
 
}
