import { Injectable } from '@angular/core';
import DarkSky from 'dark-sky';

@Injectable()
export class WeatherService {
  private forecast = new DarkSky('a7e61e83d8583bfa9373f9617ded708c');

  constructor() {}

  getForcastForLocation(latitude: string, longitude: string): Promise<Object> {
    return this.forecast
    .latitude(latitude)
    .longitude(longitude)
    .units('ca')
    .language('en')
    .exclude('minutely,daily')
    .extendHourly(true)
    .get();
  }
}
