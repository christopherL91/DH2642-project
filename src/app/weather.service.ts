import { Injectable, NgZone } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {} from '@types/googlemaps';

@Injectable()
export class WeatherService {

  private geocoder = new google.maps.Geocoder();
  private autocomplete = new google.maps.places.AutocompleteService();

  constructor(private http: Http) {}

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
                      console.error(
                        `Geocoding service: geocoder failed due to: ${status}`
                      );
                      observer.error(status);
                  }
              })
          );
      });
  }

   /**
   * Places suggestions
   * 
   * Wraps the Google Maps API places suggestions service into an observable.
   * 
   * @param options google.maps.places.AutocompletionRequest
   * @return An observable of AutocompletePrediction
   */
  search(options: google.maps.places.AutocompletionRequest): Observable<google.maps.places.AutocompletePrediction[]> {
      return new Observable((observer: Observer<google.maps.places.AutocompletePrediction[]>) => {
        this.autocomplete.getPlacePredictions(options, (
            (result: google.maps.places.AutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    observer.next(result);
                    observer.complete();
                } else {
                    console.error(
                        `Autocomplete service: autocomplete failed due to: ${status}`
                    )
                    observer.error(status);
                }
            }
        ));
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
  getForcastForLocation(latitude: string, longitude: string): Observable<any> {
    const WeatherServiceURL = 'http://localhost:8080/forecast'; // Start the local server before using this.
    const body = JSON.stringify({latitude, longitude});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    return this.http.post(WeatherServiceURL, body, options).map(response => {
      return response.json();
    });
  }
}
