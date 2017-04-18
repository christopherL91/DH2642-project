import { Component, OnInit} from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;
  private sub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route
      .data
      .take(1)
      .subscribe(
        (item: any) => {
          this.item = item.userdata;
        },
        (error: Error) => {
          console.error(error);
        },
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Removes the location
  private remove(location: string): firebase.Promise<any> {
    return this.item
      .$ref
      .child(`locations/${location}`)
      .remove();
  }
}
