import { Injectable } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserdataService {

  public data: FirebaseObjectObservable<Object>;
  
  constructor() {}
}
