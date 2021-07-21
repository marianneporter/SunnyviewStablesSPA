import { Owner } from "./owner";

export interface Horse {
    id: number;
    name: string;
    DOB: string;
    sex: string;
    colour: string;
    heightcm: number;   
    imageUrl: string;       
    owners: string[];
    displayOwners: string;   
 }