import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';
import { SignUp } from './sign-up';
import { ToastComponent } from '../shared/components/toast/toast.component';

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

  constructor(private router: Router, private apiService: AppServiceService, private toast: ToastComponent) { }

  ngOnInit() {
  }

  signUp(data,form){
    this.username = data.Username;
    this.email = data.Email;
    this.password = data.Password;

    this.sendData();

    form.reset();
  }

  sendData()
  {
    this.user = new SignUp(this.username, this.email, this.password);
    this.addUser();
  }

  addUser()
  {
    this.apiService.addUser(this.username, this.email, this.password)
      .subscribe(data => {
        if(data.status === 200){
          this.toast.showToast('Registered', 200);
          this.router.navigate(['/login']);
        }
      });
  }

}

