import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObjectDetectionService } from 'src/app/services/objectDetection/object-detection.service';
import { OdresponseElements } from '../../interfaces/odpicture';
@Component({
  selector: 'app-obd-modal',
  templateUrl: './obd-modal.component.html',
  styleUrls: ['./obd-modal.component.scss'],
})
export class ObdModalComponent implements AfterViewInit {

  objectsArr: OdresponseElements[] = [];
  constructor(public modalController: ModalController, private objDectService: ObjectDetectionService) { }

  ngAfterViewInit(): void {
    if(this.objDectService.responseData != null){
      this.objectsArr = this.objDectService.responseData;
    }
  }

  // ngOnInit( ) {
  //   if(this.objDectService.responseData != null){
  //     this.objectsArr = this.objDectService.responseData;
  //   }
  // }

  dismiss() {
    this.modalController.dismiss();
  }

}
