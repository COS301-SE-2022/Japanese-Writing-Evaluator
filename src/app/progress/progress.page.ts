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
  progressArray: {writing_style: string, url: string, character: string, score: string, upload_date: string}[];
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
    this.progressArray = [
      { "writing_style": "hiragana", "url": " ", "character": "A", "score": "25", "upload_date": "2022-07-19"  },
      { "writing_style": "hiragana", "url": " ", "character": "Ka", "score": "72", "upload_date": "2022-07-22"  },
      { "writing_style": "hiragana", "url": " ", "character": "Ha", "score": "11", "upload_date": "2022-08-10"  },
      { "writing_style": "kanji", "url": " ", "character": "two", "score": "36", "upload_date": "2022-08-22"  },
      { "writing_style": "katakana", "url": " ", "character": "A", "score": "98", "upload_date": "2022-08-30"  },
      { "writing_style": "hiragana", "url": " ", "character": "A", "score": "10", "upload_date": "2022-08-30"  },
      { "writing_style": "katakana", "url": " ", "character": "A", "score": "10", "upload_date": "2022-08-30"  },
    ];

    this.manipulateScores();



    this.map.set('A', 'A');
    this.map.set('I','I');
    this.map.set('U','U');
    this.map.set('E','E');
    this.map.set('O','O');
    this.map.set('Ka','Ka');
    this.map.set('Ki','Ki');
    this.map.set('Ku','Ku');
    this.map.set('Ke','Ke');
    this.map.set('Ko','Ko');
    this.map.set('Sa','Sa');
    this.map.set('Si','Si');
    this.map.set('Su','Su');
    this.map.set('Se','Se');
    this.map.set('So','So');
    this.map.set('Ta','Ta');
    this.map.set('Ti','Ti');
    this.map.set('Tu','Tu');
    this.map.set('Te','Te');
    this.map.set('To','To');
    this.map.set('Na','Na');
    this.map.set('Ni','Ni');
    this.map.set('Nu','Nu');
    this.map.set('Ne','Ne');
    this.map.set('No','No');
    this.map.set('Ha','Ha');
    this.map.set('Hi','Hi');
    this.map.set('Hu','Hu');
    this.map.set('He','He');
    this.map.set('Ho','Ho');
    this.map.set('Ma','Ma');
    this.map.set('Mi','Mi');
    this.map.set('Mu','Mu');
    this.map.set('Me','Me');
    this.map.set('Mo','Mo');
    this.map.set('Ya','Ya');
    this.map.set('Yu','Yu');
    this.map.set('Yo','Yo');
    this.map.set('Ra','Ra');
    this.map.set('Ri','Ri');
    this.map.set('Ru','Ru');
    this.map.set('Re','Re');
    this.map.set('Ro','Ro');
    this.map.set('Wa','Wa');
    this.map.set('Wi','Wi');
    this.map.set('We','We');
    this.map.set('Wo','Wo');
    this.map.set('Ga','Ga');
    this.map.set('Gi','Gi');
    this.map.set('Gu','Gu');
    this.map.set('Ge','Ge');
    this.map.set('Go','Go');
    this.map.set('Za','Za');
    this.map.set('Zi','Zi');
    this.map.set('Zu','Zu');
    this.map.set('Ze', 'Ze');
    this.map.set('Zo','Zo');
    this.map.set('Da','Da');
    this.map.set('Di','Di');
    this.map.set('Du','Du');
    this.map.set('De','De');
    this.map.set('Do','Do');
    this.map.set('Ba','Ba');
    this.map.set('Bi','Bi');
    this.map.set('Bu','Bu');
    this.map.set('Be','Be');
    this.map.set('Bo','Bo');
    this.map.set('Pa','Pa');
    this.map.set('Pi','Pi');
    this.map.set('Pu','Pu');
    this.map.set('Pe','Pe');
    this.map.set('Po','Po');
    this.map.set('one','one');
    this.map.set('two','two');
    this.map.set('three','three');
    this.map.set('four','four');
    this.map.set('five','five');
    this.map.set('six','six');
    this.map.set('seven','seven');
    this.map.set('eight','eight');
    this.map.set('nine','nine');
    this.map.set('ten','ten');
  }

  //calculating the averages from the score
  manipulateScores()
  {
    for (let i = 0; i < this.progressArray.length ; i++) {

      let keyString = "";
      keyString += this.progressArray[i].character + "_";
      keyString += this.progressArray[i].writing_style;

      if(this.progressSummary.has(keyString)){

        let scoreArray = Number(this.progressArray[i].score);
        let scoreMap = Number(this.progressSummary.get(keyString));

        scoreMap = (scoreArray+ scoreMap)/2;
        let scoreMapString = String(scoreMap);

        this.progressSummary.set(keyString, scoreMapString);
      }
      else
      {
        this.progressSummary.set(keyString, this.progressArray[i].score);
      }

    }
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

    if(index != -1)
    {
      index -= 1;
      while(index!= -1){

        letterString += letter[index];
        index -= 1;
      }
    }
    return letterString.split("").reverse().join("");
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
