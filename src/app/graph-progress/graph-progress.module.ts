import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphProgressPageRoutingModule } from './graph-progress-routing.module';

import { GraphProgressPage } from './graph-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphProgressPageRoutingModule
  ],
  declarations: [GraphProgressPage]
})
export class GraphProgressPageModule {}
