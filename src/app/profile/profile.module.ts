import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { AdminNavBarModule } from '../shared/components/admin-nav-bar/admin-nav-bar.module';
import { ProfilePage } from './profile.page';
import { ProfileBlockComponent } from './profile-block/profile-block.component';
import { PopoverComponent } from './popover/popover.component';
import { LogoutModule } from '../shared/components/logout/logout.module';
import { NavbarModule } from '../shared/components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    AdminNavBarModule,
    LogoutModule,
    NavbarModule
  ],
  declarations: [ProfilePage, ProfileBlockComponent, PopoverComponent]
})
export class ProfilePageModule {}
