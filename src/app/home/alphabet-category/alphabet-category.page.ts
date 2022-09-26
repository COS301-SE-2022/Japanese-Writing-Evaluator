import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import character_sets from '../../shared/character_data/character_sets.json';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-alphabet-category',
  templateUrl: './alphabet-category.page.html',
  styleUrls: ['./alphabet-category.page.scss'],
})
export class AlphabetCategoryPage implements OnInit {

  category: string;
  currentJSON: string;
  jsonAlphabet: any;
  style: string;
  heading: string;

  constructor(private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {

    this.currentJSON = '';

    this.category = this.route.snapshot.queryParamMap.get('category');
    this.heading = this.category;
    let splitted = [];

    if(this.category !== null && !this.category.includes(' ')){
      splitted = this.category.split(' ');
    }
    else{
      return;
    }

    this.currentJSON += splitted[0];
    this.currentJSON = this.currentJSON.toLowerCase();
    this.style = this.currentJSON;

    if(splitted.indexOf('Group') > -1)
    {
      this.currentJSON += 'Group' + splitted[3];
    }
    else
    {
      if(splitted.indexOf('Vowels') > -1)
      {
        this.currentJSON += 'Vowels';
      }
    }
    console.log(this.currentJSON);
    this.getJSON();
  }

  getJSON(){
      if(this.currentJSON === 'katakana')
      {
        this.jsonAlphabet = character_sets.katakana;
      }

      if(this.currentJSON === 'kanji')
      {
        this.jsonAlphabet = character_sets.kanji;
      }

      if(this.currentJSON === 'hiraganaVowels')
      {
        this.jsonAlphabet = character_sets.hiraganaVowels;
      }

      if(this.currentJSON === 'hiraganaGroupK')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupK;
      }

      if(this.currentJSON === 'hiraganaGroupS')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupS;
      }

      if(this.currentJSON === 'hiraganaGroupT')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupT;
      }

      if(this.currentJSON === 'hiraganaGroupN')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupN;
      }

      if(this.currentJSON === 'hiraganaGroupH')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupH;
      }

      if(this.currentJSON === 'hiraganaGroupM')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupK;
      }

      if(this.currentJSON === 'hiraganaGroupY')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupY;
      }

      if(this.currentJSON === 'hiraganaGroupR')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupK;
      }

      if(this.currentJSON === 'hiraganaGroupW')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupW;
      }

      if(this.currentJSON === 'hiraganaGroupG')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupG;
      }

      if(this.currentJSON === 'hiraganaGroupZ')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupZ;
      }

      if(this.currentJSON === 'hiraganaGroupD')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupD;
      }

      if(this.currentJSON === 'hiraganaGroupB')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupB;
      }

      if(this.currentJSON === 'hiraganaGroupP')
      {
        this.jsonAlphabet = character_sets.hiraganaGroupP;
      }
  }

  onLogout(){
    localStorage.removeItem('id');
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);

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
