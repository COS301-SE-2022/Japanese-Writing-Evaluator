import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordEmailPage } from './forgot-password-email.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordEmailPageRoutingModule {}
