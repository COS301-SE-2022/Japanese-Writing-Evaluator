import { Character } from './../../shared/character';
import { Component, Input, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-progress-block',
  templateUrl: './progress-block.component.html',
  styleUrls: ['./progress-block.component.scss'],
})
export class ProgressBlockComponent implements OnInit {
  @Input() percent: number;
  @Input() letter: number;

  japaneseLetter: string;
  translation: string;
  divStyle: string;
  styles: any;

  alphabet: string[] = ['あ', 'い', 'う', 'え', 'お'];

  constructor() {
   }

  ngOnInit() {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterContentInit(): void {
    this.setAlphabet(this.letter);
  }
  // TODO: dynamically set the progress percentage, #69, Maryam Mohamad Al Mahdi
  setStyleCalc(){
    this.styles = {'stroke-dashoffset': 'calc(440 - (440 *' + this.percent +') / 100)'};
    return this.styles;
  }
  // TODO: dynamically set the letter, #69, Maryam Mohamad Al Mahdi
  setAlphabet(letter: number){
    if(letter === 1){
      this.japaneseLetter = this.alphabet[0];
      this.translation = 'A';
    }
    if(letter === 2){
      this.japaneseLetter = this.alphabet[1];
      this.translation = 'I';
    }
    if(letter === 3){
      this.japaneseLetter = this.alphabet[2];
      this.translation = 'U';
    }
    if(letter === 4){
      this.japaneseLetter = this.alphabet[3];
      this.translation = 'E';
    }
    if(letter === 5){
      this.japaneseLetter = this.alphabet[4];
      this.translation = 'O';
    }
  }

}
