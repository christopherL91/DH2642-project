import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { 
  Router, 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  NavigationEnd, 
} from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private busy: firebase.Promise<any>;
  
  constructor(private auth: AuthenticationService, private router: Router) {}

  private login(): firebase.Promise<any> {
    this.busy = this.auth.login();
    return this.busy;
  }
}
