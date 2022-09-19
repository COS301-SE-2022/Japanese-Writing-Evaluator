import { OptionsModule } from './../shared/components/options/options.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressPageRoutingModule } from './progress-routing.module';

import { ProgressPage } from './progress.page';
import { LogoutModule } from './../shared/components/logout/logout.module';
import { NavbarModule } from '../shared/components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsModule,
    ProgressPageRoutingModule,
    NavbarModule,
    LogoutModule
  ],
  declarations: [ProgressPage]
})
export class ProgressPageModule {}
