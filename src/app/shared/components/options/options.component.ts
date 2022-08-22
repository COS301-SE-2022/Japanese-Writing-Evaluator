import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  @Input() letter: string;
  @Input() category: string;
  @Input() pageReq: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateAlphabet(){
    if(this.pageReq === 'home'){
      this.router.navigateByUrl('/home/alphabet-category?category='+ this.category);
    }
    else{
      this.router.navigateByUrl('/progress/alphabet-category?category='+ this.category);
    }
  }

}
