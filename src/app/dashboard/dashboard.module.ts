import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdminNavBarComponent } from '../shared/components/admin-nav-bar/admin-nav-bar.component';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { AdminNavBarModule } from '../shared/components/admin-nav-bar/admin-nav-bar.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    AdminNavBarModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
