import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { getStyle } from '@coreui/utils';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {
  chartDataArray: { day: string, dataset: [string, number, number, number, number][] }[] = [];
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    
    this.chartDataArray = [
    ];
  }

  ngOnInit(): void {
    this.fetchChartData();
  }

  ngAfterContentInit(): void {
   

  }
  fetchChartData(): void {
    const requestData = {
      week_day: 0,
      time_start: '00:00:00',
      time_end: '00:10:00',
      date_range_start: '01-01-2020',
      date_range_end: '01-01-2023'
    };
  
    this.http.post<{ day: string, dataset: [string, number, number, number, number][] }[]>('http://127.0.0.1:8000/market_data', requestData)
      .subscribe((data) => {
        this.chartDataArray = data;
        this.changeDetectorRef.detectChanges(); // inform Angular to detect changes to the chartDataArray
      });
  }

}

