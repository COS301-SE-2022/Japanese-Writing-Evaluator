import { Injectable } from '@angular/core';
// import { Character } from '../shared/character';
// import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor() { }//private httpclient: HttpClient

  // getCharacters(): Observable<Character[]>{
  //   return this.httpclient.get<Character[]>(''); /// calling api to get the character images stored in firebase
  // }

  getProgress(){
    // get users progress, feedback for each character practiced
  }

  uploadImage(){// pass through the image as a parameter
    // send image to backend to be evaluated
  }

}
