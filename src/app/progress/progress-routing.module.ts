import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressPage } from './progress.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressPage
  },  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class ProgressPageRoutingModule {}
