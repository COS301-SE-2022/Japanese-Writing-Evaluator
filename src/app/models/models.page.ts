import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { AppServiceService } from '../services/appService/app-service.service';
import {  ModelsArray } from '../shared/interfaces/models';

@Component({
  selector: 'app-models',
  templateUrl: './models.page.html',
  styleUrls: ['./models.page.scss'],
})
export class ModelsPage implements OnInit {

  @ViewChild('hiraganaCharacterCanvas') private hiraganaCharacterCanvas: ElementRef;
  @ViewChild('hiraganaStrokeCanvas') private hiraganaStrokeCanvas: ElementRef;
  @ViewChild('katakanaCharacterCanvas') private katakanaCharacterCanvas: ElementRef;
  @ViewChild('katakanaStrokeCanvas') private katakanaStrokeCanvas: ElementRef;
  @ViewChild('kanjiCharacterCanvas') private kanjiCharacterCanvas: ElementRef;
  @ViewChild('kanjiStrokeCanvas') private kanjiStrokeCanvas: ElementRef;
  /*Creating all the pie chart components*/
  barGraph: any;

  characterModel: ModelsArray;
  accuracy: number[];
  loss: number[];
  chartLabels: string[] = [];


  constructor(private router: Router, private service: AppServiceService) { }

  ngOnInit() {
    this.service.adminModelData().subscribe(res =>{
      this.characterModel = res.body;
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


// function to create chart
  chartCreator(chartlabels: string[], accuracy: number[], loss: number[], canvas: ElementRef ){
    this.barGraph = new Chart(canvas.nativeElement,{
      type: 'bar',
      data:{
        labels: chartlabels,
        datasets: [
          {
            label: 'Model Accuracy',
            data: accuracy,
            backgroundColor: [
              'rgb(50,205,50,0.2)'
            ],
            borderColor: [
              'rgb(50,205,50)'
            ],
            borderWidth: 1,
          },
          {
            label: 'Model Loss',
            data: loss,
            backgroundColor: [
              'rgb(255,69,0,0.2)'
            ],
            borderColor: [
              'rgb(255,69,0)'
            ],
            borderWidth: 1,
          }
        ],
      },
      options:{
        responsive: true,
        scales: {
          yAxes:[{
            ticks: {
              min: 0,
              max: 100,
              stepSize: 10,
            }
          }],
        }
      }


    });
  }


// set all the chart data to the right writing style
  showHiraganaCharts(){
    //call chartCreator with corresponding writing style

    //character recognition
    this.characterModel.hiragana.characterRecognition.forEach(model =>{
      this.accuracy.push(model.accuracy);
      this.loss.push(model.loss);
      this.chartLabels.push(model.version);
    });

    this.chartCreator(this.chartLabels,this.accuracy,this.loss,this.hiraganaCharacterCanvas);

    //stroke recognition
    this.characterModel.hiragana.strokes.forEach(model =>{
      this.accuracy.push(model.accuracy);
      this.loss.push(model.loss);
      this.chartLabels.push(model.version);
    });

    this.chartCreator(this.chartLabels,this.accuracy,this.loss,this.hiraganaStrokeCanvas);

  }

  showKatakanaChart(){
    //call chartCreator with corresponding writing style

    //character recognition
    this.characterModel.katakana.characterRecognition.forEach(model =>{
      this.accuracy.push(model.accuracy);
      this.loss.push(model.loss);
      this.chartLabels.push(model.version);
    });

    this.chartCreator(this.chartLabels,this.accuracy,this.loss,this.katakanaCharacterCanvas);

    //stroke recognition
    this.characterModel.katakana.strokes.forEach(model =>{
      this.accuracy.push(model.accuracy);
      this.loss.push(model.loss);
      this.chartLabels.push(model.version);
    });

    this.chartCreator(this.chartLabels,this.accuracy,this.loss,this.katakanaStrokeCanvas);
  }

  showHKanjiChart(){
    //call chartCreator with corresponding writing style

    //character recognition
    this.characterModel.kanji.characterRecognition.forEach(model =>{
      this.accuracy.push(model.accuracy);
      this.loss.push(model.loss);
      this.chartLabels.push(model.version);
    });

    this.chartCreator(this.chartLabels,this.accuracy,this.loss,this.kanjiCharacterCanvas);

    //stroke recognition
    this.characterModel.kanji.strokes.forEach(model =>{
      this.accuracy.push(model.accuracy);
      this.loss.push(model.loss);
      this.chartLabels.push(model.version);
    });

    this.chartCreator(this.chartLabels,this.accuracy,this.loss,this.kanjiStrokeCanvas);
  }


}
