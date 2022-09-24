import { Component, ElementRef, Inject, OnInit, Pipe, Renderer2, ViewChild } from '@angular/core';
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
   object: { char: string; score: string; date: string };
   progressHiragana =  new Map<string, {score: number; date: string }[]> ();
   progressKatakana =  new Map<string, {score: number; date: string }[]> ();
   progressKanji =  new Map<string, {score: number; date: string }[]> ();
   writingStylesArray: string[];

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
//     this.char = localStorage.getItem('char');
//     this.percent = +localStorage.getItem('percentage');

       this.service.getProgress().subscribe(data => {
       this.progressArray = data.body.response;
       this.manipulateScores();
     });

//     //testPurposes
//     //also note the naming conventions are incorrect from the API so they need be changed
     this.writingStylesArray = [
     'hiragana', 'katakana', 'kanji'
     ];

  }
  
  manipulateScores() {
//       // eslint-disable-next-line @typescript-eslint/prefer-for-of
//       this.progressArray.forEach(progress => {
//         let keyString = '';
//         keyString += progress.character + '_';
//         keyString += progress.writing_style;

//         if(this.progressHiragana.has(keyString)  && keyString.includes('hiragana')){

//           const object = {
//             score: progress.score,
//             date: progress.uploadDate,
//           };
//           this.progressHiragana.get(keyString).push(object);
//         }
//         else if(keyString.includes('hiragana'))
//         {
//           const object = [{
//             score: progress.score,
//             date: progress.uploadDate,
//           }];

//           this.progressHiragana.set(keyString, object);
//         }
//         else if(this.progressKatakana.has(keyString) && keyString.includes('katakana')){

//           const object = {
//             score: progress.score,
//             date: progress.uploadDate,
//           };
//           this.progressKatakana.get(keyString).push(object);
//         }
//         else if(keyString.includes('katakana')){
//           const object = [{
//             score: progress.score,
//             date: progress.uploadDate,
//           }];

//           this.progressKatakana.set(keyString, object);
//         }
//         else if(this.progressKanji.has(keyString) && keyString.includes('kanji')){

//           const object = {
//             score: progress.score,
//             date: progress.uploadDate,
//           };
//           this.progressKanji.get(keyString).push(object);
//         }
//         else if(keyString.includes('kanji'))
//         {
//           const object = [{
//             score: progress.score,
//             date: progress.uploadDate,
//           }];

//           this.progressKanji.set(keyString, object);
//         }

//       });

//       this.service.setProgressHiragana(this.progressHiragana);
//       this.service.setProgressKatakana(this.progressKatakana);
//       this.service.setProgressKanji(this.progressKanji);
//     }
   }

    // TODO: set the character and percentage, #73, Maryam Mohamad Al Mahdi
    setDisplay(character: string, percent: number){
      this.char = character;
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

  ifGuest(): boolean{
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('id') === 'guest') {
        return true;
      }
    }

    return false;
  }

}

