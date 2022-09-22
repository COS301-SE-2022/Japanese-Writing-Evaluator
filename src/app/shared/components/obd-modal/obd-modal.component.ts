import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObjectDetectionService } from 'src/app/services/objectDetection/object-detection.service';
import { OdresponseElements } from '../../interfaces/odpicture';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-obd-modal',
  templateUrl: './obd-modal.component.html',
  styleUrls: ['./obd-modal.component.scss'],
})
export class ObdModalComponent implements OnInit {

  objectsArr: OdresponseElements[];
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    keyboard: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(public modalController: ModalController, public objDectService: ObjectDetectionService) { }

  ngOnInit( ) {
    this.objectsArr = this.objDectService.responseData;
    // .forEach(element => {
    //     this.objectsArr.push(element);
    //   });
     // this.objectsArr = this.objDectService.responseData;
      console.log(this.objectsArr);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
