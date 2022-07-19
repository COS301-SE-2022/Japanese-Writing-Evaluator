import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password-password',
  templateUrl: './forgot-password-password.page.html',
  styleUrls: ['./forgot-password-password.page.scss'],
})
export class ForgotPasswordPasswordPage implements OnInit {
  password: string;
  confirmedPassword: string;

  constructor(private router: Router, public toastController: ToastController){
    this.password = '';
    this.confirmedPassword = '';
  }

  async presentToast() {
    const toast = await this.toastController.create({
        message: 'Your settings have been saved.',
        duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Passwords do not match, please try again',
      position: 'top',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  ngOnInit() {
  }

  onSubmitPassword(){
    if(this.password === this.confirmedPassword)
    {
      this.router.navigate(['/home']);
    }
    else
    {
      this.password = '';
      this.confirmedPassword = '';
      this.presentToastWithOptions();
    }
  }

}
