import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserdataService } from '../../../userdata.service';
import R from 'ramda';
import { Subscription } from 'rxjs';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  private lineChartLegend: boolean = true;
  private lineChartType: string = 'line';
  private lineChartData: Array<any> = [
    {data: new Array(24).fill(0), label: 'Apparent Temperatur'},
    {data: new Array(24).fill(0), label: 'Temperature'},
  ]; // Initial dummy data
  private lineChartLabels: Array<any> = this.generateLabels();
  private lineChartOptions: any = {responsive: true};
  private weatherSubscription$: Subscription;

  constructor(private user: UserdataService, private location: Location) {}

  ngOnInit(): void {
    this.weatherSubscription$ = this.user.weatherSource$.subscribe(
      (weather: any) => {
        if (weather) {
          console.log('GRAPH', weather);
          const {hourly} = weather;
          const day = R.take(24, hourly.data);
          const apparentTemperature = R.pluck('apparentTemperature')(day);
          const temperature = R.pluck('temperature')(day);
          this.lineChartData = [
            {data: apparentTemperature, label: 'Apparent Temperatur'},
            {data: temperature, label: 'Temperature'},
          ]; // Trigger angular by creating a new reference
        }
      },
      (error: Error) => console.error(error),
    );
  }

  ngOnDestroy(): void {
    this.weatherSubscription$.unsubscribe();
  }

  // [11.00,12.00,13.00,...]
  private generateLabels() {
    const now = moment().startOf('hour');
    const tomorrow = moment().add(1, 'days');
    const range = moment.range(now, tomorrow);
    const hours: any = Array.from(range.by('hours', {exclusive: true}));
    return hours.map(h => h.format('HH:mm'));
  }

  private toggleType() {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  private back() {
    this.location.back();
  }
}