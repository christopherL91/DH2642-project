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

  public login() {
    return this.af.auth.login()
      .then((user: FirebaseAuthState) => {
        return this.af.database.object(`/users/${user.auth.uid}`)
          .update({
            name: user.auth.displayName,
            photo: user.auth.photoURL,
          })
          .then(() => user);
    })
    .then((user: FirebaseAuthState) => {
      console.log(user);
      return this.router.navigate(['/dashboard']);
    })
    .catch((error: Error) => {
      console.error(error);
    });
  }

  public logout(): Promise<Boolean> {
    return this.af.auth.logout().then(() => {
      return this.router.navigate(['/login']);
    });
  }

  public getUser(): Observable<FirebaseObjectObservable<any>> {
    return this.af.auth.asObservable()
      .first()
      .map((authState: FirebaseAuthState) => {
        if(Boolean(authState)) {
          return this.af.database.object(`/users/${authState.auth.uid}`);
        } else {
          return Observable.empty();
        }
      })
      .share();
  }

  public isAuthenticated(): Observable<Boolean> {
    return this.getUser()
      .map((authState) => Boolean(authState));
  }
}
