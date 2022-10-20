import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressResultPageRoutingModule } from './progress-result-routing.module';
import { LogoutModule } from 'src/app/shared/components/logout/logout.module';
import { ProgressResultPage } from './progress-result.page';
import { ProgressBlockComponent } from '../progress-block/progress-block.component';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';
import { AdminNavBarModule } from 'src/app/shared/components/admin-nav-bar/admin-nav-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressResultPageRoutingModule,
    LogoutModule,
    NavbarModule,
    AdminNavBarModule
  ],
  declarations: [ProgressResultPage, ProgressBlockComponent]
})
export class ProgressResultPageModule {}
