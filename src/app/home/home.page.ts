import { Component, OnInit } from '@angular/core';
import { CharacterImage, CharacterStyle } from '../shared/image';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  images: CharacterStyle[]; // listy of images from firebase
  groups: string[] =  ['vowels','k','t'];
  style: string;
  headingOne: string;

  vowelOne: string;
  vowelTwo: string;
  vowelThree: string;
  vowelFour: string;

  translateOne: string;
  translateTwo: string;
  translateThree: string;
  translateFour: string;

   hiraganaAlphabet = [
    {character: 'あ', translation:'A'},
    {character: 'い', translation:'I'},
    {character: 'う', translation:'U'},
    {character: 'え', translation:'E'},
  ];

  katakanaAlphabet = [
    {character: 'ア', translation:'A'},
    {character: 'イ', translation:'I'},
    {character: 'ウ', translation:'U'},
    {character: 'エ', translation:'E'},
  ];

  kanjiAlphabet = [
    {character: '黒', translation:'black'},
    {character: '青', translation:'blue'},
    {character: '緑', translation:'green'},
    {character: '橙', translation:'orange'},
  ];

  constructor(private service: AppServiceService, private router: Router) {
    this.style = 'Hiragana';
    this.headingOne = 'Vowels';

    this.vowelOne = this.hiraganaAlphabet[0].character;
    this.translateOne = this.hiraganaAlphabet[0].translation;

    this.vowelTwo = this.hiraganaAlphabet[1].character;
    this.translateTwo = this.hiraganaAlphabet[1].translation;

    this.vowelThree = this.hiraganaAlphabet[2].character;
    this.translateThree = this.hiraganaAlphabet[2].translation;

    this.vowelFour = this.hiraganaAlphabet[3].character;
    this.translateFour = this.hiraganaAlphabet[3].translation;
  }//private repository: AppServiceService



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

  ngOnInit(): void {
    this.service.getHomeImages().subscribe(data => {
      console.log(data);
      this.images = data;
    });
  }

  // getLetter(char: string)
  // {
  //   this.letter = char;
  //   return this.letter;
  // }

  // getTranslate(char: string)
  // {
  //   this.translate = char;
  //   return this.translate;
  // }

  onLogout(){
    // this function logs the user out of the system
    localStorage.removeItem('id');
    this.router.navigate(['/login']);

  }

  // TODO: routes to different pages depending on the selected writing style by the user, #73, Maryam Mohamad Al Mahdi
  writingStyle(style) {
    this.style = style;

    if(style === 'Hiragana'){
      this.navigateHome();}

    if(style === 'Katakana'){
      this.navigateKatakana();}

    if(style === 'Kanji'){
      this.navigateKanji();}


  }

  // TODO: routes to katakana page, #73, Maryam Mohamad Al Mahdi
  navigateKatakana(){
    this.headingOne = 'Vowels';

    this.vowelOne = this.katakanaAlphabet[0].character;
    this.translateOne = this.katakanaAlphabet[0].translation;

    this.vowelTwo = this.katakanaAlphabet[1].character;
    this.translateTwo = this.katakanaAlphabet[1].translation;

    this.vowelThree = this.katakanaAlphabet[2].character;
    this.translateThree = this.katakanaAlphabet[2].translation;

    this.vowelFour = this.katakanaAlphabet[3].character;
    this.translateFour = this.katakanaAlphabet[3].translation;

  }

  // TODO: routes to home page, #73, Maryam Mohamad Al Mahdi
  navigateHome(){
    this.headingOne = 'Vowels';

    this.vowelOne = this.hiraganaAlphabet[0].character;
    this.translateOne = this.hiraganaAlphabet[0].translation;

    this.vowelTwo = this.hiraganaAlphabet[1].character;
    this.translateTwo = this.hiraganaAlphabet[1].translation;

    this.vowelThree = this.hiraganaAlphabet[2].character;
    this.translateThree = this.hiraganaAlphabet[2].translation;

    this.vowelFour = this.hiraganaAlphabet[3].character;
    this.translateFour = this.hiraganaAlphabet[3].translation;
  }

  // TODO: routes to kanji page, #73, Maryam Mohamad Al Mahdi
  navigateKanji(){
    this.headingOne = 'Colours';

    this.vowelOne = this.kanjiAlphabet[0].character;
    this.translateOne = this.kanjiAlphabet[0].translation;

    this.vowelTwo = this.kanjiAlphabet[1].character;
    this.translateTwo = this.kanjiAlphabet[1].translation;

    this.vowelThree = this.kanjiAlphabet[2].character;
    this.translateThree = this.kanjiAlphabet[2].translation;

    this.vowelFour = this.kanjiAlphabet[3].character;
    this.translateFour = this.kanjiAlphabet[3].translation;
  }

}
