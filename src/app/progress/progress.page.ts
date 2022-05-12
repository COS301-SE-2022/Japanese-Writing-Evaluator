import { Component, OnInit } from '@angular/core';
//import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  char = '';
  percent = 0;

  constructor() { }

  ngOnInit() {
  }

  setDisplay(char: string, percent: number)
  {
    this.char = char;
    this.percent = percent;
  }

}
