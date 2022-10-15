import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrawPadPageRoutingModule } from './draw-pad-routing.module';

import { DrawPadPage } from './draw-pad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrawPadPageRoutingModule
  ],
  declarations: [DrawPadPage]
})
export class DrawPadPageModule {}
