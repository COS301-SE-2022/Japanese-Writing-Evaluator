import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Pipe, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
//import { AppServiceService } from '../services/app-service.service';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})


export class ProgressPage implements OnInit {
  data: SafeHtml;

  char = '';
  percent = 0;

  img: string;

  htmlToAdd = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.char = localStorage.getItem('char');
    this.percent = +localStorage.getItem('percentage');
    // eslint-disable-next-line max-len
  }

  setDisplay(char: string, percent: number)
  {
    console.log(char);
    this.char = char;
    this.percent = percent;
  }


  setHome(){
    this.router.navigate(['/home']);
  }
}
