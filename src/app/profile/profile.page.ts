import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //Test Data
  users = [
    {name: 'Maryam', role: 'admin'},
    {name: 'Sihle', role: 'admin'},
    {name: 'Phumu', role: 'admin'},
    {name: 'Raymond', role: 'user'},
    {name: 'Phil', role: 'user'},
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  //TODO: Sending to profile page the changed roles of the specific user/admin, #203, Maryam
  roleEvent(details: string[]) {
    console.log(details);
    if(details[0] !== 'undefined'){
      this.users.forEach(element => {
        if(element.name === details[1]){
          element.role = details[0];
        }
      });
    }
  }

  onLogout(){
    // this function logs the user out of the system
    localStorage.removeItem('id');
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);

  }

}
