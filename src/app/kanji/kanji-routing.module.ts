import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanjiPage } from './kanji.page';

const routes: Routes = [
  {
    path: '',
    component: KanjiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanjiPageRoutingModule {}
