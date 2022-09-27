import { Component, OnInit } from '@angular/core';
import { PopoverSettingsComponent } from '../popover-settings/popover-settings.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  list: string[];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {
  }

  //TODO: Opens the popover, #203, Maryam
  async openPopover(ev: any){
    const popover =  await this.popCtrl.create({
      component: PopoverSettingsComponent,
      event: ev,
    });
    return await popover.present();
  }

}
