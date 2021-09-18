import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Horse } from '../_models/horse';
import { HorseData } from '../_models/horseData';
import { HorseService } from '../_services/horse.service';

@Injectable({
    providedIn: 'root'
})

export class HorseListResolver implements Resolve<HorseData> {
   
    constructor(private horseService : HorseService ) {}

    resolve(): Observable<HorseData> {
        return this.horseService.getHorses();
    }     
}
