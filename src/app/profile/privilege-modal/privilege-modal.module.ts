import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivilegeModalPageRoutingModule } from './privilege-modal-routing.module';

import { PrivilegeModalPage } from './privilege-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivilegeModalPageRoutingModule
  ],
  declarations: [PrivilegeModalPage]
})
export class PrivilegeModalPageModule {}
