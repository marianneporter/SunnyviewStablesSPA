import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

    constructor() { }

    private _listPageSize = 6;
    private _cardPageSize= 12;
    private _listPageSizeOptions = [4, 6, 8];
   
    public get listPageSize() {
        return this._listPageSize;
    }
    
    public get cardPageSize() {
        return this._cardPageSize;
    }

    public get listPageSizeOptions() {
        return this._listPageSizeOptions;
    }
}
