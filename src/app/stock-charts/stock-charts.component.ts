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
  @Input() chartData: { day: string, dataset: [string, number, number, number, number][] } = {
    "day": "01.03.2022",
    "dataset": [
      [
        "00:00:00.000",
        33892.721,
        33891.251,
        33888.221,
        33894.251
      ],
      [
        "00:01:00.000",
        33891.241,
        33889.721,
        33885.741,
        33891.241
      ],
      [
        "00:02:00.000",
        33889.271,
        33893.271,
        33888.261,
        33893.301
      ],
      [
        "00:03:00.000",
        33892.221,
        33892.001,
        33889.761,
        33893.261
      ],
      [
        "00:04:00.000",
        33891.281,
        33890.501,
        33889.731,
        33892.291
      ],
      [
        "00:05:00.000",
        33891.001,
        33892.251,
        33890.001,
        33892.301
      ],
      [
        "00:06:00.000",
        33892.801,
        33890.741,
        33889.721,
        33893.291
      ],
      [
        "00:07:00.000",
        33890.231,
        33874.701,
        33874.701,
        33891.291
      ],
      [
        "00:08:00.000",
        33875.211,
        33866.211,
        33863.001,
        33875.791
      ],
      [
        "00:09:00.000",
        33867.501,
        33874.201,
        33867.211,
        33878.771
      ],
      [
        "00:10:00.000",
        33870.231,
        33872.771,
        33867.211,
        33873.291
      ]
    ]
  };

  @ViewChildren('candlestickChart') chartElements!: QueryList<any>;

  ngAfterViewInit() {
    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';

    // Each item: open，close，lowest，highest
    const data0 = splitData(this.chartData["dataset"]);

    function splitData(rawData: (number | string)[][]) {
      const categoryData = [];
      const values = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
      }
      return {
        categoryData: categoryData,
        values: values
      };
    }

    console.log("init")
    // this.chartElements.changes.subscribe(() => {
    this.chartElements.toArray().forEach((chartElement) => {
      const chartInstance = echarts.init(chartElement.nativeElement);
      console.log("init")

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
