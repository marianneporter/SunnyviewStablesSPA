import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Horse } from '../_models/horse';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

    constructor(private http: HttpClient) { }
 
    getHorses(filter='',
              sortDirection='asc',
              pageIndex =0,
              pageSize=3): Observable<Horse[]> {

            let params = new HttpParams();
            params = params.append("pageIndex", pageIndex.toString());
            params = params.append("pageSize", pageSize.toString());        

            const url = environment.baseUrl + 'horses';

            return this.http.get<Horse[]>(url, { params: params })
                .pipe(
                    map(horses => {
                        return horses.map(horse => {
                            let amendedHorse: Horse = {...horse};
                            amendedHorse.displayOwners = amendedHorse.owners.join(', ');
                            return amendedHorse;
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

  
  

}
