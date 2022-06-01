import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from '@firebase/storage';
// import { AppServiceService } from '../services/app-service.service';
// import { Character } from '../shared/character';
import { storage, app } from 'Storage/firebaseConfig';
import { AppServiceService } from '../services/app-service.service';
import { ProgressPage } from '../progress/progress.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  image: File = null;
  upload: FormGroup;
  style: string;

  constructor(formBuilder: FormBuilder, private router: Router, private progressProp: ProgressPage) {
    this.upload = formBuilder.group({ // building a responsive form with two inputs
      image: new FormControl('',[Validators.required]),
    });
    this.style = 'Hiragana';
  }//private repository: AppServiceService

  getImage(event){
    this.image = event.target.files[0];
  }

  uploadImage(){
    //const storage = getStorage();
    const imageurl= this.upload.controls.image.value.split('\\');//
    const id = localStorage.getItem('id');
    const imageRef = ref(storage,`users/${id}/${imageurl[imageurl.length-1]}`);
    const uploadingTask = uploadBytesResumable(imageRef, this.image);
    uploadingTask.on('state_changed',(err) =>{
      console.log(err);
    });

  //  this.repository.uploadImage(this.upload.controls.image.value);
  }

  setProgress(){
    const progress =[
      {char: 'i', percent: 0.8},
      {char: 'e', percent: 0.26},
      {char: 'a', percent: 0.54},
    ];
    if (!localStorage.getItem('char') && !localStorage.getItem('percentage')) {
      localStorage.setItem('char',progress[0].char);
      localStorage.setItem('percentage',progress[0].percent.toString());
    }
    //this.progressProp.setDisplay(progress[0].char,progress[0].percent);
    this.router.navigate(['/progress']);
  }

  ngOnInit(): void {
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
