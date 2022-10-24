import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopOverUploadPageRoutingModule } from './pop-over-upload-routing.module';

import { PopOverUploadPage } from './pop-over-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopOverUploadPageRoutingModule
  ],
  declarations: [PopOverUploadPage]
})
export class PopOverUploadPageModule {}
