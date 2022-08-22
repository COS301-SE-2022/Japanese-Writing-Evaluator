/*https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3*/
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';;
import { AppServiceService } from '../appService/app-service.service';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate {

  constructor(private service: AppServiceService, private router: Router) { }
  canActivate(): boolean {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
