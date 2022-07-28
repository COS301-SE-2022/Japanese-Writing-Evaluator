import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordPasswordPage } from './forgot-password-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordPasswordPageRoutingModule {}
