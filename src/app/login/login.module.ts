import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from '../shared/components/password/password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
