import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryStatusService {

  constructor() { }

  loginRequested: boolean = false;  
    
  loginRequestEnded() {
      this.loginRequested=false;
  }

  loginRequestStarted() {
      this.loginRequested=true;
  }

}
