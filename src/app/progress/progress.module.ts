import { OptionsModule } from './../shared/components/options/options.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressPageRoutingModule } from './progress-routing.module';

import { ProgressPage } from './progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsModule,
    ProgressPageRoutingModule,
  ],
  declarations: [ProgressPage]
})
export class ProgressPageModule {}
