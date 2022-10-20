import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPageRoutingModule } from './upload-routing.module';

import { UploadPage } from './upload.page';
import { NavbarModule } from '../shared/components/navbar/navbar.module';
import { AdminNavBarModule } from '../shared/components/admin-nav-bar/admin-nav-bar.module';
import { LogoutModule } from '../shared/components/logout/logout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPageRoutingModule,
<<<<<<< HEAD
=======
    NavbarModule,
    AdminNavBarModule,
    LogoutModule
>>>>>>> develop
  ],
  declarations: [UploadPage]
})
export class UploadPageModule {}
