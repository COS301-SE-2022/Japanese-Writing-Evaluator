import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-popover-settings',
  templateUrl: './popover-settings.component.html',
  styleUrls: ['./popover-settings.component.scss'],
})
export class PopoverSettingsComponent implements OnInit {

  list: string[];

  constructor(public popOverCtrl: PopoverController, public router: Router, public toast: ToastComponent) { }

  ngOnInit() {
    //list of the popover options
    this.list = ['logout', 'delete profile'];
  }

    //TODO: when options are clicked the appropriate functions will be executed, #226, Maryam Mohamad Al Mahdi
    popoverOption(item: string){

      if(item === this.list[0]){
        this.logout();
      }
      if(item === this.list[1]){
        this.deleteProfile();
      }

    }

    //TODO: logs user out the app, #226, Maryam Mohamad Al Mahdi
    logout(){
      // this function logs the user out of the system
      localStorage.removeItem('id');
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      this.router.navigate(['/login']);

      this.close();
    }

    //TODO: allows user to delete their profile using a post request in app services, #226, Maryam Mohamad Al Mahdi
    deleteProfile(){
      //logic for delete
      this.router.navigate(['/login']);
      this.close();
      this.toast.showToast('Successfully deleted', 200);
    }

    //TODO: closes the popover, #226, Maryam Mohamad Al Mahdi
  close() {
    this.popOverCtrl.dismiss();
  }

}
