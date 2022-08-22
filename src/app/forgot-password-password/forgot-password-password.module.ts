import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPasswordPageRoutingModule } from './forgot-password-password-routing.module';

import { ForgotPasswordPasswordPage } from './forgot-password-password.page';
import { PasswordComponent } from '../shared/components/password/password.component';
import { PasswordModule } from '../shared/components/password/password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPasswordPageRoutingModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  declarations: [ForgotPasswordPasswordPage]
})
export class ForgotPasswordPasswordPageModule {}
