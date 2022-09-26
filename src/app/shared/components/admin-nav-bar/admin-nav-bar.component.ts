import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.scss'],
})
export class AdminNavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  ifSuperAdmin(){
    if (env.superAdmin === true) {
      return true;
    }
    return false;
  }

}
