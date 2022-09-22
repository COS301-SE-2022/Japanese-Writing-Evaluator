import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminNavBarComponent } from './admin-nav-bar.component';

@NgModule({
  declarations: [AdminNavBarComponent],
  imports: [IonicModule,RouterModule],
  exports: [AdminNavBarComponent]
})

export class AdminNavBarModule{}
