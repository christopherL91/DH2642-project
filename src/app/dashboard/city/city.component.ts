import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-city',
  templateUrl: 'city.component.html',
  styleUrls: ['city.component.css']
})
export class CityComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;
  private forecast: any;

  constructor(private route: ActivatedRoute, private weather: WeatherService) {}

  ngOnInit() {
    const location = this.route.snapshot.paramMap.get('location'); //city/:location
    console.log('location', location); // Firebase location. Load and display weather using this.
    this.route
      .data
      .subscribe((data: any) => {
        this.item = data.userdata;
        this.item.$ref.child(`locations/${location}`).once('value', response => {
          const {coordinates} = response.val();
          console.log(coordinates);
          const latitudeString = String(coordinates.latitude);
          const longitudeString = String(coordinates.longitude);
          console.log(latitudeString, longitudeString)
          this.forecast = this.weather
            .getForcastForLocation(latitudeString, longitudeString)
            .subscribe(
              data => console.log(data),
              error => console.error(error),
            )
        });
      });
  }
}
