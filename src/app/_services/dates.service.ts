import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

    todaysDate: Date = null;

    constructor() {
        this.todaysDate = new Date();
        this.todaysDate.setHours(0, 0, 0, 0); 
    }

    msToYears = (ms) => Math.floor(ms / 31536000000); 

    getAge(dob) {
        let today = new Date();
        let msDiff = today.getTime() - dob.getTime();
        return this.msToYears(msDiff);
    }
        
    convertJSDateToYYYYMMDD(jsDate: Date): string {
        let dd=jsDate.getDate().toString();
        let mm=(jsDate.getMonth()+1).toString();
        let yyyy=jsDate.getFullYear().toString();
        if (dd.length == 1) {dd='0' + dd};
        if (mm.length == 1) {mm='0' + mm};
        return `${yyyy}-${mm}-${dd}`;
    }

    subtractYearsFromToday(yearsToSubtract) {   
       
        return new Date(this.todaysDate.getFullYear() - yearsToSubtract,
                        this.todaysDate.getMonth(),
                        this.todaysDate.getDate());
     
    }   
}
