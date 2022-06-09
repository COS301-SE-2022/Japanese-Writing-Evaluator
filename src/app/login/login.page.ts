/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup; // form name used to link with html form

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
      if (!localStorage.getItem('id')) {
        localStorage.setItem('id','guest');
      }
      this.router.navigate(['/home']);
    } else if (!(username === '')) {
      // if (!localStorage.getItem('id')) {
      //   localStorage.setItem('id','85');
      // }
      // this.router.navigate(['/home']);
      this.appService.isUser(username,password )
      .subscribe(data =>{
        console.log(data.body['user-token'].toString());
        if(data.status === 200){
          if (!localStorage.getItem('id')) {
            localStorage.setItem('id',data.body['data'][1].toString());
          }
          if (!localStorage.getItem('token')) {
            localStorage.setItem('token',data.body['user-token'].toString());
          }
          this.router.navigate(['/home']);
        }
        else{
          alert('Incorrect user information or user does not exist');
        }
      });
    }
  }

}
