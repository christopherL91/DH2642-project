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
  myControl = new FormControl(); // For md-autocomplete. https://material.angular.io/components/component/autocomplete

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
  }

  // For autocompletion.
  //TODO: Raghu
  public search(input: string): Observable<google.maps.places.AutocompletePrediction[]> {
    return this.weather.search({input})
      .debounceTime(500) // wait 500ms until next value in the stream
      .map(this.formatResponse);
  }

  // Consider the input to be an object where location and coordinates is
  // already set. City component will read the coordinates and
  // fetch the forecast for that location.
  //TODO: Raghu
  public add(location: string): firebase.Promise<any> {
    // Consider location is an object {location: 'Stockholm', coordinates: {latitude: 0.5, longitude: 0.7}}
    return this.item.$ref.child(`locations/${location.toLowerCase()}`).update({
      coordinates: {latitude: 59.3547229, longitude: 18.087825800000005} // Add the actual coordinates here.
    });
  }

  // format autocomplete response
  private formatResponse(response: Object): Object {
    console.log(response);
    // TODO Raghu
    // Actually transform the response object into something
    // that is more easily traversed by ngFor
    return response;
  }
}
