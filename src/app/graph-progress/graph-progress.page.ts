import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph-progress',
  templateUrl: './graph-progress.page.html',
  styleUrls: ['./graph-progress.page.scss'],
})
export class GraphProgressPage implements OnInit {
  bars: any;
  colorArray: any;

  constructor() { }
  // eslint-disable-next-line @typescript-eslint/member-ordering

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {}
}
