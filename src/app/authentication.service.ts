import { Injectable } from '@angular/core';
import { 
  AngularFire,
  AngularFireAuth, 
  AngularFireDatabase, 
  FirebaseAuthState,
  FirebaseObjectObservable, 
} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  constructor(private af: AngularFire, private router: Router) {}

  login() {
    return this.af.auth.login().then((data) => {
      return this.af.database.object(`/users/${data.auth.uid}`).update({
        name: data.auth.displayName,
        photo: data.auth.photoURL,
      }).then(() => this.router.navigate(['/dashboard']));
    });
  }

  logout(): Promise<Boolean> {
    return this.af.auth.logout().then(() => {
      return this.router.navigate(['/login']);
    });
  }

  getUser(): Observable<FirebaseObjectObservable<any>> {
    return this.af.auth.asObservable()
      .take(1)
      .map((authState) => {
        if(Boolean(authState)) {
          return this.af.database.object(`/users/${authState.auth.uid}`);
        }
      }).share();
  }

  isAuthenticated(): Observable<Boolean> {
    return this.getUser()
      .map((authState) => Boolean(authState));
  }
}
