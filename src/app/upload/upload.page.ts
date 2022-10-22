/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AppServiceService } from '../services/appService/app-service.service';
import { ObjectDetectionService } from '../services/objectDetection/object-detection.service';
import { CharacterImage, GuestUploadedImage, UploadedImage } from '../shared/interfaces/image';
import { Score } from '../shared/interfaces/score';
import { environment as env } from 'src/environments/environment';
import { UploadModalComponent } from '../shared/components/upload-modal/upload-modal.component';

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
    else{ // link for image for stroke: https://www.nicepng.com/downpng/u2w7e6r5q8t4u2r5_hiragana-strokes-vowels-hiragana-stroke-order/
      scoreMessage = 'Your overall score is '+ Math.round(score.data.score).toString() + '%';
      const charImageUrl = '../assets/upload/' + this.characterImage.characterName + '.jpg';
      let strokes = '';
      let count = 1;
      if(this.score.data.strokes.length === 1 && this.score.data.strokes[0] === 0 ){
        strokes += `<ion-item>
          <p>We don't provide strokes for this character</p>
          <p>Strokes: ${Math.round(this.score.data.strokes[0])}</p>
        </ion-item>`;
      }
      else {
        this.score.data.strokes.forEach( stroke => {
          strokes += `<ion-item>
            <p class="stroke${count}">o </p><p>Stroke ${count}: ${Math.round(stroke)}</p>
            </ion-item>`;
          count++;
        });
      }
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Character Accuracy',
        message: `
        <h1>${this.characterImage.url}</h1>${scoreMessage}
        <h4>Your uploaded character</h4>
        <ion-img src="${this.userImage}"></ion-img>
        <h4>Expected character</h4>
        <ion-img src="${charImageUrl}" alt="Correct ${this.characterImage.characterName} image"></ion-img>
        <div>
          ${strokes}
        </div>`,
        buttons: [
          {
            text: 'Close',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
    }
    /*images for the strokes
      <ion-img src="../assets/images/a_strokes/a_stroke1.png" alt="Stroke 1"></ion-img>
      <ion-img src="../assets/images/a_strokes/a_stroke2.png" alt="Stroke 2">
      <ion-img src="../assets/images/a_strokes/a_stroke3.png" alt="Stroke 3"></ion-img>
      <ion-item>
          <p class="stroke1">o </p><p>Stroke 1: ${Math.round(this.score.data.stroke1)}%</p>
          </ion-item>
          <ion-item>
          <p class="stroke2">o </p><p>Stroke 2: ${Math.round(this.score.data.stroke2)}%</p>
          </ion-item>
          <ion-item>
          <p class="stroke3">o </p><p>Stroke 3: ${Math.round(this.score.data.stroke3)}%</p>
          </ion-item>
    */

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
          this.showModal(UploadModalComponent);
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
          this.showModal(UploadModalComponent);
          // this.score = data.body;
          // this.showScore(this.score);
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
