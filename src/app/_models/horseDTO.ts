import { Owner } from "./owner";
import { OwnerDto } from "./ownerDTO";

export interface HorseDto {
    id: number;
    name: string;  
    dob: string;
    sex: string;
    colour: string;
    heightcm: number;   
    heightHands: string;
    imageUrl: string;       
    owners: OwnerDto[];        
 }