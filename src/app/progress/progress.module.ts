import { OptionsModule } from './../shared/components/options/options.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressPageRoutingModule } from './progress-routing.module';

import { ProgressPage } from './progress.page';
import { ProgressBlockComponent } from './progress-block/progress-block.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsModule,
    ProgressPageRoutingModule,
  ],
  declarations: [ProgressPage, ProgressBlockComponent]
})
export class ProgressPageModule {}
