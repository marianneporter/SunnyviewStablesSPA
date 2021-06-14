import { LoggedInUser } from './loggedInUser';

export interface LoginResponse {
    token: string;
    user : LoggedInUser; 
}