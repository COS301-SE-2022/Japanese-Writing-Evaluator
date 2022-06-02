import { Component, OnInit } from '@angular/core';
import { Image } from '../shared/image';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  images: Image[]; // listy of images from firebase
  groups: string[] =  ['vowels','k','t'];
  style: string;

  constructor(private service: AppServiceService, private router: Router) {
    this.style = 'Hiragana';
  }//private repository: AppServiceService

  //TODO: add navigation to upload page, #, Phumu
  showUploadPage(image: Image){
    //send image to the upload page and redirect to upload page
    this.service.setTryImage(image);
    this.router.navigate(['/upload']);
  }

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


  ngOnInit(): void {
    this.service.getHomeImages().subscribe(data => {
      console.log(data);
    });
  }

  // TODO: routes to different pages depending on the selected writing style by the user, #73, Maryam Mohamad Al Mahdi
  writingStyle(style) {
    this.style = style;

    if(style === 'Hiragana'){
      this.navigateHome();}

    if(style === 'Katakana'){
      this.navigateKatakana();}

    if(style === 'Kanji'){
      this.navigateKanji();}


  }

  // TODO: routes to katakana page, #73, Maryam Mohamad Al Mahdi
  navigateKatakana(){
    this.router.navigate(['/katakana']);
  }

  // TODO: routes to home page, #73, Maryam Mohamad Al Mahdi
  navigateHome(){
    this.router.navigate(['/home']);
  }

  // TODO: routes to kanji page, #73, Maryam Mohamad Al Mahdi
  navigateKanji(){
    this.router.navigate(['/kanji']);
  }

}
