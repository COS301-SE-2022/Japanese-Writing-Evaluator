import { ModalController } from '@ionic/angular';
import { AfterViewInit, ElementRef, ViewChild , Component} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph-modal',
  templateUrl: './graph-modal.page.html',
  styleUrls: ['./graph-modal.page.scss'],
})
export class GraphModalPage implements AfterViewInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  lineChart: any;
  array: any;

  constructor(public modalController: ModalController) {
    this.array = [80, 60, 23, 95, 34, 10];
  }
  ngAfterViewInit(): void {
    this.lineChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Last ',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'black',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }


  close() {
    this.modalController.dismiss();
  }

}
