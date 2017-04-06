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
  
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.auth.isAuthenticated()
        .do((authenticated: Boolean) => {
          if(!authenticated) {
            this.router.navigate(['/login']);
            return false;
          } else {
            return true;
          }
        });
    }
}
