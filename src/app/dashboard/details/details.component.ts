import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from '../../userdata.service';
import { WeatherService } from '../../weather.service';
import { FirebaseObjectObservable } from 'angularfire2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;
  private sub: Subscription;

  constructor(
    private user: UserdataService,
    private route: ActivatedRoute, 
    private weather: WeatherService) {}

  ngOnInit(): void {
    const location = this.route.snapshot.paramMap.get('location'); //city/:location
    this.sub = this.route.data.subscribe((data: any) => {
        this.item = data.userdata;
        this.item.$ref.child(`locations/${location}`).once('value', (response: firebase.database.DataSnapshot) => {
          const {coordinates} = response.val();
          const latitudeString = String(coordinates.latitude);
          const longitudeString = String(coordinates.longitude);
          this.weather
            .getForcastForLocation(latitudeString, longitudeString)
            .toPromise()
            .then(data => {
              console.log('GOT DATA', data);
              this.user.publish(data)
            });
        });
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
