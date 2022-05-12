import { Component, OnInit } from '@angular/core';

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

  htmlToAdd = '<div class="two">two</div>';

  constructor() { }

  ngOnInit() {
  }

  setDisplay(char: string, percent: number)
  {
    this.char = char;
    this.percent = percent;
    this.setValue();
  }

  setValue()
  {
    this.display = true;
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

  }

}
