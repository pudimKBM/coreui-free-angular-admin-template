import { Component, ViewChildren, QueryList, AfterViewInit, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-stock-charts',
  templateUrl: 'stock-charts.component.html',
  styles: [
    `
      .chart {
        height: 300px;
       
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class StockChartsComponent implements AfterViewInit {
  @Input() chartData: { day: string, dataset: [string, string, string, string, string][] } = {
    "day": "01.03.2022",
    "dataset": [
     
    ]
  };

  @ViewChildren('candlestickChart') chartElements!: QueryList<any>;

  ngAfterViewInit() {
    const upColor = '#00da3c';
    const upBorderColor = '#008F28';
    const downColor = '#ec0000';
    const downBorderColor = '#8A0000';

    // Each item: open，close，lowest，highest
    const data0 = splitData(this.chartData["dataset"]);

    function splitData(rawData: (number | string)[][]) {
      const categoryData = [];
      const values = [];
    
      if (!rawData || rawData.length === 0) {
        return {
          categoryData: [],
          values: []
        };
      }
    
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
      }
    
      return {
        categoryData: categoryData,
        values: values
      };
    }

    // console.log(data0)
    // this.chartElements.changes.subscribe(() => {
    this.chartElements.toArray().forEach((chartElement) => {
      const chartInstance = echarts.init(chartElement.nativeElement);
      // console.log("init")

      // Set up chart options and data here...
      const option = {
        title: {
          text: this.chartData.day,
          left: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: data0.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: this.chartData.day,
            type: 'candlestick',
            data: data0.values,
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor
            }

          }
        ]
      };

      chartInstance.setOption(option);
    });
    // });
  }
}
