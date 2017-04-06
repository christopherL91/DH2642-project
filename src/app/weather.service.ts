import { Injectable, NgZone } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {} from '@types/googlemaps';

@Injectable()
export class WeatherService {

  geocoder: google.maps.Geocoder;

  constructor(private http: Http) {
    this.geocoder = new google.maps.Geocoder();
  }

  /**
   * Reverse geocoding by location.
   * 
   * Wraps the Google Maps API geocoding service into an observable.
   * 
   * @param latLng Location
   * @return An observable of GeocoderResult
   */
  geocode(latLng: google.maps.LatLng): Observable<google.maps.GeocoderResult[]> {
      return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {
          // Invokes geocode method of Google Maps API geocoding.
          this.geocoder.geocode({'location': latLng}, (
              (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                  if (status === google.maps.GeocoderStatus.OK) {
                      observer.next(results);
                      observer.complete();
                  } else {
                      console.log(
                        `Geocoding service: geocoder failed due to: ${status}`
                      );
                      observer.error(status);
                  }
              })
          );
      });
  }

  /**
   * Geocoding services.
   * 
   * Wraps the Google Maps API geocoding service into an observable.
   * 
   * @param address The address to be searched
   * @return An observable of GeocoderResult
   */
  codeAddress(address: string): Observable<google.maps.GeocoderResult[]> {
      return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {
          // Invokes geocode method of Google Maps API geocoding.
          this.geocoder.geocode({'address': address}, (
              (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                  if (status === google.maps.GeocoderStatus.OK) {
                      observer.next(results);
                      observer.complete();
                  } else {
                      console.log(
                        `Geocoding service: geocode was not successful for the following reason: ${status}`
                      );
                      observer.error(status);
                  }
              })
          );
      });
  }

  // Returns darksky forecast for given coordinates.
  getForcastForLocation(latitude: string, longitude: string): Observable<Response> {
    const WeatherServiceURL = 'http://localhost:8080/forecast'; // Start the local server before using this.
    const body = JSON.stringify({latitude, longitude});
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(WeatherServiceURL, body, options).map(response => {
      return response.json();
    });
  }
}
