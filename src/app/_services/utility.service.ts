import { Injectable } from '@angular/core';
import { Horse } from '../_models/horse';
import { HorseDto } from '../_models/horseDTO';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

    constructor() { }

    mapHorseDtoToHorse(horseDto: HorseDto):Horse {
        let owners =  horseDto.owners[0].firstName + ' ' + horseDto.owners[0].lastName;     

        for (let i=1; i<horseDto.owners.length; i++) {
            owners += (i == horseDto.owners.length -1) ? ' and ' : ', ';
            owners += horseDto.owners[i].firstName + ' ' +  horseDto.owners[i].lastName;
        }
 
        return {
            id: horseDto.id,
            name: horseDto.name,
            dob: new Date(horseDto.dob),
            sex: horseDto.sex,
            colour: horseDto.colour,
            heightcm: horseDto.heightcm,
            heightHands: horseDto.heightHands,
            imageUrl: horseDto.imageUrl,
            owners: horseDto.owners,
            displayOwners: owners
        }
    }
}
