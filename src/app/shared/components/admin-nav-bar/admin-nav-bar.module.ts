import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminNavBarComponent } from './admin-nav-bar.component';

@NgModule({
  declarations: [AdminNavBarComponent],
  imports: [IonicModule,RouterModule,CommonModule],
  exports: [AdminNavBarComponent]
})

export class AdminNavBarModule{}
