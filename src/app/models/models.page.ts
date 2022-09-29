import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { AppServiceService } from '../services/appService/app-service.service';
import {  ModelsArray } from '../shared/interfaces/models';
import { environment as env } from 'src/environments/environment';

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
  accuracy: number[] = [];
  loss: number[] = [];
  chartLabels: string[] = [];


  constructor(private router: Router, private service: AppServiceService) { }

  ngOnInit() {
    this.service.adminModelData().subscribe(res =>{
      this.characterModel = res.body;
      console.log(res.body);
    });

  }


// function to create chart
  chartCreator(chartlabels: string[], accuracy: number[], loss: number[], canvas: ElementRef ){
    console.log(accuracy);
    this.barGraph = new Chart(canvas.nativeElement,{
      type: 'bar',
      data:{
        labels: chartlabels,
        datasets: [
          {
            label: 'Model Accuracy',
            data: accuracy,
            backgroundColor: [
              'rgb(50,205,50,0.2)',
              'rgb(50,205,50,0.2)',
              'rgb(50,205,50,0.2)',
            ],
            borderColor: [
              'rgb(50,205,50)',
              'rgb(50,205,50)',
              'rgb(50,205,50)'
            ],
            borderWidth: 1,
          },
          {
            label: 'Model Loss',
            data: loss,
            backgroundColor: [
              'rgb(255,69,0,0.2)',
              'rgb(255,69,0,0.2)',
              'rgb(255,69,0,0.2)',
            ],
            borderColor: [
              'rgb(255,69,0)',
              'rgb(255,69,0)',
              'rgb(255,69,0)',
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
    let characcuracy: number[] = [];
    let charloss: number[]= [];
    let charchartLabels: string[] = [];
    //character recognition
    this.characterModel.data.hiragana.characterRecognition.forEach(model =>{
      characcuracy.push(Number(model.accuracy.substring(0,7)));
      charloss.push(Number(model.loss.substring(0,7)));
      charchartLabels.push(model.version);
    });

    this.chartCreator(charchartLabels,characcuracy,charloss,this.hiraganaCharacterCanvas);

    characcuracy = [];
    charloss = [];
    charchartLabels = [];
    //stroke recognition
    this.characterModel.data.hiragana.strokes.forEach(model =>{
      characcuracy.push(Number(model.accuracy.substring(0,7)));
      charloss.push(Number(model.loss.substring(0,7)));
      charchartLabels.push(model.version);
    });

    this.chartCreator(charchartLabels,characcuracy,charloss,this.hiraganaStrokeCanvas);

  }

  showKatakanaCharts(){
    //call chartCreator with corresponding writing style

    let characcuracy: number[] = [];
    let charloss: number[]= [];
    let charchartLabels: string[] = [];
    //character recognition
    this.characterModel.data.katakana.characterRecognition.forEach(model =>{
      characcuracy.push(Number(model.accuracy.substring(0,7)));
      charloss.push(Number(model.loss.substring(0,7)));
      charchartLabels.push(model.version);
    });

    this.chartCreator(charchartLabels,characcuracy,charloss,this.katakanaCharacterCanvas);

    characcuracy = [];
    charloss = [];
    charchartLabels = [];
    //stroke recognition
    this.characterModel.data.katakana.strokes.forEach(model =>{
      characcuracy.push(Number(model.accuracy.substring(0,7)));
      charloss.push(Number(model.loss.substring(0,7)));
      charchartLabels.push(model.version);
    });

    this.chartCreator(charchartLabels,characcuracy,charloss,this.katakanaStrokeCanvas);
  }

  showKanjiCharts(){
    //call chartCreator with corresponding writing style

    let characcuracy: number[] = [];
    let charloss: number[]= [];
    let charchartLabels: string[] = [];
    //character recognition
    this.characterModel.data.kanji.characterRecognition.forEach(model =>{
      characcuracy.push(Number(model.accuracy.substring(0,7)));
      charloss.push(Number(model.loss.substring(0,7)));
      charchartLabels.push(model.version);
    });

    this.chartCreator(charchartLabels,characcuracy,charloss,this.kanjiCharacterCanvas);

    characcuracy = [];
    charloss = [];
    charchartLabels = [];
    //stroke recognition
    this.characterModel.data.kanji.strokes.forEach(model =>{
      characcuracy.push(Number(model.accuracy.substring(0,7)));
      charloss.push(Number(model.loss.substring(0,7)));
      charchartLabels.push(model.version);
    });

    this.chartCreator(charchartLabels,characcuracy,charloss,this.kanjiStrokeCanvas);
  }

  ifNormalNavbar(): boolean{

    if (env.admin === true || env.superAdmin === true) {
      return false;
    }

    return true;
  }

  ifGuest(): boolean{
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('id') === 'guest') {
        return false;
      }
    }

    return true;
  }


}
