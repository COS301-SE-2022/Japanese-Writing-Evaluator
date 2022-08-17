import { Character } from './../shared/interfaces/character';
import { Score } from './../shared/interfaces/score';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Pipe, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';
import { UserProgress } from '../shared/interfaces/progress';
//import { AppServiceService } from '../services/app-service.service';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})


export class ProgressPage implements OnInit {

  //Data for progress
  progressArray: {writingStyle: string; url: string; character: string; score: string; uploadDate: string}[];
  scores: { char: string; score: string; date: string }[];
  progressSummary =  new Map<string, string> ();

  char = '';
  percent = 0;
  img: string;

  hiragana = 'hiragana';
  katakana = 'katakana';
  kanji = 'kanji';

  map = new Map();

  constructor(private router: Router, private service: AppServiceService) { }

  ngOnInit() {
    this.char = localStorage.getItem('char');
    this.percent = +localStorage.getItem('percentage');
    // this.service.getProgress().subscribe(data => {
    //   //this.progressArray = data.body.response;

    // });

    //testPurposes
    //also note the naming conventions are incorrect from the API so they need be changed
    this.progressArray = [
      { writingStyle: 'hiragana', url: ' ', character: 'A', score: '25', uploadDate: '2022-07-19'  },
      { writingStyle: 'hiragana', url: ' ', character: 'Ka', score: '72', uploadDate: '2022-07-22'  },
      { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '11', uploadDate: '2022-08-10'  },
      { writingStyle: 'kanji', url: ' ', character: 'two', score: '36', uploadDate: '2022-08-22'  },
      { writingStyle: 'katakana', url: ' ', character: 'A', score: '98', uploadDate: '2022-08-30'  },
      { writingStyle: 'hiragana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30'  },
      { writingStyle: 'katakana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30'  },
    ];

    this.manipulateScores();
  }

  //calculating the averages from the score
  manipulateScores()
  {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.progressArray.length ; i++) {

      let keyString = '';
      keyString += this.progressArray[i].character + '_';
      keyString += this.progressArray[i].writingStyle;

      if(this.progressSummary.has(keyString)){

        const scoreArray = Number(this.progressArray[i].score);
        let scoreMap = Number(this.progressSummary.get(keyString));

        scoreMap = (scoreArray+ scoreMap)/2;
        const scoreMapString = String(scoreMap);

        this.progressSummary.set(keyString, scoreMapString);
      }
      else
      {
        this.progressSummary.set(keyString, this.progressArray[i].score);
      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let j = 0; j < this.progressArray.length ; j++) {
          const object = {
            char: this.progressArray[j].character,
            score:  this.progressArray[j].score,
            date:  this.progressArray[j].uploadDate,
          };
          this.scores.push(object);
      }

    }
  }

  getMyScore(char: string)
  {
    let myScore: { char: string; score: string; date: string }[];

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let j = 0; j < this.scores.length ; j++){
        if(char === this.scores[j].char)
        {
            myScore.push(this.scores[j]);
        }
    }
    return myScore;
  }
  // TODO: set the character and percentage, #73, Maryam Mohamad Al Mahdi
  setDisplay(char: string, percent: number){
    this.char = char;
    this.percent = percent;
  }
  // TODO: navigates to home page, #73, Maryam Mohamad Al Mahdi
  setHome(){
    this.router.navigate(['/home']);
  }

  getLetter(letter: string){
    let letterString = '';
    let index = letter.indexOf('_');

    if(index !== -1)
    {
      index -= 1;
      while(index!== -1){

        letterString += letter[index];
        index -= 1;
      }
    }
    return letterString.split('').reverse().join('');
  }

  getStyle(writingStyle: string){

    if(writingStyle.includes('hiragana'))
    {
      console.log(writingStyle);
      return 'hiragana';
    }
    else if(writingStyle.includes('katakana'))
    {
      console.log(writingStyle);
      return 'katakana';
    }
    else
    {
      console.log(writingStyle);
      return 'kanji';
    }
  }

  getPercent(percent: string){
      return Number(percent);
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
