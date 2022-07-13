import { element } from 'protractor';
import { Character } from '../../shared/interfaces/character';
import { Component, Input, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-progress-block',
  templateUrl: './progress-block.component.html',
  styleUrls: ['./progress-block.component.scss'],
})
export class ProgressBlockComponent implements OnInit {
  @Input() percent: number;
  @Input() letter: string;
  @Input() alphabetType: string;

  japaneseLetter: string;
  translation: string;
  divStyle: string;
  styles: any;

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
    {character: '一', translation:'one'},
    {character: '二', translation:'two'},
    {character: '三', translation:'three'},
    {character: '四', translation:'four'},
    {character: '五', translation:'five'},
    {character: '六', translation:'six'},
    {character: '七', translation:'seven'},
    {character: '八', translation:'eight'},
    {character: '九', translation:'nine'},
    {character: '十', translation:'ten'},
  ];
  constructor() {
   }

  ngOnInit() {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterContentInit(): void {
    this.setAlphabet(this.letter, this.alphabetType);
  }
  // TODO: dynamically set the progress percentage, #69, Maryam Mohamad Al Mahdi
  setStyleCalc(){
    this.styles = {'stroke-dashoffset': 'calc(440 - (440 *' + this.percent +') / 100)'};
    return this.styles;
  }
  // TODO: dynamically set the letter, #69, Maryam Mohamad Al Mahdi
  setAlphabet(letter: string, alphabetType: string){

    // eslint-disable-next-line @typescript-eslint/no-shadow
    let element = this.hiraganaAlphabet.find((obj) => obj.translation === letter);

    if(alphabetType === 'hiragana'){
      //no change
    }
    if(alphabetType === 'katakana'){
      element = this.katakanaAlphabet.find((obj) => obj.translation === letter);
    }
    if(alphabetType === 'kanji'){
      element = this.kanjiAlphabet.find((obj) => obj.translation === letter);
    }
      this.japaneseLetter= element.character;
      this.translation = element.translation;

  }

}
