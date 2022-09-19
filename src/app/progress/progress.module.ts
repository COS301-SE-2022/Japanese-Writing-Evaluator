import { OptionsModule } from './../shared/components/options/options.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressPageRoutingModule } from './progress-routing.module';

import { ProgressPage } from './progress.page';
import { ProgressBlockComponent } from './progress-block/progress-block.component';
import { NavbarModule } from '../shared/components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsModule,
    ProgressPageRoutingModule,
    NavbarModule
  ],
  declarations: [ProgressPage]
})
export class ProgressPageModule {}
