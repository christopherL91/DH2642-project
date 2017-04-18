import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class DataResolver implements Resolve<Observable<FirebaseObjectObservable<any>>> {

    constructor(private auth: AuthenticationService) {}

    // Resolve firebase user data
    public resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<FirebaseObjectObservable<any>> {
        return this.auth.getUser();
    }
}