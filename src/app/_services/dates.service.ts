import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

    constructor() { }
     
    convertJSDateToYYYYMMDD(jsDate: Date): string {
        let dd=jsDate.getDate().toString();
        let mm=(jsDate.getMonth()+1).toString();
        let yyyy=jsDate.getFullYear().toString();
        if (dd.length == 1) {dd='0' + dd};
        if (mm.length == 1) {mm='0' + mm};
        return `${yyyy}-${mm}-${dd}`;
    }

}
