import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;

  constructor(private auth: AuthenticationService, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.item = data.userdata;
      });
  }

  logout(): Promise<Boolean> {
    return this.auth.logout();
  }
}
