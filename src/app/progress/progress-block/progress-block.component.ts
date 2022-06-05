import { Character } from './../../shared/character';
import { Component, Input, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-progress-block',
  templateUrl: './progress-block.component.html',
  styleUrls: ['./progress-block.component.scss'],
})
export class ProgressBlockComponent implements OnInit {
  @Input() percent: number;
  @Input() letter: string;

  char: string;
  divStyle: string;
  styles: any;



  constructor() {
   }

  ngOnInit() {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.char = this.letter;
  }

  // document.getElementById('percentFill').style.strokeDashoffset = 'calc(440 - (440 *' + this.percent +') / 100)';

  setStyleCalc()
  {
    this.styles = {'stroke-dashoffset': 'calc(440 - (440 *' + this.percent +') / 100)'};
    return this.styles;
  }

}
