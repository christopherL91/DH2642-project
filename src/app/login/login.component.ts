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
  
  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login()
      .catch(err => {
        console.error('LOGIN ERROR', err);
      });
  }

  logout() {
    this.auth.logout()
      .catch(err => {
        console.error('LOGOUT ERROR', err);
      });
  }
}
