import { Owner } from "./owner";

export interface Horse {
    id: number;
    name: string;
    dob: Date;
    sex: string;
    colour: string;
    heightcm: number;   
    imageUrl: string;       
    owners: string[]; 
    displayOwners: string; 
 }