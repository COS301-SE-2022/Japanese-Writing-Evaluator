import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordPassword } from '../shared/interfaces/forgotpassword';
import { AppServiceService } from '../services/app-service.service';


@Component({
  selector: 'app-forgot-password-password',
  templateUrl: './forgot-password-password.page.html',
  styleUrls: ['./forgot-password-password.page.scss'],
})
export class ForgotPasswordPasswordPage implements OnInit {
  password: string;
  confirmedPassword: string;
  forgotpassword: FormGroup;

  constructor(private router: Router, public toastController: ToastController,private formbuilder: FormBuilder,
    private service: AppServiceService){

    this.forgotpassword = this.formbuilder.group({
      newPassword: new  FormControl('',[Validators.required]),
      confirmedPassword: new FormControl('')
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
        message: 'Password changed.',
        duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Passwords do not match, please try again',
      position: 'bottom',
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
    this.password = this.forgotpassword.controls.newPassword.value;
    this.confirmedPassword = this.forgotpassword.controls.confirmedPassword.value;
    if(this.password === this.confirmedPassword)
    {
      let pass = new Object() as ForgotPasswordPassword;
      pass = {
        password: this.password,
      };

      this.service.forgotPasswordPassword(pass).subscribe(response => {
        if (response.status === 200) { //
          this.presentToast();
          this.router.navigate(['/login']);
        }
        else{
          //
        }
      });
    }
    else
    {
      this.presentToastWithOptions();
    }
  }

}
