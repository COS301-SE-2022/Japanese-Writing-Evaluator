import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrgressPageRoutingModule } from './prgress-routing.module';

import { PrgressPage } from './prgress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrgressPageRoutingModule
  ],
  declarations: [PrgressPage]
})
export class PrgressPageModule {}
