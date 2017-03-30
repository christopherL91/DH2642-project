import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AngularFireAuth, AngularFireDatabase } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  public userService: AngularFireAuth;
  public databaseService: AngularFireDatabase;

  constructor(private af: AngularFire, private router: Router) {
    this.userService = af.auth;
    this.databaseService = af.database;
  }

  login() {
    return this.userService.login().then((data) => {
      return this.databaseService.object(`/users/${data.auth.uid}`).set({
        name: data.auth.displayName,
        photo: data.auth.photoURL,
      }).then(() => {
        return this.router.navigate(['/dashboard']);
      });
    });
  }

  logout() {
    return this.userService.logout().then(() => {
      return this.router.navigate(['']);
    })
  }
}
