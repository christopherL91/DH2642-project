import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthenticationService) {}
  
  ngOnInit(): void {}

  private logout(): Promise<Boolean> {
    return this.auth.logout();
  }
}
