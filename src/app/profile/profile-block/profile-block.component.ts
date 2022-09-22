import { PopoverComponent } from './../popover/popover.component';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-profile-block',
  templateUrl: './profile-block.component.html',
  styleUrls: ['./profile-block.component.scss'],
})
export class ProfileBlockComponent implements OnInit {
  @Output() changeRoleEvent = new EventEmitter<string[]>();
  @Input() name: string;
  @Input() role: string;
  selectedRole: string;

  constructor(private popCtrl: PopoverController, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {}

  //TODO: Sending to profile page the changed roles of the specific user/admin, #203, Maryam
  roleEvent() {
    this.changeRoleEvent.emit([this.selectedRole, this.name]);
  }

  //TODO: Opens the popover, #203, Maryam
  async openPopover(ev: any){
    const popover =  await this.popCtrl.create({
      component: PopoverComponent,
     componentProps: {role: this.role},
      event: ev,
    });
    await popover.present();

    return popover.onDidDismiss().then(
      (data: any) => {
        if (data) {
          if( data.data !== undefined){
            this.selectedRole = data.data.data;
            console.log(this.selectedRole + ' from component');
            this.roleEvent();
          }
          else{
            this.selectedRole = undefined;
            console.log(this.selectedRole + ' from component');
            this.roleEvent();
          }
        }
      });
  }

}
