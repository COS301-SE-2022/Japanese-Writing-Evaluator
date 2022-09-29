import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { Person } from '../shared/interfaces/role';
import { RoleInfo } from '../shared/interfaces/roleInfo';
import { AppServiceService } from '../services/appService/app-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //Test Data

  selectedView: string;

  userRoles:  Person[];

  constructor(private router: Router, private apiService: AppServiceService) {
    this.selectedView = 'admin';
  }

  ngOnInit() {
    this.apiService.getRoles()
    .subscribe(data => {
      if(data.status === 200){
        this.userRoles = data.body.response;
      }
    });
  }
  //TODO: View admins only, #203, Maryam
  getAdmins(){
    this.selectedView = 'admin';

  }
  //TODO: View users only, #203, Maryam
  getUsers(){
    this.selectedView = 'user';
  }

  //TODO: checking if current person is an admin or user, #203, Maryam
  isAdmin(role: Person){
    if(role.admin === true){
      return 'admin';
    }
    else{
      return 'user';
    }
  }

  //TODO: Sending to profile page the changed roles of the specific user/admin, #203, Maryam
  async roleEvent(details: string[]) {
    if(details[0] !== undefined){
      this.userRoles.forEach(element => {
        if(element.username === details[1] && element.id !== undefined){
          let obj = new Object() as RoleInfo;
          obj = {
            id: element.id,
            admin: this.getBoolOfRole(details[0])
          };
          this.apiService.editRole(obj).subscribe(data => {
            if(data.status === 200){
              window.location.reload();
            }
          });
        }
      });
    }
  }

  getBoolOfRole(role: string){
    if(role === 'admin'){
      return true;
    }
    else{
      return false;
    }
  }

  ifGuest(): boolean{
    if (localStorage.getItem('id')) {
      if (localStorage.getItem('id') === 'guest') {
        return false;
      }
    }

    return true;
  }

  ifNormalNavbar(): boolean{
    if (env.admin === true || env.superAdmin === true) {
      return false;
    }

    return true;
  }

}
