import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KatakanaPageRoutingModule } from './katakana-routing.module';

import { KatakanaPage } from './katakana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KatakanaPageRoutingModule
  ],
  declarations: [KatakanaPage]
})
export class KatakanaPageModule {}
