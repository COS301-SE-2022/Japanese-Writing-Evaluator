import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ObdModalComponent } from './obd-modal.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [ObdModalComponent],
  imports: [IonicModule, CommonModule,BrowserModule],
  exports: [ObdModalComponent]
})

export class ObdModalModule{}
