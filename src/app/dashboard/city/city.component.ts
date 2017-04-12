import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { WeatherService } from '../../weather.service';
import R from 'ramda';
import * as moment from 'moment';

@Component({
  selector: 'app-city',
  templateUrl: 'city.component.html',
  styleUrls: ['city.component.css']
})
export class CityComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;
  private forecast: Observable<Object>

  constructor(private route: ActivatedRoute, private weather: WeatherService) {}

  ngOnInit() {
    const location = this.route.snapshot.paramMap.get('location'); //city/:location
    this.route
      .data
      .subscribe((data: any) => {
        this.item = data.userdata;
        this.item.$ref.child(`locations/${location}`).once('value', (response: firebase.database.DataSnapshot) => {
          const {coordinates} = response.val();
          const latitudeString = String(coordinates.latitude);
          const longitudeString = String(coordinates.longitude);
          this.forecast = this.weather
            .getForcastForLocation(latitudeString, longitudeString)
            .map(this.formatWeather);
        });
      });
  }

  // Convert from UNIX timestamp to UTC time.
  // Darksky API uses UNIX timestamps for their timestamps.
  private fromUNIX(timestamp): moment.Moment {
    return moment.unix(timestamp).utc(true);
  }

  // Format weather data.
  private formatWeather(response: Object): Object {
    console.log(response);
    // TODO
    // Actually transform the response object into something
    // that is more easily traversed by ngFor
    return response;
  }
}
