import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { UploadModalComponent } from './upload-modal.component';

@NgModule({
  declarations: [UploadModalComponent],
  imports: [IonicModule, CommonModule,BrowserModule],
  exports: [UploadModalComponent]
})

export class UploadModalModule{}
