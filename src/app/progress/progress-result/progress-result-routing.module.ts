import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressResultPage } from './progress-result.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressResultPageRoutingModule {}
