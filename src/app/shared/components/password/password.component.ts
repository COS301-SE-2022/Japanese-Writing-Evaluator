/*Reference: https://medium.com/learn-ionic-framework/create-a-show-hide-password-component-in-ionic-angular-a3960094726a*/
import { Component , ContentChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  @ContentChild(IonInput) input: IonInput; //
  hide = true; // variable to hide or show password

  constructor() { }

  showPassword(){ // is called when the icon is clicked on
    this.hide = !this.hide;
    if (this.hide) {
      this.input.type = 'password';
    } else {
      this.input.type = 'text';
    }
  }

}
