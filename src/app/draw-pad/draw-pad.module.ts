
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DrawPadPageRoutingModule } from './draw-pad-routing.module';
import { DrawPadPage } from './draw-pad.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    DrawPadPageRoutingModule,
  ],
  declarations: [DrawPadPage]
})
export class DrawPadPageModule {}
