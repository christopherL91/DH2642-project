import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Http } from '@angular/http';

const GEOLOCATION_ERRORS = {
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
	'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class GeolocationService {

  constructor(public http: Http) {}


	getCoords(opts): Observable<any> {
		return Observable.create(observer => {
			if (window.navigator && window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(
					(position) => {
						observer.next(position);
            observer.complete();
					},
					(error) => {
						switch (error.code) {
							case 1:
								observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
								break;
							case 2:
								observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
								break;
							case 3:
								observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
								break;
						}
					},
					opts);
			}
			else {
				observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
			}
		});
	}

  getLocation(lat, long) {

    var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + long + '&language=en' + '&sensor=true';

    this.http.get(GEOCODING).subscribe( city => {
      let address = JSON.parse(city.text()).results[0]["address_components"];
      address.forEach(item => {
        if (item.types.indexOf("locality") > -1 ) {
          return item['long_name'];
        }
      })
    })
  }
}
