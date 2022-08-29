import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  list: string[];
  constructor() { }

  ngOnInit() {
    //list of the popover options
    this.list = ['edit privileges', 'view dashboard'];
  }

  popoverOption(item: string){

    if(item === this.list[0]){

    }
    if(item === this.list[1]){

    }

  }

}
