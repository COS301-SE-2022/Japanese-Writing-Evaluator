import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Models } from '../shared/interfaces/models';

@Component({
  selector: 'app-models',
  templateUrl: './models.page.html',
  styleUrls: ['./models.page.scss'],
})
export class ModelsPage implements OnInit {

  @ViewChild('pieCanvas') private pieCanvas: ElementRef;

  characterModel: Models[];
  pieChartData: number[];
  pieChartLabels: string[] = ['accuracy','loss'];


  constructor(private router: Router) { }

  ngOnInit() {
    this.characterModel = [{
      version: 'Character',
      date: new Date('2022-07-18'),
      accuracy: 90.44,
      loss: 39.84,
    }];
    this.pieChartData = []; // initializing the arrayso it isnt null
    this.characterModel.forEach(model =>{ // assigning data from api
      this.pieChartData.push(model.accuracy);
      this.pieChartData.push(model.loss);
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
