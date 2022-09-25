import { OptionsModule } from './../shared/components/options/options.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProgressPage } from '../progress/progress.page';
import { NavbarModule } from '../shared/components/navbar/navbar.module';
import { LogoutModule } from '../shared/components/logout/logout.module';
import { AdminNavBarModule } from '../shared/components/admin-nav-bar/admin-nav-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    OptionsModule,
    ReactiveFormsModule,
    NavbarModule,
    LogoutModule,
    AdminNavBarModule
  ],
  declarations: [HomePage],
  providers: [ProgressPage]
})
export class HomePageModule {
}
