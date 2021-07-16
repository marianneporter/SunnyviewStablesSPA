import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

            console.log('in gethorses of horses service');

            let params = new HttpParams();
            params = params.append("pageIndex", pageIndex.toString());
            params = params.append("pageSize", pageSize.toString());        

            const url = environment.baseUrl + 'horses';

            return this.http.get<Horse[]>(url, { params: params });

    }   

    getHorseCount() {
        const url = environment.baseUrl + 'horses/count';
        return this.http.get<number>(url);              
    }  

  
  

}
