import { PopoverComponent } from './../popover/popover.component';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-block',
  templateUrl: './profile-block.component.html',
  styleUrls: ['./profile-block.component.scss'],
})
export class ProfileBlockComponent implements OnInit {
  @Input() name: string;
  @Input() role: string;

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {}

  //TODO: Opens the popover, #203, Maryam
  async openPopover(ev: any){
    const popover =  await this.popCtrl.create({
      component: PopoverComponent,
     componentProps: {value: 123},
      event: ev,
    });
    return await popover.present();
  }

}
