import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, ReplaySubject } from 'rxjs';
import { AppServiceService } from '../services/app-service.service';
import { CharacterImage, GuestUploadedImage, UploadedImage } from '../shared/image';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  characterImage: CharacterImage;
  uploadedImage: File;
  uploadImageName: string;
  private score: number;
  private base64Result: any;

  //TODO:add form parameters to constructor, #71, Phumu
  constructor(private service: AppServiceService,public alertController: AlertController) { }

  //TODO: get the character image to be practiced, #71, Phumu
  ngOnInit() {
    this.characterImage = this.service.getTryImage();
  }
// ${this.characterImage.url}
  //TODO: show popover when evaluate is clicked, #71, Phumu
  async showScore(score: number) {
    //if score is negative 1 == error
    let scoreMessage: string;
    let alert;
    console.log(score);
    //console.log(this.characterImage.url);
    if (score === -1) {
      scoreMessage = 'Try again'; // todo: add error message, #68, Phumu
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Something went wrong...',
        message: `<ion-img src="../../assets/images/errorgif.webp" alt="Error Image" width="60" height="60" ></ion-img>${scoreMessage}`,
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
    else{
      scoreMessage = 'Your accuracy score is '+ score.toString();
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Score',
        message: `<h1>${this.characterImage.url}</h1>${scoreMessage}`,
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


      if (localStorage.getItem('id') !== 'guest') {
        let img = new Object() as UploadedImage;
        img = {
          id: localStorage.getItem('id'),
          image: base64String,
          imagechar: this.characterImage.characterName,
          file: this.uploadImageName
        };
        this.service.uploadImage(img).subscribe( data =>{
          this.score = data.body.score;
        });
        this.showScore(this.score); // get the score
      }
      else{
        let img = new Object() as GuestUploadedImage;
        img = {
          image: base64String,
          imagechar: this.characterImage.characterName,
        };
        this.service.guestUploadImage(img).subscribe( data => {
          this.score = data.body.score;
        });
        if(this.score != null){
          this.showScore(this.score);
        }

      }
    }
  }

}
