import { OptionsModule } from './../shared/components/options/options.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProgressPage } from '../progress/progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    OptionsModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage],
  providers: [ProgressPage]
})
export class HomePageModule {
}
