import { Component } from '@angular/core';
import { getStorage , ref } from 'firebase/storage';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
