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
  chartDataArray: { id: number; }[] = [];
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    
    this.chartDataArray = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 }
    ];
  }

  ngOnInit(): void {
    this.fetchChartData();
  }

  ngAfterContentInit(): void {
   

  }
  fetchChartData(): void {
    this.http.get<{ id: number }[]>('https://your-api-url.com/data')
      .subscribe((data) => {
        this.chartDataArray = data;
        this.changeDetectorRef.detectChanges(); // inform Angular to detect changes to the chartDataArray
      });
  }

}

