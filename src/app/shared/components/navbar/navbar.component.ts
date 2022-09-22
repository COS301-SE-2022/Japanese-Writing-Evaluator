import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ObjectDetectionService } from 'src/app/services/objectDetection/object-detection.service';
import { ObdModalComponent } from '../obd-modal/obd-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentModel = null;

  constructor(public modalController: ModalController, public objDetectionService: ObjectDetectionService) { }

  ngOnInit() {

  }

  async takePhoto(){
    await this.objDetectionService.getPicture();
    if(this.objDetectionService.responseData != null){
      console.log(this.objDetectionService.responseData);
      this.showModal();
    }

  }

  async showModal(){
    const modal = await this.modalController.create({
      component: ObdModalComponent
    });
    return await modal.present();
  }


}
