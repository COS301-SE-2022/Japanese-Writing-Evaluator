import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privilege-modal',
  templateUrl: './privilege-modal.page.html',
  styleUrls: ['./privilege-modal.page.scss'],
})
export class PrivilegeModalPage implements OnInit {
  @Input() role;

  constructor(public modalController: ModalController, private router: Router) {}

  ngOnInit() {}

  //TODO: closes the modal, #183, Maryam Mohamad Al Mahdi
  close() {
    this.modalController.dismiss();
  }

}
