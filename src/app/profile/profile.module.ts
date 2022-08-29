import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileBlockComponent } from './profile-block/profile-block.component';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, ProfileBlockComponent, PopoverComponent]
})
export class ProfilePageModule {}
