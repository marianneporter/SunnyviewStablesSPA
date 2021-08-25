import { Owner } from "./owner";

export interface Horse {
    id: number;
    name: string;
    dob: Date;
    sex: string;
    colour: string;
    heightcm: number; 
    heightHands: string;  
    imageUrl: string;       
    owners: Owner[]; 
    displayOwners: string; 
 }