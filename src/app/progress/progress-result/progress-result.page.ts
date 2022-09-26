import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/appService/app-service.service';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-progress-result',
  templateUrl: './progress-result.page.html',
  styleUrls: ['./progress-result.page.scss'],
})
export class ProgressResultPage implements OnInit {

  category: string;
  heading: string;
  currentMap: Map<string, {score: number; date: string}[]>;

  constructor(private router: Router, private route: ActivatedRoute, private service: AppServiceService) { }

  //TODO: get category from the url, that data is sent in from options in shared folder, #183, Maryam Mohamad Al Mahdi
  ngOnInit() {

    this.category = this.route.snapshot.queryParamMap.get('category');
    this.heading = this.category;
    this.manipulateScores();
  }
//TODO: calculating the averages from the score of the letters that were practised per writing style, #183, Maryam Mohamad Al Mahdi
  manipulateScores()
  {
    if(this.category === 'Hiragana'){
      this.currentMap = this.service.getProgressHiragana();
    }
    else if(this.category === ' Katakana'){
      this.currentMap = this.service.getProgressKatakana();
    }
    else{
      this.currentMap = this.service.getProgressKanji();
    }
  }


  //TODO: get the singely typed character based on the string feed in, #183, Maryam Mohamad Al Mahdi
  getLetter(letter: string){
    let letterString = '';
    let index = letter.indexOf('_');

    if(index !== -1)
    {
      index -= 1;
      while(index!== -1){

        letterString += letter[index];
        index -= 1;
      }
    }
    return letterString.split('').reverse().join('');
  }


  //TODO: get the writing style, #183, Maryam Mohamad Al Mahdi
  getStyle(){
    return this.category.toLowerCase();
  }

  //TODO: get get the percentage of progress, #183, Maryam Mohamad Al Mahdi
  getPercent(objArray: {score: number; date: string }[]){

    let totalPercent = 0;
    for(const obj of objArray){
      totalPercent+=Number(obj.score);
    }
      return Math.round(totalPercent/objArray.length);
  }


  setHome(){
    this.router.navigate(['/home']);
  }

  setProgress(){
    this.router.navigate(['/progress']);
  }

  ifNormalNavbar(): boolean{
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('id') === 'guest') {
        //console.log(localStorage.getItem('id'));
        return false;
      }
    }

    if (env.admin === true || env.superAdmin === true) {
      return false;
    }

    return true;
  }

}
