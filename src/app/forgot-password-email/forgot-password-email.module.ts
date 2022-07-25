import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordEmailPageRoutingModule } from './forgot-password-email-routing.module';

import { ForgotPasswordEmailPage } from './forgot-password-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordEmailPageRoutingModule
  ],
  declarations: [ForgotPasswordEmailPage]
})
export class ForgotPasswordEmailPageModule {}