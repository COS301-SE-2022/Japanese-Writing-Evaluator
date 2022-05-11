import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';
import { SignUp } from './sign-up';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  username = '';
  email = '';
  password = '';
  user;

  constructor(private router: Router, private apiService: AppServiceService) { }

  ngOnInit() {
  }

  signUp(data,form){
    this.username = data.Username;
    this.email = data.Email;
    this.password = data.Password;

    this.sendData();

    this.router.navigate(['login']);
    form.reset();
  }

  sendData()
  {
    this.user = new SignUp(this.username, this.email, this.password);
    this.addUser(this.user);
  }

  addUser(obj)
  {
    this.apiService.addUser(SignUp)
      .subscribe(data => {
        console.log(data);
      });
  }

}

