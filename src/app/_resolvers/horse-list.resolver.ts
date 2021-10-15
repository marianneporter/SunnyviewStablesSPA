import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HorseData } from '../_models/horseData';
import { HorseService } from '../_services/horse.service';

@Injectable({
    providedIn: 'root'
})

export class HorseListResolver implements Resolve<HorseData> {
   
    constructor(private horseService : HorseService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<HorseData> {

        const pageSize = route.queryParamMap.get('pageSize') ? +route.queryParamMap.get('pageSize') : undefined;
        const search   = route.queryParamMap.get('search')   ? route.queryParamMap.get('search') : undefined;
    
        return this.horseService.getHorses(0, pageSize, search);
       
    }     
}
