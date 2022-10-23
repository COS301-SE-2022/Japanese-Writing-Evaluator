import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopOverUploadPage } from './pop-over-upload.page';

const routes: Routes = [
  {
    path: '',
    component: PopOverUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopOverUploadPageRoutingModule {}
