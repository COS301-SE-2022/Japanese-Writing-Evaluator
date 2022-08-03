import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-graph-modal',
  templateUrl: './graph-modal.page.html',
  styleUrls: ['./graph-modal.page.scss'],
})
export class GraphModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

}
