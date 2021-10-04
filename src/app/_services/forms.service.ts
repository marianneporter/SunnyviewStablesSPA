import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {



    sexes = [
        { id: 'Gelding', name: 'Gelding'},
        { id: 'Mare', name: 'Mare'},
        { id: 'Colt', name: 'Colt'},
        { id: 'Filly', name: 'Filly'},
        { id: 'Stallion', name: 'Stallion'}
    ]

    colours = [
        { id: 'Brown', name: 'Brown'},
        { id: 'Bay', name: 'Bay'},
        { id: 'Black', name: 'Black'},
        { id: 'Grey', name: 'Grey'},
        { id: 'Piebald', name: 'Piebald'},
        { id: 'Chestnut', name: 'Chestnut'},
        { id: 'Dun', name: 'Dun'},
        { id: 'Skewbald', name: 'Skewbald'},
        { id: 'Piebald', name: 'Piebald'},
        { id: 'Roan', name: 'Roan'},  
        { id: 'Spotted', name: 'Spotted'},
        { id: 'Palomino', name: 'Palomino'}           
    ]
 
    horseHeights = [
        { id: '10.0', name: '10.0'},
        { id: '10.1', name: '10.1'},
        { id: '10.2', name: '10.2'},
        { id: '10.3', name: '10.3'},
        { id: '11.0', name: '11.0'},
        { id: '11.1', name: '11.1'},
        { id: '11.2', name: '11.2'},
        { id: '11.3', name: '11.3'},
        { id: '12.0', name: '12.0'},
        { id: '12.1', name: '12.1'},
        { id: '12.2', name: '12.2'},
        { id: '12.3', name: '12.3'},
        { id: '13.0', name: '13.0'},
        { id: '13.1', name: '13.1'},
        { id: '13.2', name: '13.2'},
        { id: '13.3', name: '13.3'},
        { id: '14.0', name: '14.0'},
        { id: '14.1', name: '14.1'},
        { id: '14.2', name: '14.2'},
        { id: '14.3', name: '14.3'},
        { id: '15.0', name: '15.0'},
        { id: '15.1', name: '15.1'},
        { id: '15.2', name: '15.2'},
        { id: '15.3', name: '15.3'},
        { id: '16.0', name: '16.0'},
        { id: '16.1', name: '16.1'},
        { id: '16.2', name: '16.2'},
        { id: '16.3', name: '16.3'},
        { id: '17.0', name: '17.0'},
        { id: '17.1', name: '17.1'},
        { id: '17.2', name: '17.2'},
        { id: '17.3', name: '17.3'},
        { id: '18.0', name: '18.0'},
        { id: '18.1', name: '18.1'},
        { id: '18.2', name: '18.2'},
        { id: '18.2', name: '18.3'}
    ]

    constructor() { }
    }
