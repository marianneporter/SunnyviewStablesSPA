import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Horse } from '../_models/horse';
import { HorseService } from '../_services/horse.service';

@Injectable({
    providedIn: 'root'
})

export class HorseListResolver implements Resolve<Horse[]> {
   
    constructor(private horseService : HorseService ) {}

    resolve(): Observable<Horse[]> {
        return this.horseService.getHorses();
    }    
}
