import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlphabetCategoryPage } from './alphabet-category.page';

const routes: Routes = [
  {
    path: '',
    component: AlphabetCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlphabetCategoryPageRoutingModule {}
