/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppServiceService } from '../services/appService/app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup; // form name used to link with html form
  isUsername = false; // is there a username provided
  //usernameInputColor = 'border-color: dark;';
  isPassword = false; // is there a username provided
  //passwordInputColor = 'border-color: dark;';
  hide = true; // a variable used to show or hide a password

  constructor(formBuilder: FormBuilder, private router: Router, private appService: AppServiceService) {//
    this.login = formBuilder.group({ // building a responsive form with two inputs
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
   }

  ngOnInit() {
  }

  onLogin(){
    const username = this.login.controls.username.value;
    const password = this.login.controls.password.value;//'zamakweyama04@gmail.com', 'P@55word'

    if (username === '') {
     // this.usernameInputColor = 'border-color: darkred;';
      this.isUsername =  true;
    }
    else{
      //this.usernameInputColor = 'border-color: dark;';
      this.isUsername = false; // is there a username provided
    }

    if(password === ''){
      this.isPassword = true;
     // this.passwordInputColor = 'border-color: darkred;';
    }else{
      this.isPassword = false; // is there a username provided
      //this.passwordInputColor = 'border-color: dark;';
    }

    if (!(username === '') && !(password === '')) {

      this.appService.isUser(username,password )
      .subscribe(data =>{
        if(data.status === 200){
          if (!localStorage.getItem('id')) {
            localStorage.setItem('id',data.body['data'][1].toString());
          }
          if (!localStorage.getItem('token')) {
            localStorage.setItem('token',data.body['user-token'].toString());
          }

          this.login.controls.username.reset();
          this.login.controls.password.reset();

          this.router.navigate(['/home']);
        }
      });
    }
  }

  onGuestLogin(){
      localStorage.setItem('id','guest');
      this.router.navigate(['/home']);
  }


}
