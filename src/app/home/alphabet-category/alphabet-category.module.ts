import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LogoutModule } from 'src/app/shared/components/logout/logout.module';
import { AlphabetCategoryPageRoutingModule } from './alphabet-category-routing.module';

import { AlphabetCategoryPage } from './alphabet-category.page';
import { BlockTryCharComponent } from '.././block-try-char/block-try-char.component';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';
import { AdminNavBarModule } from 'src/app/shared/components/admin-nav-bar/admin-nav-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlphabetCategoryPageRoutingModule,
    NavbarModule,
    AdminNavBarModule,
    LogoutModule
  ],
  declarations: [AlphabetCategoryPage, BlockTryCharComponent]
})
export class AlphabetCategoryPageModule {}
