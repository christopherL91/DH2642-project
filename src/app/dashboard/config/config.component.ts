import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../userdata.service';
import { GeolocationService } from '../../geolocation.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private config: UserdataService, public locationService: GeolocationService) {
    config.data.subscribe(
      data => console.log('USER DATA', data),
    );
  }

  ngOnInit() {
    this.locationService.getCoords([]).subscribe(
      location => this.locationService.getLocation(location.coords.latitude, location.coords.longitude),
      error => console.error(error),
    );
  }

  setlocation() {
  }
}
