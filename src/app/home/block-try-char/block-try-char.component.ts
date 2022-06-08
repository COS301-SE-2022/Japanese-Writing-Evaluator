import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-block-try-char',
  templateUrl: './block-try-char.component.html',
  styleUrls: ['./block-try-char.component.scss'],
})
export class BlockTryCharComponent implements OnInit {

  @Input() letter: string;
  @Input() translate: string;
  constructor() { }

  ngOnInit() {}

}
