import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { freeSet } from '@coreui/icons';

interface ChartData {
  day: string;
  dataset: [string, string, string, string, string][];
  selected: boolean;
}

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss']
})
export class WidgetsDropdownComponent implements OnInit {
  chartDataArray: ChartData[] = [];
  selectedCharts: ChartData[] = [];
  formDataRes: any = {};
  pinpointForm: any = {}; // Changed type to object instead of an array
  icons = freeSet;

  constructor(private http: HttpClient) {}

  isPinpointFormVisible = false;

  ngOnInit(): void {
    // console.log('data');
  }

  togglePinpointFormVisibility(): void {
    this.isPinpointFormVisible = !this.isPinpointFormVisible;
  }

  handleFormSubmission(formData: any): void {
    this.fetchChartData(formData);
    this.formDataRes = formData;
  }

  fetchChartData(formData: any): void {
    this.http.post<ChartData[]>('http://127.0.0.1:8000/market_data', formData)
      .subscribe((data) => {
        console.log(data);
        this.chartDataArray = data.map((chart) => ({ ...chart, selected: false }));
        console.log(this.chartDataArray);
      });
  }

  toggleChartSelection(chart: ChartData): void {
    chart.selected = !chart.selected;
    this.updateSelectedCharts();
  }

  updateSelectedCharts(): void {
    this.selectedCharts = this.chartDataArray.filter((chart) => chart.selected);
    this.pinpointForm = {
      time_start: this.formDataRes.time_start,
      time_end: this.formDataRes.time_end,
      timeframe: this.formDataRes.timeframe,
      days: this.selectedCharts.map((chart) => chart.day)
    };
  }

  handlePinpointFormSubmission(formData: any): void {
    this.pinpointForm = {
      name: formData.pinpoint_name
    };
    console.log(formData)
  }
}
