import { Component, OnInit } from '@angular/core';

import { UserdataService } from '../../userdata.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private config: UserdataService) {
    config.data.subscribe(
      data => console.log('USER DATA', data),
    );
  }

  ngOnInit() {}

  setlocation(location) {
    console.log(location);
  }
}
