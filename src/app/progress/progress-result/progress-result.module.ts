import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressResultPageRoutingModule } from './progress-result-routing.module';

import { ProgressResultPage } from './progress-result.page';
import { ProgressBlockComponent } from '../progress-block/progress-block.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressResultPageRoutingModule,
  ],
  declarations: [ProgressResultPage, ProgressBlockComponent]
})
export class ProgressResultPageModule {}
