import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  str = 'skjokso';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signUp(data,form){
    this.username = data.Username;
    this.email = data.Email;
    this.password = data.Password;

    this.sendData();
    alert(this.str);

    this.router.navigate(['login']);
    form.reset();
  }

  sendData()
  {
    SignUp.getData(this.username, this.email, this.password);
  }

}

