import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawingPadPage } from './drawing-pad.page';

const routes: Routes = [
  {
    path: '',
    component: DrawingPadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawingPadPageRoutingModule {}
