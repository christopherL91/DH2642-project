import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from '../../../userdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: 'city.component.html',
  styleUrls: ['city.component.css']
})
export class CityComponent implements OnInit {

  private forecast: Object;
  private weatherSubscription$: Subscription;
  private currenttemp: string;
  private currentlocation: string;
  private hourlytemp: any;
  private currenticon: string;

  constructor(private user: UserdataService, private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentlocation = this.route.snapshot.paramMap.get('location');
    this.currentlocation = this.currentlocation.charAt(0).toUpperCase() + this.currentlocation.slice(1);
    this.currentlocation = this.currentlocation.replace(/-/g, ' ');
    this.weatherSubscription$ = this.user.weatherSource$.subscribe(
      (weather: any) => {
        if (weather) {
          console.log('CITY', weather); // Do something with weather here.
          this.forecast = weather;
          this.currenttemp = weather.currently.temperature;
          this.hourlytemp = weather.hourly['data'].slice(0,12);
          this.currenticon = weather.currently.icon;
          console.log(this.currenticon);
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
