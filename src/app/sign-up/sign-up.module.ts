import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { AppServiceService } from '../services/appService/app-service.service';
import { SignUpPage } from './sign-up.page';
import { PasswordModule } from '../shared/components/password/password.module';
import { ToastComponent } from '../shared/components/toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    PasswordModule,
  ],
  declarations: [SignUpPage],
  providers: [AppServiceService, ToastComponent]
})
export class SignUpPageModule {}
