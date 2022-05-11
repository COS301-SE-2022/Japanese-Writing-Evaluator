import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PasswordValidatorModule {
  validatePassword(formControl: FormControl): {[valtype: string]: boolean}{
    // checking if the password matches the regex
    return {validID : true};
  }
}
