import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HorseData } from '../_models/horseData';
import { HorseService } from '../_services/horse.service';

@Injectable({
    providedIn: 'root'
})

export class HorseListResolver implements Resolve<HorseData> {
   
    constructor(private horseService : HorseService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<HorseData> {

        const pageSize  = route.queryParamMap.get('pageSize') ? +route.queryParamMap.get('pageSize') : undefined;
        const pageIndex = route.queryParamMap.get('pageIndex') ? +route.queryParamMap.get('pageIndex') : 0;
        const search    = route.queryParamMap.get('search')   ? route.queryParamMap.get('search') : undefined;
      
        return this.horseService.getHorses(pageIndex, pageSize, search);       
    }     
}
