import { Progress } from './../shared/interfaces/progress';
import { Character } from './../shared/interfaces/character';
import { Score } from './../shared/interfaces/score';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Pipe, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppServiceService } from '../services/appService/app-service.service';
import { UserProgress } from '../shared/interfaces/progress';
//import { AppServiceService } from '../services/app-service.service';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})


export class ProgressPage implements OnInit {

  //Data for progress

  progressArray: UserProgress[];
 // object: { char: string; score: string; date: string };

  progressHiragana =  new Map<string, {score: number; date: string }[]> ();
  progressKatakana =  new Map<string, {score: number; date: string }[]> ();
  progressKanji =  new Map<string, {score: number; date: string }[]> ();
  writingStylesArray: string[];

  alphabetCategory = [
    {character: 'あ', category: 'Hiragana'},
    {character: 'ア', category: 'Katakana'},
    {character: '一', category: 'Kanji'}
  ];

  pageRequest = 'progress';

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

    this.service.getProgress().subscribe(data => {
      this.progressArray = data.body.response;
      console.log(data);
    });

    //testPurposes
    //also note the naming conventions are incorrect from the API so they need be changed
    this.writingStylesArray = [
    'hiragana', 'katakana', 'kanji'
    ];

    // this.progressArray = [
    //   { writing_style: 'hiragana', url: ' ', character: 'A', score: '25', uploadDate: '2022-07-19'  },
    //   { writing_style: 'hiragana', url: ' ', character: 'A', score: '50', uploadDate: '2022-07-20'  },
    //   { writing_style: 'hiragana', url: ' ', character: 'Ka', score: '72', uploadDate: '2022-07-22'  },
    //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '11', uploadDate: '2022-08-10'  },
    //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '22', uploadDate: '2022-08-12'  },
    //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '40', uploadDate: '2022-08-13'  },
    //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '67', uploadDate: '2022-08-14'  },
    //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '84', uploadDate: '2022-08-15'  },
    //   { writing_style: 'kanji', url: ' ', character: 'two', score: '36', uploadDate: '2022-08-22'  },
    //   { writing_style: 'kanji', url: ' ', character: 'two', score: '80', uploadDate: '2022-08-23'  },
    //   { writing_style: 'kanji', url: ' ', character: 'one', score: '80', uploadDate: '2022-08-23'  },
    //   { writing_style: 'kanji', url: ' ', character: 'three', score: '80', uploadDate: '2022-08-23'  },
    //   { writing_style: 'katakana', url: ' ', character: 'A', score: '98', uploadDate: '2022-08-30'  },
    //   { writing_style: 'hiragana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30'  },
    //   { writing_style: 'katakana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30'  },
    //   { writing_style: 'katakana', url: ' ', character: 'A', score: '88', uploadDate: '2022-09-15'  },
    //   { writing_style: 'katakana', url: ' ', character: 'A', score: '70', uploadDate: '2022-09-18'  },
    //   { writing_style: 'katakana', url: ' ', character: 'U', score: '60', uploadDate: '2022-09-18'  },
    // ];


    this.manipulateScores();
  }

  //calculating the averages from the score
  manipulateScores()
  {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.progressArray.length ; i++)
    {
      //let scores: { score: string; date: string }[];
      let keyString = '';
      keyString += this.progressArray[i].character + '_';
      keyString += this.progressArray[i].writing_Style;

      if(this.progressHiragana.has(keyString)  && keyString.includes('hiragana')){

        const object = {
          score: this.progressArray[i].score,
          date: this.progressArray[i].upload_Date,
        };
        this.progressHiragana.get(keyString).push(object);
      }
      else if(keyString.includes('hiragana'))
      {
        const object = [{
          score: this.progressArray[i].score,
          date: this.progressArray[i].upload_Date,
        }];

        this.progressHiragana.set(keyString, object);
      }
      else if(this.progressKatakana.has(keyString) && keyString.includes('katakana')){

        const object = {
          score: this.progressArray[i].score,
          date: this.progressArray[i].upload_Date,
        };
        this.progressKatakana.get(keyString).push(object);
      }
      else if(keyString.includes('katakana')){
        const object = [{
          score: this.progressArray[i].score,
          date: this.progressArray[i].upload_Date,
        }];

        this.progressKatakana.set(keyString, object);
      }
      else if(this.progressKanji.has(keyString) && keyString.includes('kanji')){

        const object = {
          score: this.progressArray[i].score,
          date: this.progressArray[i].upload_Date,
        };
        this.progressKanji.get(keyString).push(object);
      }
      else if(keyString.includes('kanji'))
      {
        const object = [{
          score: this.progressArray[i].score,
          date: this.progressArray[i].upload_Date,
        }];

        this.progressKanji.set(keyString, object);
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
      return 'hiragana';
    }
    else if(writingStyle.includes('katakana'))
    {
      return 'katakana';
    }
    else
    {
      return 'kanji';
    }
  }

  getPercent(objArray: {score: string; date: string }[]){

    let totalPercent = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < objArray.length; i++) {
      totalPercent+=Number(objArray[i].score);
    }
      return Math.round(totalPercent/objArray.length);
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
