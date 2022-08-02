import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphProgressPage } from './graph-progress.page';

const routes: Routes = [
  {
    path: '',
    component: GraphProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphProgressPageRoutingModule {}
