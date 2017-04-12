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

  public login() {
    this.auth.login()
      .catch(err => {
        console.error('LOGIN ERROR', err);
      });
  }
}
