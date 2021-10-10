import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Horse } from "../_models/horse";
import { HorseService } from "../_services/horse.service";

@Injectable({
    providedIn: 'root'
})

export class HorseDetailResolver implements Resolve<Horse> {
   
    constructor(private horseService : HorseService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Horse> {
     
        const id=+route.params['id'];
        return this.horseService.getHorse(id);
    }     
}
