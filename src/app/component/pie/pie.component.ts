import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { ILocalArea } from '../../AreaInterface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponent implements OnInit {
  localAreas: ILocalArea[] = [];
  backgroundColorRandom: string[] = [];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColor: any = [
    {
      backgroundColor: this.backgroundColorRandom,
    },
  ];

  constructor(private dataService: DataService) {
    for (let j = 0; j < 60; j++) {
      const rgb1: number = Math.ceil(Math.random() * 256);
      const rgb2: number = Math.ceil(Math.random() * 256);
      const rgb3: number = Math.ceil(Math.random() * 256);
      let arr =
        'rgb(' +
        rgb1.toString() +
        ',' +
        rgb2.toString() +
        ',' +
        rgb3.toString() +
        ')';
      this.backgroundColorRandom.push(arr);
    }
  }

  ngOnInit(): void {
    this.dataService.getAreas().subscribe((areas) => (this.localAreas = areas));
    console.log(this.localAreas.length);
    this.dataService.getAreas().subscribe((data) => {
      //this.pieChartData = data as any[];
      for (let index = 0; index < data.length; index++) {
        if (parseInt(data[index].active) > 300) {
          this.pieChartLabels.push(data[index].LGA);
          this.pieChartData.push(parseInt(data[index].active));
        }
      }
    });
  }
}
