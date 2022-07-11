import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';
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
   hiraganaAlphabet = [
    {character: 'あ', translation:'A'},
    {character: 'い', translation:'I'},
    {character: 'う', translation:'U'},
    {character: 'え', translation:'E'},
    {character: 'お', translation:'O'},
    {character: 'か', translation:'Ka'},
    {character: 'き', translation:'Ki'},
    {character: 'く', translation:'Ku'},
    {character: 'け', translation:'Ke'},
    {character: 'こ', translation:'Ko'},
    {character: 'さ', translation:'Sa'},
    {character: 'し', translation:'Si'},
    {character: 'す', translation:'Su'},
    {character: 'せ', translation:'Se'},
    {character: 'そ', translation:'So'},
    {character: 'た', translation:'Ta'},
    {character: 'ち', translation:'Ti'},
    {character: 'つ', translation:'Tu'},
    {character: 'て', translation:'Te'},
    {character: 'と', translation:'To'},
    {character: 'な', translation:'Na'},
    {character: 'に', translation:'Ni'},
    {character: 'ぬ', translation:'Nu'},
    {character: 'ね', translation:'Ne'},
    {character: 'の', translation:'No'},
    {character: 'は', translation:'Ha'},
    {character: 'ひ', translation:'Hi'},
    {character: 'ふ', translation:'Hu'},
    {character: 'へ', translation:'He'},
    {character: 'ほ', translation:'Ho'},
    {character: 'ま', translation:'Ma'},
    {character: 'み', translation:'Mi'},
    {character: 'む', translation:'Mu'},
    {character: 'め', translation:'Me'},
    {character: 'も', translation:'Mo'},
    {character: 'や', translation:'Ya'},
    {character: 'ゆ', translation:'Yu'},
    {character: 'よ', translation:'Yo'},
    {character: 'ら', translation:'Ra'},
    {character: 'り', translation:'Ri'},
    {character: 'る', translation:'Ru'},
    {character: 'れ', translation:'Re'},
    {character: 'ろ', translation:'Ro'},
    {character: 'わ', translation:'Wa'},
    {character: 'ゐ', translation:'Wi'},
    {character: 'ゑ', translation:'We'},
    {character: 'を', translation:'Wo'},
    {character: 'が', translation:'Ga'},
    {character: 'ぎ', translation:'Gi'},
    {character: 'ぐ', translation:'Gu'},
    {character: 'げ', translation:'Ge'},
    {character: 'ご', translation:'Go'},
    {character: 'ざ', translation:'Za'},
    {character: 'じ', translation:'Zi'},
    {character: 'ず', translation:'Zu'},
    {character: 'ぜ', translation:'Ze'},
    {character: 'ぞ', translation:'Zo'},
    {character: 'だ', translation:'Da'},
    {character: 'ぢ', translation:'Di'},
    {character: 'づ', translation:'Du'},
    {character: 'で', translation:'De'},
    {character: 'ど', translation:'Do'},
    {character: 'ば', translation:'Ba'},
    {character: 'び', translation:'Bi'},
    {character: 'ぶ', translation:'Bu'},
    {character: 'べ', translation:'Be'},
    {character: 'ぼ', translation:'Bo'},
    {character: 'ぱ', translation:'Pa'},
    {character: 'ぴ', translation:'Pi'},
    {character: 'ぷ', translation:'Pu'},
    {character: 'ぺ', translation:'Pe'},
    {character: 'ぽ', translation:'Po'},
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

    this.currentAlphabet = this.hiraganaAlphabet;
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
    // this.service.getHomeImages().subscribe(data => {
    //   console.log(data);
    // });
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

    this.currentAlphabet = this.katakanaAlphabet;

  }

  // TODO: components are dynamically updated for hiragana, #73, Maryam Mohamad Al Mahdi
  navigateHome(){
    this.headingOne = 'Vowels';

    this.currentAlphabet = this.hiraganaAlphabet;
  }

  // TODO: components are dynamically updated for kanji, #73, Maryam Mohamad Al Mahdi
  navigateKanji(){
    this.headingOne = 'Colours';

    this.currentAlphabet = this.kanjiAlphabet;
  }

}
