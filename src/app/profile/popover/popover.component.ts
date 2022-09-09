import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PrivilegeModalPage } from '../privilege-modal/privilege-modal.page';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() role: string;
  list: string[];
  constructor(public modalController: ModalController, private popOverCtrl: PopoverController) {}

  ngOnInit() {
    //list of the popover options
    this.list = ['edit privileges'];
  }

  //TODO: Navigate to the appropriate page based on which popover function was selected, #203, Maryam
  popoverOption(item: string){

    if(item === this.list[0]){
        this.presentModal();
        this.close();
    }
  }

  //TODO: open the modal as well as send the modal data, #183, Maryam Mohamad Al Mahdi
  async presentModal() {
    const modal = await this.modalController.create({
      component: PrivilegeModalPage,
      cssClass: 'my-modal-class',
      componentProps: {
        role: this.role,
      }
    });
    await modal.present();
  }

  //TODO: closes the popover, #183, Maryam Mohamad Al Mahdi
  close() {
    this.popOverCtrl.dismiss();
  }

}
