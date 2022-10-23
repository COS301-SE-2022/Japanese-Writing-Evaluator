import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LogoutComponent } from './logout.component';
import { PopoverSettingsModule } from '../popover-settings/popover-settings.module';

@NgModule({
  declarations: [LogoutComponent],
  imports: [IonicModule,RouterModule, PopoverSettingsModule],
  exports: [LogoutComponent]
})

export class LogoutModule{}
