import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../shared/components/navbar/navbar.module';
import { LogoutModule } from '../shared/components/logout/logout.module';
import { AdminNavBarModule } from '../shared/components/admin-nav-bar/admin-nav-bar.module';
import { IonicModule } from '@ionic/angular';
import { DrawingPadPageRoutingModule } from './drawing-pad-routing.module';
import { DrawingPadPage } from './drawing-pad.page';
import { UploadModalModule } from '../shared/components/upload-modal/upload-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrawingPadPageRoutingModule,
    NavbarModule,
    AdminNavBarModule,
    LogoutModule,
    UploadModalModule
  ],
  declarations: [DrawingPadPage]
})
export class DrawingPadPageModule {}
