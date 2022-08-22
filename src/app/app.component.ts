import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  /*https://stackblitz.com/edit/angular-browser-or-tab-close-event?file=src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.component.html*/
  //event listener for when window is closing
  public doUnload(): void {
    this.doBeforeUnload();
  }

  public doBeforeUnload(): void {
    // Clear localStorage when tab is being closed
    alert('Do you want to leave');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
}
