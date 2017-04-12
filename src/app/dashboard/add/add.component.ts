import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { FirebaseObjectObservable } from 'angularfire2';
import { AuthenticationService } from '../../authentication.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;
  private citiesControl = new FormControl(); // For md-autocomplete. https://material.angular.io/components/component/autocomplete
  private filteredOptions: Observable<any>;
  selectedcity: boolean;
  disableinput: boolean;

  constructor(
    private weather: WeatherService,
    private auth: AuthenticationService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        this.item = data.userdata;
      });

    this.filteredOptions = this.citiesControl.valueChanges
      .startWith(null)
      .filter(input => Boolean(input))
      .mergeMap(keyword => this.search(keyword));

    this.disableinput = false;
    this.selectedcity = false;
  }

  // TODO: Raghu
  // Should we do something when the user has selected a city?
  private selected(user: google.maps.places.AutocompletePrediction): void {
    this.weather.codeAddress({placeId: user.place_id})
    .mergeMap(cities => {
      const city = cities[0]; // exact match
      const latitude = String(city.geometry.location.lat());
      const longitude = String(city.geometry.location.lng());
      this.selectedcity = true;
      this.disableinput = true;
      return this.weather.getForcastForLocation(latitude, longitude)
        .map(weather => Object.assign(weather, {city}));
    })
    .subscribe(
      weatherData => console.log('WEATHERDATA', weatherData),
      error => console.error(error),
    )
  }

  // For autocompletion.
  // TODO: Raghu
  private search(input: string): Observable<google.maps.places.AutocompletePrediction[]> {
    console.log('INPUT', input);
    return this.weather.search({input});
  }

  //TODO: Raghu
  private add(location: string): firebase.Promise<any> {
    // Consider the input to be an object instead of a string
    // where location and coordinates is
    // already set. City component will read the coordinates and
    // fetch the forecast for that location.
    const key = location.replace(/\s+/g, '-').toLowerCase();
    // Consider location is an object {location: 'Stockholm', coordinates: {latitude: 0.5, longitude: 0.7}}
    return this.item.$ref.child(`locations/${key}`).update({
      coordinates: {latitude: 59.3547229, longitude: 18.087825800000005} // Add the actual coordinates here.
    });
  }
}
