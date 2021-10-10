import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { HorseService } from "../_services/horse.service";
import { OwnersService } from "../_services/owners.service";

@Injectable({
    providedIn: 'root'
})

export class HorseAddUpdateResolver implements Resolve<any[]> {
   
    constructor(private ownersService : OwnersService,
                private horseService : HorseService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {

        const owners = this.ownersService.getOwners();
        const id=+route.params['id'];  
        
        return (id==0) ? owners
                       : forkJoin([owners, this.horseService.getHorse(id)]);
    }     
}
