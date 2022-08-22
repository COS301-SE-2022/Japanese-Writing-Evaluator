import { ModalController } from '@ionic/angular';
import { AfterViewInit, ElementRef, ViewChild, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-graph-modal',
  templateUrl: './graph-modal.page.html',
  styleUrls: ['./graph-modal.page.scss'],
})
export class GraphModalPage implements AfterViewInit {
  @Input() scores: { char: string; score: string; date: string }[] = [];
  @Input() letter: string;
  @Input() alphabetType: string;

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  lineChart: any;
  array: any;

  allScores: number[];
  allDates: string[];

  constructor(public modalController: ModalController) {
  }
  ngAfterViewInit(): void {
    this.getDateScores();
    this.lineChartMethod();
  }

  getDateScores(){
    this.allScores = [];
    this.allDates = [];

    let counter = 0;

    for(const count of this.scores){
        ++counter;
    }

    let limit = 0;
    const lengthArray = counter;
    if(lengthArray < 10)
      {
        limit = lengthArray;
      }
    else
      {
        limit = 10;
      }

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < limit ; i++) {
      this.allScores.push(Number(this.scores[i].score));
      this.allDates.push(this.scores[i].date);
    }
    console.log(this.allScores);
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.allDates,
        datasets: [
          {
            label: 'Accuracy of '+  this.letter,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#648981',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointStyle: 'rect',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 6,
            pointHitRadius: 10,
            data: this.allScores,
            spanGaps: false,
         },
        ]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 10,
                }
            }],
            xAxes: [{
              ticks: {
              },
              scaleLabel: {
                display: true,
                labelString: 'Last 10 Uploads'
            }

            }]
        }
    }
    });
  }


  close() {
    this.modalController.dismiss();
  }

}
