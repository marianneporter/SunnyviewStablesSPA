import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

    sexes = [
        { value: 'Gelding', name: 'Gelding'},
        { value: 'Mare', name: 'Mare'},
        { value: 'Colt', name: 'Colt'},
        { value: 'Filly', name: 'Filly'},
        { value: 'Stallion', name: 'Stallion'}
    ]

    colours = [
        { value: 'Brown', name: 'Brown'},
        { value: 'Bay', name: 'Bay'},
        { value: 'Black', name: 'Black'},
        { value: 'Grey', name: 'Grey'},
        { value: 'Piebald', name: 'Piebald'},
        { value: 'Chestnut', name: 'Chestnut'},
        { value: 'Dun', name: 'Dun'},
        { value: 'Skewbald', name: 'Skewbald'},
        { value: 'Piebald', name: 'Piebald'},
        { value: 'Palomino', name: 'Palomino'}        
    ]
 
    horseHeights = [
        { value: '10.0', name: '10.0'},
        { value: '10.1', name: '10.1'},
        { value: '10.2', name: '10.2'},
        { value: '10.3', name: '10.3'},
        { value: '11.0', name: '11.0'},
        { value: '11.1', name: '11.1'},
        { value: '11.2', name: '11.2'},
        { value: '11.3', name: '11.3'},
        { value: '12.0', name: '12.0'},
        { value: '12.1', name: '12.1'},
        { value: '12.2', name: '12.2'},
        { value: '12.3', name: '12.3'},
        { value: '13.0', name: '13.0'},
        { value: '13.1', name: '13.1'},
        { value: '13.2', name: '13.2'},
        { value: '13.3', name: '13.3'},
        { value: '14.0', name: '14.0'},
        { value: '14.1', name: '14.1'},
        { value: '14.2', name: '14.2'},
        { value: '14.3', name: '14.3'},
        { value: '15.0', name: '15.0'},
        { value: '15.1', name: '15.1'},
        { value: '15.2', name: '15.2'},
        { value: '15.3', name: '15.3'},
        { value: '16.0', name: '16.0'},
        { value: '16.1', name: '16.1'},
        { value: '16.2', name: '16.2'},
        { value: '16.3', name: '16.3'},
        { value: '17.0', name: '17.0'},
        { value: '17.1', name: '17.1'},
        { value: '17.2', name: '17.2'},
        { value: '17.3', name: '17.3'},
        { value: '18.0', name: '18.0'},
        { value: '18.1', name: '18.1'},
        { value: '18.2', name: '18.2'},
        { value: '18.2', name: '18.3'}
    ]

    constructor() { }
    }
