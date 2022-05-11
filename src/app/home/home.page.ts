import { Component, OnInit } from '@angular/core';
// import { AppServiceService } from '../services/app-service.service';
// import { Character } from '../shared/character';
import { storage , app } from 'Storage/firebaseConfig';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // characters: Character[] = [];
  constructor() {}//private repository: AppServiceService

  ngOnInit(): void {
    // this.repository.getCharacters().subscribe(res => {
    //   this.characters = res;
    // });

    // this.repository.getProgress();
  }

  // uploadImage(){
  //   //when uploadimage button is click
  //   this.repository.uploadImage();
  // }
}
