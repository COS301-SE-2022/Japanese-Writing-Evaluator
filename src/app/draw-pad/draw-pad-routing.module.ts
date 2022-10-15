import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawPadPage } from './draw-pad.page';

const routes: Routes = [
  {
    path: '',
    component: DrawPadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawPadPageRoutingModule {}
