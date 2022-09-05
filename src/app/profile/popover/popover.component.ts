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
    this.list = ['edit privileges'];
  }

  //TODO: Navigate to the appropriate page based on which popover function was selected, #203, Maryam
  popoverOption(item: string){

    if(item === this.list[0]){

    }
  }

}
