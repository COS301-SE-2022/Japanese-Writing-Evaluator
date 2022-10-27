import { AlertController, ModalController } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { AppServiceService } from '../services/appService/app-service.service';
import { UploadModalComponent } from '../shared/components/upload-modal/upload-modal.component';
import { CharacterImage, GuestUploadedImage, UploadedImage } from '../shared/interfaces/image';
import { Score } from '../shared/interfaces/score';
import { environment as env } from 'src/environments/environment';
import { UploadPage } from '../upload/upload.page';

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

  constructor(public service: AppServiceService, private modalController: ModalController, private alertController: AlertController,
     private upload: UploadPage) { }

  ngAfterViewInit() {
    //this.signaturePad = new SignaturePad(this.canvasEl.nativeElement), {};

    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement, {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    });
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
    //console.log(this.signatureImg);

    this.upload.evaluateImage(this.signatureImg,this.signatureImg,this.uploadImageName,this.signatureImg,this.characterImage);
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
