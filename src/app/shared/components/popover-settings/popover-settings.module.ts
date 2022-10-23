import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PopoverSettingsComponent } from './popover-settings.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from '../toast/toast.module';

@NgModule({
    declarations: [PopoverSettingsComponent],
    imports: [IonicModule, CommonModule, ToastModule],
    exports: [PopoverSettingsComponent]
})

export class PopoverSettingsModule { }
