import { Injectable } from '@angular/core';
// import { Character } from '../shared/character';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { SignUp } from '../sign-up/sign-up';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  baseURL: string =  'http://localhost:5000/';

  constructor(private httpclient: HttpClient) { }//

  addUser(user: SignUp): Observable<any>
  {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(user);
    console.log(body);
    return this.httpclient.post(this.baseURL + 'register', body,{ headers });
  }
  // getCharacters(): Observable<Character[]>{
  //   return this.httpclient.get<Character[]>(''); /// calling api to get the character images stored in firebase
  // }

  getProgress(){
    // get users progress, feedback for each character practiced
  }

  uploadImage(){// pass through the image as a parameter
    // send image to backend to be evaluated
  }

  isUser(name: string, pass: string){
    const user = JSON.stringify({
      username: name,
      password: pass
    });
    return this.httpclient.get<User>(this.baseURL + '/login');
  }

}
