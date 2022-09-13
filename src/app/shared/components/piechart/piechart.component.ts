import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss'],
})
export class PiechartComponent implements AfterViewInit {
  //TODO: Creating a piechart component, #207, Phumudzo Ndou
  @Input() data: number[];
  @Input() labels: string[];

  @ViewChild('pieCanvas') private pieCanvas: ElementRef;

  /*Creating all the pie chart components*/
  pieChart: any;



  constructor() { }

  ngAfterViewInit(): void {
    this.pieChartCreator();
  }

  pieChartCreator(){
    this.pieChart = new Chart(this.pieCanvas.nativeElement,{
      type: 'doughnut',
      data:{
          labels: this.labels,
          datasets:[{
            label: 'blue',
            data: this.data
          }] ,
      }
    });
  }

}
