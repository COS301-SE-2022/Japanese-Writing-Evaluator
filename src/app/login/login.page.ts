import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup; // form name used to link with html form

  constructor(formBuilder: FormBuilder, private router: Router) {//
    this.login = formBuilder.group({ // building a responsive form with two inputs
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
   }

  ngOnInit() {
  }

  onLogin(){
    //authentication
    // call isUser which checks if user exists ...
    //assign the response to a variable which goes in the if
    if (true) {
      //redirect to home
      console.log('logged in');
      this.router.navigate(['/home']);
    } else {
      //enable wrong password spans
    }
  }

}
