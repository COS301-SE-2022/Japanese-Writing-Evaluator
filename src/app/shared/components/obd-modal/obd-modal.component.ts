import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObjectDetectionService } from 'src/app/services/objectDetection/object-detection.service';
import { OdresponseElements } from '../../interfaces/odpicture';
import { CharacterImage } from '../../interfaces/image';
import { AppServiceService } from 'src/app/services/appService/app-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-obd-modal',
  templateUrl: './obd-modal.component.html',
  styleUrls: ['./obd-modal.component.scss'],
})
export class ObdModalComponent implements OnInit {

  objectsArr: OdresponseElements[];
  photo: string;
  constructor(public modalController: ModalController, public objDectService: ObjectDetectionService,
    private service: AppServiceService, private router: Router) { }

  ngOnInit( ) {
    this.objectsArr = this.objDectService.responseData;
    this.photo = this.objDectService.photo;
    // .forEach(element => {
    //     this.objectsArr.push(element);
    //   });
     // this.objectsArr = this.objDectService.responseData;
      console.log(this.objectsArr);
  }

  showUploadPage(character: string){
    //send image to the upload page and redirect to upload page
    const image: CharacterImage ={
      characterName: '',
      group: 'Hiragana',
      url: character
    };
    this.service.setTryImage(image);
    this.router.navigate(['/upload']);
    this.dismiss();
    setTimeout(() => {
      console.log('wait');
    },5000);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
