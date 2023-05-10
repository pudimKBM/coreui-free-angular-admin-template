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
  // changeDetection: ChangeDetectionStrategy.Default
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
    console.log("data")
    
  }

  ngAfterContentInit(): void {
    // this.fetchChartData();

  }

  handleFormSubmission(formData: any) {
    // Perform actions with the submitted form data
    this.fetchChartData(formData);
    console.log(formData);
    // Trigger any desired actions or update parent component's state
  }
  
  fetchChartData(formData: any): void {
    this.http.post<{ day: string, dataset: [string, number, number, number, number][] }[]>('http://127.0.0.1:8000/market_data', formData)
      .subscribe((data) => {
        this.chartDataArray = data;
        this.changeDetectorRef.detectChanges(); // inform Angular to detect changes to the chartDataArray
      });
  }

}

