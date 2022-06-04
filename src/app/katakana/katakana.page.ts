import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-katakana',
  templateUrl: './katakana.page.html',
  styleUrls: ['./katakana.page.scss'],
})
export class KatakanaPage implements OnInit {

  style: string;

  constructor(private router: Router) {
    this.style = 'Katakana';
   }

  ngOnInit() {
  }

  onLogout(){
    // this function logs the user out of the system
    localStorage.removeItem('id');
    this.router.navigate(['/login']);

  }

  setProgress(){
    this.router.navigate(['/progress']);
  }

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
    this.router.navigate(['/katakana']);
  }

  // TODO: routes to home page, #73, Maryam Mohamad Al Mahdi
  navigateHome(){
    this.router.navigate(['/home']);
  }

  // TODO: routes to kanji page, #73, Maryam Mohamad Al Mahdi
  navigateKanji(){
    this.router.navigate(['/kanji']);
  }

}
