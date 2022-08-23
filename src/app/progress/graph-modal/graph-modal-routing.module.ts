import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphModalPage } from './graph-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GraphModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphModalPageRoutingModule {}
