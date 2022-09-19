import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  async showToast(msg: string, type: number) {
    let toast ;

    switch (type) {
      case 0:
        toast = await this.toastController.create({
          message: msg,
          position: 'bottom',
          duration: 2000,
          color: 'danger'
        });
        break;

      case 500:
        toast = await this.toastController.create({
          message: msg,
          position: 'bottom',
          duration: 2000,
          color: 'danger'
        });
        break;

      case 401:
        toast = await this.toastController.create({
          message: msg,
          position: 'bottom',
          duration: 2000,
          color: 'warning'
        });
        break;

      case 200:
        toast = await this.toastController.create({
          message: msg,
          position: 'bottom',
          duration: 2000,
          color: 'success'
        });
        break;

      default:
        break;
    }

    toast.present();
  }

}
