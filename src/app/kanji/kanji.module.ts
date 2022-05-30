import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KanjiPageRoutingModule } from './kanji-routing.module';

import { KanjiPage } from './kanji.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KanjiPageRoutingModule
  ],
  declarations: [KanjiPage]
})
export class KanjiPageModule {}
