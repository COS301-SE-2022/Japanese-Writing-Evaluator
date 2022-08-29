import { PopoverComponent } from './../popover/popover.component';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-block',
  templateUrl: './profile-block.component.html',
  styleUrls: ['./profile-block.component.scss'],
})
export class ProfileBlockComponent implements OnInit {

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {}

  //TODO: Opens the popover, #203, Maryam
  async openPopover(ev: any){
    const popover =  await this.popCtrl.create({
      component: PopoverComponent,
      event: ev
    });
    return await popover.present();
  }

}
