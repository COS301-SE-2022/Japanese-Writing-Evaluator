import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { AppServiceService } from '../services/app-service.service';
import { SignUpPage } from './sign-up.page';
import {  HttpClientModule  } from '@angular/common/http';
import { PasswordModule } from '../shared/components/password/password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    HttpClientModule,
    PasswordModule,
  ],
  declarations: [SignUpPage],
  providers: [AppServiceService]
})
export class SignUpPageModule {}
