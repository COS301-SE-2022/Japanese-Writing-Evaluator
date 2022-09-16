import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrawingPadPageRoutingModule } from './drawing-pad-routing.module';

import { DrawingPadPage } from './drawing-pad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrawingPadPageRoutingModule
  ],
  declarations: [DrawingPadPage]
})
export class DrawingPadPageModule {}
