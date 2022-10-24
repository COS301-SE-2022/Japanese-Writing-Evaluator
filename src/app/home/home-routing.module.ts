import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },  {
    path: 'alphabet-category',
    loadChildren: () => import('./alphabet-category/alphabet-category.module').then( m => m.AlphabetCategoryPageModule)
  },
  {
    path: 'pop-over-upload',
    loadChildren: () => import('./pop-over-upload/pop-over-upload.module').then( m => m.PopOverUploadPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
