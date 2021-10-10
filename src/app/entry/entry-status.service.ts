import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryStatusService {

  constructor() { }

  loginRequested = new BehaviorSubject<boolean>(false);
 

  loginRequestEnded() {
      this.loginRequested.next(false);
  }

  loginRequestStarted() {
      this.loginRequested.next(true);
  }

}
