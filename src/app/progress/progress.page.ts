import { Component, ElementRef, Inject, OnInit, Pipe, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';



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
  ngOnInit(): void {
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
