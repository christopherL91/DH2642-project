import { Component, OnInit} from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';
import { AuthenticationService } from '../../authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute) {}

  ngOnInit() {
     this.route
      .data
      .subscribe((data: any) => {
        this.item = data.userdata;
      });
  }

  // Removes the location
  public remove(location: string): firebase.Promise<any> | any {
    return this.item.$ref.child(`locations/${location}`).remove();
  }
}
