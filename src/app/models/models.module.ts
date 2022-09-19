import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelsPageRoutingModule } from './models-routing.module';

import { ModelsPage } from './models.page';
import { PiechartModule } from '../shared/components/piechart/piechart.module';

import { LogoutModule } from '../shared/components/logout/logout.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelsPageRoutingModule,
    PiechartModule,
    LogoutModule
  ],
  declarations: [ModelsPage]
})
export class ModelsPageModule {}
