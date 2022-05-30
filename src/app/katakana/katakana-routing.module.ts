import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KatakanaPage } from './katakana.page';

const routes: Routes = [
  {
    path: '',
    component: KatakanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KatakanaPageRoutingModule {}
