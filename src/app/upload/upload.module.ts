import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPageRoutingModule } from './upload-routing.module';

import { UploadPage } from './upload.page';
import { NavbarModule } from '../shared/components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPageRoutingModule,
    NavbarModule
  ],
  declarations: [UploadPage]
})
export class UploadPageModule {}
