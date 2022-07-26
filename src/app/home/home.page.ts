import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';
import character_sets from '../shared/character_data/character_sets.json';
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
  constructor(private service: AppServiceService, private router: Router) {
  }//private repository: AppServiceService  ;



  //TODO: check local storage to check if user is guest, #, Phumu
  ifGuest(): boolean{
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('id') === 'guest') {
        console.log(localStorage.getItem('id'));
        return true;
      }
    }

    return false;
  }

  ngOnInit(): void {}

  onLogout(){
    // this function logs the user out of the system
    localStorage.removeItem('id');
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);

  }

  // TODO: components are dynamically updated for katakana, #73, Maryam Mohamad Al Mahdi
  navigateKatakana(){

  }

  // TODO: components are dynamically updated for hiragana, #73, Maryam Mohamad Al Mahdi
  navigateHome(){
  }

  // TODO: components are dynamically updated for kanji, #73, Maryam Mohamad Al Mahdi
  navigateKanji(){
  }

}
