import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseAuthState } from 'angularfire2';

import { AuthenticationService } from './authentication.service';
import { UserdataService } from './userdata.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthenticationService, private user: UserdataService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.userService
      .take(1)
      .map((authState: FirebaseAuthState): Boolean => {
        if(Boolean(authState)) { // Got authentication
           this.user.data = this.auth.databaseService.object(`/users/${authState.auth.uid}`);
          return true;
        } else {
          return false;
        }
      })
      .do((authenticated: Boolean) => {
        if (!authenticated) this.router.navigate(['']);
      });
  }
}
