import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private auth: AuthenticationService) {}

  ngOnInit() {}

  login() {
    this.auth.login()
    .catch(err => {
        console.error('ERROR', err);
    });
  }

  logout() {
    this.auth.logout();
  }
}
