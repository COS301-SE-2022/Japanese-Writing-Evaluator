import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressPage } from './progress.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressPage
  },  {
    path: 'graph-modal',
    loadChildren: () => import('./graph-modal/graph-modal.module').then( m => m.GraphModalPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class ProgressPageRoutingModule {}
