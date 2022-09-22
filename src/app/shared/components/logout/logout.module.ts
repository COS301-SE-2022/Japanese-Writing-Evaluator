import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LogoutComponent } from './logout.component';

@NgModule({
  declarations: [LogoutComponent],
  imports: [IonicModule,RouterModule],
  exports: [LogoutComponent]
})

export class LogoutModule{}
