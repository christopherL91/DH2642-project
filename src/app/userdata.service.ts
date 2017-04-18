import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserdataService {
  
  // Observable object sources
  private weatherSource = new BehaviorSubject<Object>(null); // Initial state

   // Observable object streams
  public weatherSource$ = this.weatherSource.asObservable().share();

  constructor() {}

  public publish(data: Object) {
    console.log('WILL SEND', data);
    this.weatherSource.next(data);
  }
}
