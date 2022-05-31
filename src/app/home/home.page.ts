import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';
import { Image } from '../shared/image';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ref, uploadBytesResumable, getDownloadURL, listAll } from '@firebase/storage';
// import { AppServiceService } from '../services/app-service.service';
// import { Character } from '../shared/character';
// import { storage, app } from 'Storage/firebaseConfig';
// import { AppServiceService } from '../services/app-service.service';
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
  }

  ngOnInit(): void {
    //this.suggestCharacter();
  }

  showUploadPage(image: Image){
    //send image to the upload page and redirect to upload page
    this.service.setTryImage(image);
    this.router.navigate(['/upload']);
  }

  ifGroup(group: string): boolean{
    //if the specified group is in the image list then return true
    // this.images.forEach(image => {
    //   if (image.group === group) {
    //     return true;
    //   }
    // });
    return false;
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
