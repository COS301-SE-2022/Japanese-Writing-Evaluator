import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPasswordPageRoutingModule } from './forgot-password-password-routing.module';

import { ForgotPasswordPasswordPage } from './forgot-password-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPasswordPageRoutingModule
  ],
  declarations: [ForgotPasswordPasswordPage]
})
export class ForgotPasswordPasswordPageModule {}
