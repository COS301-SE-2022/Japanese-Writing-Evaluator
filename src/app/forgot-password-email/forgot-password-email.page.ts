import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AppServiceService } from '../services/app-service.service';
import { ForgotPasswordEmail } from '../shared/interfaces/forgotpassword';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.page.html',
  styleUrls: ['./forgot-password-email.page.scss'],
})
export class ForgotPasswordEmailPage implements OnInit {
  forgotpassword: FormGroup;

  constructor(formBuilder: FormBuilder, private appService: AppServiceService, private toast: ToastController) {//
    this.forgotpassword = formBuilder.group({ // building a responsive form for the forgot email
      email: new FormControl('',[Validators.required]),
    });
   }

  ngOnInit() {
  }

  onSubmitEmail(){
    if(this.forgotpassword.valid){
      let email = new Object() as ForgotPasswordEmail;
      email = {
        email: this.forgotpassword.controls.email.value,
      };
      //localStorage.setItem('email', this.forgotpassword.controls.email.value);
      this.appService.forgotPasswordEmail(email).subscribe( data => {
        //check if the response is okay so you can send a toast
        if(data.status === 200){
          this.showToast(true);
        }
        else{
          //check what the problem is
          switch(data.status){
            case 500:
              //internal server error
              break;
            case 404:
              //not found
              break;
            case 401:
              //invalid email(unauthorised)
              break;
            default:
          }
          this.showToast(false);
        }
      }); // sends the email to backend so that the email can be sent
    }
  }

  async showToast(success: boolean){
    const toastSuccess = await this.toast.create({
      message: 'Email has been sent',
      duration: 1500,
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel'
        }
      ],
      color: 'success'
    });

    const toastFail = await this.toast.create({
      message: 'Email was not sent. Retype email address',
      duration: 1500,
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel'
        }
      ],
      color: 'Danger'
    });

    if(success){
      toastSuccess.present();
    }
    else{
      toastFail.present();
    }

  }

}
