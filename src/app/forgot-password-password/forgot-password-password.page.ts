import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordPassword } from '../shared/interfaces/forgotpassword';
import { AppServiceService } from '../services/appService/app-service.service';
import { ToastComponent } from '../shared/components/toast/toast.component';


@Component({
  selector: 'app-forgot-password-password',
  templateUrl: './forgot-password-password.page.html',
  styleUrls: ['./forgot-password-password.page.scss'],
})
export class ForgotPasswordPasswordPage implements OnInit {
  password: string;
  confirmedPassword: string;
  forgotpassword: FormGroup;

  constructor(private router: Router, private toast: ToastComponent,private formbuilder: FormBuilder,
    private service: AppServiceService){

    this.forgotpassword = this.formbuilder.group({
      newPassword: new  FormControl('',[Validators.required]),
      confirmedPassword: new FormControl(''),
      token: new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmitPassword(){
    this.password = this.forgotpassword.controls.newPassword.value;
    this.confirmedPassword = this.forgotpassword.controls.confirmedPassword.value;
    const userToken = this.forgotpassword.controls.token.value;
    if(this.password === this.confirmedPassword)
    {
      let pass = new Object() as ForgotPasswordPassword;
      pass = {
        password: this.password,
        token: userToken
      };

      this.service.forgotPasswordPassword(pass).subscribe(response => {
        if (response.status === 200) { //
          this.toast.showToast('Password changed',200);
          this.router.navigate(['/login']);
        }
      });
    }
    else
    {
      this.toast.showToast('Passwords do not match, please try again',500);
    }
  }

}
