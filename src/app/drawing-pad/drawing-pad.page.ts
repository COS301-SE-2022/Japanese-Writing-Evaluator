import { AlertController, ModalController } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { AppServiceService } from '../services/appService/app-service.service';
import { UploadModalComponent } from '../shared/components/upload-modal/upload-modal.component';
import { CharacterImage, GuestUploadedImage, UploadedImage } from '../shared/interfaces/image';
import { Score } from '../shared/interfaces/score';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-drawing-pad',
  templateUrl: './drawing-pad.page.html',
  styleUrls: ['./drawing-pad.page.scss'],
})
export class DrawingPadPage implements AfterViewInit {
  @ViewChild('canvas') canvasEl: ElementRef;
  signaturePad: SignaturePad;
  signatureImg: string;
  characterImage: CharacterImage;
  uploadImageName = 'drawingCharacter.jpeg';
  score: Score;

  constructor(public service: AppServiceService, private modalController: ModalController, private alertController: AlertController) { }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    this.characterImage = this.service.getTryImage();
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.evaluateImage();
  }

  evaluateImage() {
    // add if user is a guest
    if (this.signatureImg != null && localStorage.getItem('id') !== '') {
      let base64String = '';
      base64String = this.signatureImg;

      //console.log('in');
      if (localStorage.getItem('id') !== 'guest') {
        //console.log('in');
        let img = new Object() as UploadedImage;
        img = {
          id: localStorage.getItem('id'),
          image: base64String,
          imagechar: this.characterImage.characterName,//the name of the character eg i
          file: this.uploadImageName, // uploaded file name
          style: this.characterImage.group, // the writing style that the letter is from
        };
        this.service.uploadImage(img).subscribe( data =>{
          console.log(data.body);
          this.service.setScore(data.body);
          this.service.setUserImage(this.signatureImg);
          if(data.body.data.score === 0 || data.body.data.score === -1){
            this.score = data.body;
            this.showScore(data.body);
          }
          else{
            this.showModal(UploadModalComponent);
          }
        });

         // get the score
      }
      else{
        let img = new Object() as GuestUploadedImage;
        img = {
          image: base64String,
          imagechar: this.characterImage.characterName,
          style: this.characterImage.group
        };
        this.service.guestUploadImage(img).subscribe( data => {
          this.service.setScore(data.body);
          this.service.setUserImage(this.signatureImg);
          if(data.body.data.score === 0 || data.body.data.score === -1){
            this.score = data.body;
            this.showScore(data.body);
          }
          else{
            this.showModal(UploadModalComponent);
          }
        });

      }
    }
  }

  async showModal(modalComponent){//shows each of the modals ... depending on the component
    const modal = await this.modalController.create({
      component: modalComponent
    });
    // this.obdService.setModal(modal);
    // console.log(modal);
    return await modal.present();
  }

  async showScore(score: Score) {
    //if score is negative 1 == error
    let scoreMessage: string;
    let alert;
    if (score.data.score === -1) {
      scoreMessage = 'Try again'; // todo: add error message, #68, Phumu
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Something went wrong...',
        message: `<ion-img src="../../assets/icon/uploaderror.png" alt="Error Image" ></ion-img>${scoreMessage}`,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
    }
    else if (score.data.score === 0) {
      scoreMessage = 'Try upload another image'; // todo: add error message, #68, Phumu
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Image is invalid...',
        message: `<ion-img src="../../assets/icon/uploaderror.png" alt="Error Image" ></ion-img>${scoreMessage}`,
        buttons: [
          {
            text: 'Retry',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
    }

  await alert.present();

    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  ifGuest(): boolean{
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('id') === 'guest') {
        return false;
      }
    }

    return true;
  }

  ifNormalNavbar(): boolean{

    if (env.admin === true || env.superAdmin === true) {
      return false;
    }

    return true;
  }
}
