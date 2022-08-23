import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelsPageRoutingModule } from './models-routing.module';

import { ModelsPage } from './models.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelsPageRoutingModule
  ],
  declarations: [ModelsPage]
})
export class ModelsPageModule {}
