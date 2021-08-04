import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Owner } from "../_models/owner";
import { OwnersService } from "../_services/owners.service";

@Injectable({
    providedIn: 'root'
})

export class HorseAddUpdateResolver implements Resolve<Owner[]> {
   
    constructor(private ownersService : OwnersService ) {}

    resolve(): Observable<Owner[]> {
        return this.ownersService.getOwners();
    }     
}
