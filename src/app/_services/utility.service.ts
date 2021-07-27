import { Injectable } from '@angular/core';
import { Horse } from '../_models/horse';
import { HorseDto } from '../_models/horseDTO';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

    constructor() { }

    mapHorseDtoToHorse(horseDto: HorseDto):Horse {
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
            displayOwners:  horseDto.owners.join(', ')
        }
    }
}
