import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;
  n: any;
  dataForAvg: any;

  constructor(private router: Router) {
    //   this.dataForAvg = {
    //     response: [
    //         {
    //             2022: {
    //                 '07': {
    //                     hiragana: {
    //                         averageScore: 49.142857142857146
    //                     }
    //                 },
    //                 '08': {
    //                     hiragana: {
    //                         averageScore: 33.25
    //                     }
    //                 },
    //                 '09': {
    //                     hiragana: {
    //                         averageScore: 51.0
    //                     }
    //                 }
    //             }
    //         }
    //     ]
    //  };

    // this.n = this.dataForAvg.response[0][2022]['10'];
    // console.log(this.n);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(): void {
    this.frequencyOfVisits();
  }

  ngOnInit() {}

  //TODO: send data required to lineChartMethod for frequency of visits, #183, Maryam Mohamad Al Mahdi
  frequencyOfVisits(){
    this.lineChartMethod('Frequency of Uploads', [1, 54, 93, 67, 31, 50, 74, 48, 82, 70, 56, 27]);
  }

  //TODO: send data required to lineChartMethod for the average of hiragana, #183, Maryam Mohamad Al Mahdi
  averageHiragana(){
    this.lineChartMethod('Average of Hiragana', [3, 9, 45, 30, 21, 49, 72, 36, 54, 57, 83, 92]);
  }

  //TODO: send data required to lineChartMethod for the average of katakana, #183, Maryam Mohamad Al Mahdi
  averageKatakana(){
    this.lineChartMethod('Average of Katakana', [5, 26, 29, 37, 64, 78, 99, 55, 82, 61, 10, 21]);
  }

  //TODO: send data required to lineChartMethod for the average of kanji, #183, Maryam Mohamad Al Mahdi
  averageKanji(){
    this.lineChartMethod('Average of Kanji', [4, 6, 9, 11, 22, 21, 18, 27, 26, 15, 70, 86]);
  }

  //TODO: form the chart using chartjs for frequency and averages of the writing style, #183, Maryam Mohamad Al Mahdi
  lineChartMethod(title, percentage) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: title,
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
            data: percentage,
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
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Percentage'
              }
            }],
            xAxes: [{
              ticks: {
              },
              scaleLabel: {
                display: true,
                labelString: 'Months'
            }

            }]

        }
    }
    });
  }

  onLogout(){
    // this function logs the user out of the system
    localStorage.removeItem('id');
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

}
