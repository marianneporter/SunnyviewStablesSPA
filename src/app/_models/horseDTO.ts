import { Owner } from "./owner";

export interface HorseDto {
    id: number;
    name: string;  
    dob: string;
    sex: string;
    colour: string;
    heightcm: number;   
    imageUrl: string;       
    owners: string[];        
 }