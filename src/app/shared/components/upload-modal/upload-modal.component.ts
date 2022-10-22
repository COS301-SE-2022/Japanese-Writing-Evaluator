import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppServiceService } from 'src/app/services/appService/app-service.service';
import { CharacterImage } from '../../interfaces/image';
import { Score } from '../../interfaces/score';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class UploadModalComponent implements OnInit {
  score: Score; // response from the api
  characterImage: CharacterImage; // the character chosen to practice
  userImage: any; // it is the image the user uploaded
  math: Math; // math library

  constructor(public modalController: ModalController, private service: AppServiceService) { }

  ngOnInit() {
    this.score = this.service.getScore();
    this.characterImage = this.service.getTryImage();
    this.userImage = this.service.getUserImage();
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }

}
