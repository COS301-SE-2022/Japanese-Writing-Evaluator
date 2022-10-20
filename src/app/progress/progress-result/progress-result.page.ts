import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-progress-result',
  templateUrl: './progress-result.page.html',
  styleUrls: ['./progress-result.page.scss'],
})
export class ProgressResultPage implements OnInit {

  category: string;
  heading: string;
  currentStyle: Map<string, {score: string; date: string }[]>;

  progressArray: {writingStyle: string; url: string; character: string; score: string; uploadDate: string}[];
  object: { char: string; score: string; date: string };
  progressHiragana =  new Map<string, {score: string; date: string }[]> ();
  progressKatakana =  new Map<string, {score: string; date: string }[]> ();
  progressKanji =  new Map<string, {score: string; date: string }[]> ();
  writingStylesArray: string[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  //TODO: get category from the url, that data is sent in from options in shared folder, #183, Maryam Mohamad Al Mahdi
  ngOnInit() {

    this.category = this.route.snapshot.queryParamMap.get('category');
    this.heading = this.category;

    //testPurposes
    //also note the naming conventions are incorrect from the API so they need be changed
    this.writingStylesArray = [
    'hiragana', 'katakana', 'kanji'
    ];

    this.progressArray = [
      { writingStyle: 'hiragana', url: ' ', character: 'A', score: '25', uploadDate: '2022-07-19'  },
      { writingStyle: 'hiragana', url: ' ', character: 'A', score: '50', uploadDate: '2022-07-20'  },
      { writingStyle: 'hiragana', url: ' ', character: 'Ka', score: '72', uploadDate: '2022-07-22'  },
      { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '11', uploadDate: '2022-08-10'  },
      { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '22', uploadDate: '2022-08-12'  },
      { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '40', uploadDate: '2022-08-13'  },
      { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '67', uploadDate: '2022-08-14'  },
      { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '84', uploadDate: '2022-08-15'  },
      { writingStyle: 'kanji', url: ' ', character: 'two', score: '36', uploadDate: '2022-08-22'  },
      { writingStyle: 'kanji', url: ' ', character: 'two', score: '80', uploadDate: '2022-08-23'  },
      { writingStyle: 'kanji', url: ' ', character: 'one', score: '80', uploadDate: '2022-08-23'  },
      { writingStyle: 'kanji', url: ' ', character: 'three', score: '80', uploadDate: '2022-08-23'  },
      { writingStyle: 'katakana', url: ' ', character: 'A', score: '98', uploadDate: '2022-08-30'  },
      { writingStyle: 'hiragana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30'  },
      { writingStyle: 'katakana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30'  },
      { writingStyle: 'katakana', url: ' ', character: 'A', score: '88', uploadDate: '2022-09-15'  },
      { writingStyle: 'katakana', url: ' ', character: 'A', score: '70', uploadDate: '2022-09-18'  },
      { writingStyle: 'katakana', url: ' ', character: 'U', score: '60', uploadDate: '2022-09-18'  },
    ];


    this.manipulateScores();
  }
//TODO: calculating the averages from the score of the letters that were practised per writing style, #183, Maryam Mohamad Al Mahdi
  manipulateScores()
  {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.progressArray.length ; i++)
    {
      let scores: { score: string; date: string }[];
      let keyString = '';
      keyString += this.progressArray[i].character + '_';
      keyString += this.progressArray[i].writingStyle;

      if(this.progressHiragana.has(keyString)  && keyString.includes('hiragana')){

        const object = {
          score: this.progressArray[i].score,
          date: this.progressArray[i].uploadDate,
        };
        this.progressHiragana.get(keyString).push(object);
      }
      else if(keyString.includes('hiragana'))
      {
        const object = [{
          score: this.progressArray[i].score,
          date: this.progressArray[i].uploadDate,
        }];

        this.progressHiragana.set(keyString, object);
      }
      else if(this.progressKatakana.has(keyString) && keyString.includes('katakana')){

        const object = {
          score: this.progressArray[i].score,
          date: this.progressArray[i].uploadDate,
        };
        this.progressKatakana.get(keyString).push(object);
      }
      else if(keyString.includes('katakana')){
        const object = [{
          score: this.progressArray[i].score,
          date: this.progressArray[i].uploadDate,
        }];

        this.progressKatakana.set(keyString, object);
      }
      else if(this.progressKanji.has(keyString) && keyString.includes('kanji')){

        const object = {
          score: this.progressArray[i].score,
          date: this.progressArray[i].uploadDate,
        };
        this.progressKanji.get(keyString).push(object);
      }
      else if(keyString.includes('kanji'))
      {
        const object = [{
          score: this.progressArray[i].score,
          date: this.progressArray[i].uploadDate,
        }];

        this.progressKanji.set(keyString, object);
      }

    }

    this.setStyle();
  }

  //TODO: set the writing style based on the category variable, #183, Maryam Mohamad Al Mahdi
  setStyle(){
    if(this.category === 'Hiragana')
    {
      this.currentStyle = this.progressHiragana;
    }
    else if(this.category === 'Katakana')
    {
      this.currentStyle = this.progressKatakana;
    }
    else if(this.category === 'Kanji')
    {
      this.currentStyle = this.progressKanji;
    }

  }

  onLogout(){
    // this function logs the user out of the system
    localStorage.removeItem('id');
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);

  }


  //TODO: get the singely typed character based on the string feed in, #183, Maryam Mohamad Al Mahdi
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


  //TODO: get the writing style, #183, Maryam Mohamad Al Mahdi
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

  //TODO: get get the percentage of progress, #183, Maryam Mohamad Al Mahdi
  getPercent(objArray: {score: string; date: string }[]){

    let totalPercent = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < objArray.length; i++) {
      totalPercent+=Number(objArray[i].score);
    }
      return Math.round(totalPercent/objArray.length);
  }
  setHome(){
    this.router.navigate(['/home']);
  }

  setProgress(){
    this.router.navigate(['/progress']);
  }

}
