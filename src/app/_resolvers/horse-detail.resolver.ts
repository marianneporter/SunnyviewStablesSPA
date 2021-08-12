import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Horse } from "../_models/horse";
import { Owner } from "../_models/owner";
import { HorseService } from "../_services/horse.service";
import { OwnersService } from "../_services/owners.service";

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
