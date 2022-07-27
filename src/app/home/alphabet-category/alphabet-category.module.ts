import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlphabetCategoryPageRoutingModule } from './alphabet-category-routing.module';

import { AlphabetCategoryPage } from './alphabet-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlphabetCategoryPageRoutingModule
  ],
  declarations: [AlphabetCategoryPage]
})
export class AlphabetCategoryPageModule {}
