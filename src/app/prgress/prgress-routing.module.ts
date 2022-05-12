import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgressPage } from './prgress.page';

const routes: Routes = [
  {
    path: '',
    component: PrgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrgressPageRoutingModule {}
