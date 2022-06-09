import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-block-try-char',
  templateUrl: './block-try-char.component.html',
  styleUrls: ['./block-try-char.component.scss'],
})
export class BlockTryCharComponent implements OnInit {

  @Input() letter: string;
  @Input() translate: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  // TODO: routes to upload page, #73, Maryam Mohamad Al Mahdi
  navigateUpload(){
    this.router.navigate(['/upload']);
  }

}
