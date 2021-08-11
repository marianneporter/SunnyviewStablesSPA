import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../_models/owner';
import { OwnerDto } from '../_models/ownerDTO';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

    constructor(private http: HttpClient) { }

    getOwners(): Observable<Owner[]> {     

            const url = environment.baseUrl + 'owners';

            return this.http.get<Owner[]>(url);
     } 

          
    addOwner(ownerDto: OwnerDto) : Observable<OwnerDto> {

        const url = environment.baseUrl + 'owners';     
        return this.http.post<OwnerDto>(url, ownerDto);
    }

}
