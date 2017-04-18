import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Location } from '@angular/common';
import { FirebaseObjectObservable } from 'angularfire2';
import { AuthenticationService } from '../../authentication.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

interface City {
  name: String,
  coordinates: {
    latitude: String,
    longitude: String,
  },
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  private item: FirebaseObjectObservable<any>;
  private locationsControl = new FormControl(); // For md-autocomplete. https://material.angular.io/components/component/autocomplete
  private filteredOptions: Observable<google.maps.places.AutocompletePrediction[]>;
  private selectedCity: City = undefined;
  private sub: Subscription;

  constructor(
    private weather: WeatherService, 
    private auth: AuthenticationService, 
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {}

  ngOnInit(): void {
    this.sub = this.route
      .data
      .subscribe((data: any) => {
        this.item = data.userdata;
      });
    
    this.filteredOptions = this.locationsControl.valueChanges
      .startWith(null)
      .filter(input => Boolean(input))
      .mergeMap(keyword => this.search(keyword));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // User selected a city from the autocomplete list
  private selected(select: google.maps.places.AutocompletePrediction): void {
    this.weather.codeAddress({placeId: select.place_id})
      .map(cities => {
        const city = cities[0]; // exact match
        return Object.assign({}, {
          name: city.formatted_address,
          coordinates: {
            latitude: String(city.geometry.location.lat()),
            longitude: String(city.geometry.location.lng()),
          },
        });
    })
    .subscribe(
      (city: City) => {
        console.log(city);
        this.selectedCity = city; // Set city reference
      },
      (error: Error) => {
        console.error(error);
      },
    );
  }

  // For autocompletion.
  private search(input: string): Observable<google.maps.places.AutocompletePrediction[]> {
    console.log('INPUT', input);
    return this.weather.search({input}).onErrorResumeNext(); // Don't crash on not found.
  }

  // Check if user selected a city from the autocomplete list
  private validLocation(): Boolean {
    return Boolean(this.selectedCity);
  }

  private add() {
    const {name, coordinates} = this.selectedCity;
    // Replace , with '' and space with ' '
    const key = name.replace(/,/g, '').replace(/\s+/g, '-').toLowerCase();
    this.item.$ref.child(`locations/${key}`)
      .update({coordinates})
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error: Error) => {
        console.error(error); // Show error
      });
  }

  private back() {
    this.location.back();
  }
}
