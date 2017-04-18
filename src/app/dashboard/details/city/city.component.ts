import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserdataService } from '../../../userdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: 'city.component.html',
  styleUrls: ['city.component.css']
})
export class CityComponent implements OnInit {

  private forecast: Object
  private weatherSubscription$: Subscription;

  constructor(private user: UserdataService, private location: Location) {}

  ngOnInit(): void {
    this.weatherSubscription$ = this.user.weatherSource$.subscribe(
      (weather: any) => {
        if (weather) {
          console.log('CITY', weather); // Do something with weather here.
          this.forecast = weather;
        }
      },
      (error: Error) => console.error(error),
    );
  }

  ngOnDestroy(): void {
    this.weatherSubscription$.unsubscribe();
  }

  private back() {
    this.location.back();
  }
}
