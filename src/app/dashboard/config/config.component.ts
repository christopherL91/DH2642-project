import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { GeolocationService } from '../../geolocation.service';
import { FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;

  constructor(
    private auth: AuthenticationService, 
    private locationService: GeolocationService,
    private route: ActivatedRoute,
    private weather: WeatherService) {
    this.locationService.getCoords([]).subscribe( // Get user coordinates
      location => this.setLocation(location),
      error => console.error(error),
    );
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        this.item = data.userdata;
      });
  }

  // TODO: Raghu
  // Set home location.
  public setLocation(location: any): firebase.Promise<void> | any {
    if(location instanceof Object) { // Got location from browser
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const coordinates = new google.maps.LatLng(latitude, longitude);
      this.weather.geocode(coordinates).subscribe(
        data => {
          return this.item.update({
            home: {
              location: data[0].formatted_address,
              coordinates: {
                latitude,
                longitude,
              },
            }
          });
        },
        error => console.error(error),
      );
    } else { // User typed location manually
      this.weather.codeAddress(location).subscribe(
        data => {
          const closest = data[0];
          const latitude = closest.geometry.location.lat();
          const longitude = closest.geometry.location.lng();
          return this.item.update({
            home: {
              location: closest.formatted_address,
              coordinates: {
                latitude,
                longitude,
              },
            }
          });
        },
        error => console.error(error),
      );
    }
  }

  // Get home location
  public getLocation(): firebase.Promise<any> {
    return this.item.$ref.child('home').once('value', (response: firebase.database.DataSnapshot) => {
      return response.val();
    });
  }
}
