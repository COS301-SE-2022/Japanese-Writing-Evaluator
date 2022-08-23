import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphModalPageRoutingModule } from './graph-modal-routing.module';

import { GraphModalPage } from './graph-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphModalPageRoutingModule
  ],
  declarations: [GraphModalPage]
})
export class GraphModalPageModule {}
