import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UploadModalComponent } from './upload-modal.component';

@NgModule({
  declarations: [UploadModalComponent],
  imports: [IonicModule, CommonModule],
  exports: [UploadModalComponent]
})

export class UploadModalModule{}
