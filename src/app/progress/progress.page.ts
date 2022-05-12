import { Component, OnInit } from '@angular/core';
//import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  char = '';
  percent = 0;

  img = '';
  display = false;

  htmlToAdd = '';

  constructor() { }

  ngOnInit() {
  }

  setDisplay(char: string, percent: number)
  {
    alert('Called' + char + ''  + percent);
    this.char = char;
    this.percent = percent;
    this.setValue();
  }

  setValue()
  {
    if(this.char === 'a')
    {
      // eslint-disable-next-line max-len
      this.img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Hiragana_letter_small_A.svg/1200px-Hiragana_letter_small_A.svg.png';
    }
    else if(this.char === 'e')
    {
      // eslint-disable-next-line max-len
      this.img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Hiragana_letter_small_E.svg/800px-Hiragana_letter_small_E.svg.png';
    }
    else if(this.char === 'i')
    {
      this.img = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Japanese_Hiragana_kyokashotai_small_I.png';
    }
    else if(this.char === 'u')
    {
      // eslint-disable-next-line max-len
      this.img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Japanese_Hiragana_kyokashotai_U.svg/1200px-Japanese_Hiragana_kyokashotai_U.svg.png';
    }
  this.display = true;
    this.htmlToAdd = '<ion-card [style.display]="'+ this.display+ '">'+
  '<ion-card-header>'+
      '<ion-card-title>Character: '+ this.char +'</ion-card-title>'+
    '</ion-card-header>'+
    '<ion-card-content>'+
    '<ion-grid>'+
      '<ion-row>'+
        '<ion-col size="3">'+
          '<ion-avatar>'+
            '<img src='+this.img+'>'+
          '</ion-avatar>'+
          '</ion-col>'+
          '<ion-col size="9">'+
            '<div class="bar">'+
              '<ion-progress-bar color="primary" value='+this.percent+'></ion-progress-bar>'+
          '</div>'+
          '</ion-col>'+
        '</ion-row>'+
      '</ion-grid>'+
    '</ion-card-content>'+
  '</ion-card>';

  }

}