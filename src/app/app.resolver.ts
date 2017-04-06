import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DataResolver implements Resolve<any> {

    constructor(private auth: AuthenticationService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.getUser();
    }
}