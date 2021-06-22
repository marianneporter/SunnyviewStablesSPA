import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Horse } from '../_models/horse';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

    constructor(private http: HttpClient) { }
 
    getHorses(): Observable<Horse[]> {
        const url = environment.baseUrl + 'horses';
        return this.http.get<Horse[]>(url);          
    }   

  
  

}
