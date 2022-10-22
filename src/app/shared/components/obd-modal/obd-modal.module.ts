import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ObdModalComponent } from './obd-modal.component';

@NgModule({
  declarations: [ObdModalComponent],
  imports: [IonicModule, CommonModule],
  exports: [ObdModalComponent]
})

export class ObdModalModule{}
