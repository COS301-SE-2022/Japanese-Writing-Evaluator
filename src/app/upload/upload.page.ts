/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AppServiceService } from '../services/appService/app-service.service';
import { ObjectDetectionService } from '../services/objectDetection/object-detection.service';
import { CharacterImage, GuestUploadedImage, UploadedImage } from '../shared/interfaces/image';
import { Score } from '../shared/interfaces/score';
import { environment as env } from 'src/environments/environment';
import { UploadModalComponent } from '../shared/components/upload-modal/upload-modal.component';
import { waitForAsync } from '@angular/core/testing';
import { ObdModalComponent } from '../shared/components/obd-modal/obd-modal.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  characterImage: CharacterImage;
  uploadedImage: File;
  userImage: any;
  uploadImageName: string;
  private score: Score;
  private base64Result: any;

  //TODO:add form parameters to constructor, #71, Phumu
  constructor(private service: AppServiceService,public alertController: AlertController, private obdService: ObjectDetectionService,
    public modalController: ModalController) { }

  //TODO: get the character image to be practiced, #71, Phumu
  ngOnInit() {
    this.characterImage = this.service.getTryImage();
  }
// ${this.characterImage.url}
  //TODO: show popover when evaluate is clicked, #71, Phumu
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

  //TODO: get uploaded image from the file input, #71, Phumu
  getUploadedImage($event){
    this.uploadedImage = $event.target.files[0];
    this.convertImageToBase64(this.uploadedImage);
    this.uploadImageName = $event.target.files[0].name;
  }

  convertImageToBase64(file: File): any { //Observable<string> convert the image file to base64
    //let base64Result;
    const fileReader = new FileReader();
    fileReader.onloadend = (e)=>{
      this.base64Result = e.target.result;
      this.userImage = fileReader.result;
      //console.log(this.base64Result);
    };
    fileReader.readAsDataURL(file);
    //console.log(this.base64Result);
    //return base64Result;
  }

  //TODO: send image to backend to be evaluated by the AI, #71, Phumu
  evaluateImage() {
    // add if user is a guest
    if (this.uploadedImage != null && localStorage.getItem('id') !== '') {
      let base64String = '';
      base64String = this.base64Result;

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
          this.service.setScore(data.body);
          this.service.setUserImage(this.userImage);
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
          this.service.setUserImage(this.userImage);
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

  //open the object detection modal agin incase they want to try another image
  async showModal(modalComponent){//shows each of the modals ... depending on the component
    const modal = await this.modalController.create({
      component: modalComponent
    });
    // this.obdService.setModal(modal);
    // console.log(modal);
    return await modal.present();
  }

  async showOdbModal(){//shows each of the modals ... depending on the component
    const modal = await this.modalController.create({
      component: ObdModalComponent
    });
    // this.obdService.setModal(modal);
    // console.log(modal);
    return await modal.present();
  }

  //checks if modal is set, if it is show button
  ifObjectsDetected(): boolean{
    if (this.obdService.getModal()) {
      return true;
    }
    return false;
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
