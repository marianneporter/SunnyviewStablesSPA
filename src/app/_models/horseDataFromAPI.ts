import { HorseDto } from "./horseDTO";

export interface HorseDataFromAPI {
    countAll: number;
    searchCount: number;
    horses: HorseDto[];   
 }