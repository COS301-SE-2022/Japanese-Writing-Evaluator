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
   this.appService.isUser(username,password )
    .subscribe(data =>{
      console.log(data.body);
      if(data.status === 200){
        localStorage.setItem('user-token', data.body['user-token']);
        // localStorage.setItem('username', data.body.data[1]);
        // localStorage.setItem('id', data.body.data[0]);
        console.log('logged in');
        this.router.navigate(['/home']);
      }
      else{
        alert('Incorrect user information or user does not exist');
      }
    });
  }

}
