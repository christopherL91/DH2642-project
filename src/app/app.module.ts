import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import {AppComponent} from './app.component';

// Services
import { AuthenticationService } from './authentication.service';
import { GeolocationService } from './geolocation.service';
import { WeatherService } from './weather.service';
import { UserdataService } from './userdata.service';
import { AuthGuard } from './auth.guard';

import {routing, routedComponents} from './app.routes';
import { AddComponent } from './dashboard/add/add.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCtgHfPbBh37bGoUIJoUHAVJhwaVLd4TNc',
  authDomain: 'saml-weather-6bc08.firebaseapp.com',
  databaseURL: 'https://saml-weather-6bc08.firebaseio.com',
  storageBucket: 'saml-weather-6bc08.appspot.com',
  messagingSenderId: '657490004994',
};

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }),
  ],
  providers: [
    AuthenticationService,
    UserdataService,
    GeolocationService,
    WeatherService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
