import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/appService/app-service.service';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  alphabetCategory = [
    {character: 'あ', category: 'Hiragana - Vowels'},
    {character: 'か', category: 'Hiragana - Group K'},
    {character: 'さ', category: 'Hiragana - Group S'},
    {character: 'た', category: 'Hiragana - Group T'},
    {character: 'な', category: 'Hiragana - Group N'},
    {character: 'は', category: 'Hiragana - Group H'},
    {character: 'ま', category: 'Hiragana - Group M'},
    {character: 'や', category: 'Hiragana - Group Y'},
    {character: 'ら', category: 'Hiragana - Group R'},
    {character: 'わ', category: 'Hiragana - Group W'},
    {character: 'が', category: 'Hiragana - Group G'},
    {character: 'ざ', category: 'Hiragana - Group Z'},
    {character: 'だ', category: 'Hiragana - Group D'},
    {character: 'ば', category: 'Hiragana - Group B'},
    {character: 'ぱ', category: 'Hiragana - Group P'},
    {character: 'ア', category: 'Katakana'},
    {character: '一', category: 'Kanji'}
  ];

  pageRequest = 'home';
  constructor(private service: AppServiceService, private router: Router) {
  }

  //TODO: check local storage to check if user is guest, #, Phumu
  ifGuest(): boolean{
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('id') === 'guest') {
        return true;
      }
    }

    return false;
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

  ngOnInit(): void {}

}
