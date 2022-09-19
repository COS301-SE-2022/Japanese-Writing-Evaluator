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

    // this.service.getProgress().subscribe(data => {
    //   //this.progressArray = data.body.response;

    // });

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


  // TODO: set the character and percentage, #73, Maryam Mohamad Al Mahdi
  setDisplay(char: string, percent: number){
    this.char = char;
    this.percent = percent;
  }
  // TODO: navigates to home page, #73, Maryam Mohamad Al Mahdi
  setHome(){
    this.router.navigate(['/home']);
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
