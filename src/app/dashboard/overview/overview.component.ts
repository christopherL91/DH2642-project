import { Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import { GeolocationService } from '../../geolocation.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private location: GeolocationService) {
    location.getLocation([]).subscribe(
      location => console.log(location),
      error => console.error(error),
    );
  }
  
  ngOnInit() {}
}
