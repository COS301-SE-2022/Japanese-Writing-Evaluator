import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlphabetCategoryPageRoutingModule } from './alphabet-category-routing.module';

import { AlphabetCategoryPage } from './alphabet-category.page';
import { BlockTryCharComponent } from '.././block-try-char/block-try-char.component';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlphabetCategoryPageRoutingModule,
    NavbarModule
  ],
  declarations: [AlphabetCategoryPage, BlockTryCharComponent]
})
export class AlphabetCategoryPageModule {}
