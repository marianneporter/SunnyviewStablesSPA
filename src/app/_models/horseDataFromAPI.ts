import { Horse } from "./horse";
import { HorseDto } from "./horseDTO";

export interface HorseDataFromAPI {
    count: number;
    horses: HorseDto[];   
 }