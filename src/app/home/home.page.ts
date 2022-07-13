import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';
import character_sets from '../shared/character_data/character_sets.json';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //images: CharacterStyle[]; // listy of images from firebase
  groups: string[] =  ['vowels','k','t'];
  style: string;
  headingOne: string;

  currentAlphabet: { character: string; translation: string}[];


  constructor(private service: AppServiceService, private router: Router) {
    this.style = 'Hiragana';
    this.headingOne = 'Vowels';

    this.currentAlphabet = character_sets.hiragana;//this.hiraganaAlphabet;
    console.log();
  }//private repository: AppServiceService  ;



  //TODO: check local storage to check if user is guest, #, Phumu
  ifGuest(): boolean{
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('id') === 'guest') {
        console.log(localStorage.getItem('id'));
        return true;
      }
    }

    return false;
  }

  ngOnInit(): void {}

  onLogout(){
    // this function logs the user out of the system
    localStorage.removeItem('id');
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);

  }

  // TODO: the page components are dynamically updated based on the writing style selected by the used , #73, Maryam Mohamad Al Mahdi
  writingStyle(style) {
    this.style = style;

    if(style === 'Hiragana'){
      this.navigateHome();}

    if(style === 'Katakana'){
      this.navigateKatakana();}

    if(style === 'Kanji'){
      this.navigateKanji();}


  }

  // TODO: components are dynamically updated for katakana, #73, Maryam Mohamad Al Mahdi
  navigateKatakana(){
    this.headingOne = 'Vowels';

    this.currentAlphabet = character_sets.katakana;

  }

  // TODO: components are dynamically updated for hiragana, #73, Maryam Mohamad Al Mahdi
  navigateHome(){
    this.headingOne = 'Vowels';

    this.currentAlphabet = character_sets.hiragana;
  }

  // TODO: components are dynamically updated for kanji, #73, Maryam Mohamad Al Mahdi
  navigateKanji(){
    this.headingOne = 'Numbers';

    this.currentAlphabet = character_sets.kanji;
  }

}
