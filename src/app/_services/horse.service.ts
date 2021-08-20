import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddReturn } from '../_models/addReturn';
import { Horse } from '../_models/horse';
import { HorseDto } from '../_models/horseDTO';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

    constructor(private http: HttpClient,
                private utility: UtilityService) { }
 
    getHorses(filter='',
              sortDirection='asc',
              pageIndex =0,
              pageSize=3): Observable<Horse[]> {

            let params = new HttpParams();
            params = params.append("pageIndex", pageIndex.toString());
            params = params.append("pageSize", pageSize.toString());        

            const url = environment.baseUrl + 'horses';

            return this.http.get<HorseDto[]>(url, { params: params })
                .pipe(
                    map(horsesDto => {
                        return horsesDto.map(horseDto => {                                                    
                            return this.utility.mapHorseDtoToHorse(horseDto);
                        })
                })
            );   

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

  
  

}
