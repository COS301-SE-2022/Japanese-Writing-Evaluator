import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPasswordPageRoutingModule } from './forgot-password-password-routing.module';

import { ForgotPasswordPasswordPage } from './forgot-password-password.page';
import { PasswordModule } from '../shared/components/password/password.module';
import { ToastComponent } from '../shared/components/toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPasswordPageRoutingModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  declarations: [ForgotPasswordPasswordPage],
  providers: [ToastComponent]
})
export class ForgotPasswordPasswordPageModule {}
