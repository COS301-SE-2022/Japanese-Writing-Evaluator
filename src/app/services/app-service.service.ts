/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
// import { Character } from '../shared/character';
import {HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterImage, GuestUploadedImage, UploadedImage } from '../shared/image';
import { Score } from '../shared/score';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  baseURL = 'http://localhost:5000/';
  private characterImage: CharacterImage = {
    characterName: ' ',
    group: ' ',
    url: ' '
  };


  constructor(private httpclient: HttpClient) { }//

  setTryImage(img: CharacterImage){
    //this function takes in an image to be set to the class' image attr
    this.characterImage = img;
  }

  getTryImage(): CharacterImage{
    //this function returns the class' image attr
    return this.characterImage;
  }

  // getHomeImages(): Observable<CharacterStyle[]>{
  //   const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`};
  //   return this.httpclient.get<CharacterStyle[]>(this.baseURL + '/home', {headers});
  // }

  addUser(name: string, mail: string, pass: string)
  {
    const headers = { 'content-type': 'application/json'};
    const user = {
      username: name,
      email: mail,
      password:pass
    };
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

  uploadImage(uploadedImg: UploadedImage): Observable<HttpResponse<Score>>{// pass through the image as a parameter
    // send image to backend to be evaluated

    const myheaders = { 'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`};
    return this.httpclient.post<Score>(this.baseURL + 'upload', uploadedImg, { headers: myheaders, observe: 'response'});
  }

  guestUploadImage(img: GuestUploadedImage): Observable<HttpResponse<Score>>{
    const myheaders = { 'content-type': 'application/json' };
    return this.httpclient.post<Score>(this.baseURL + 'upload', img, { headers: myheaders, observe: 'response'});
  }

  isUser(name: string, pass: string){
    const myheaders = new HttpHeaders().set('content-type', 'application/json');
    let user = new Object() as User;
    user = {
      email: name,
      password:pass
    };
    return this.httpclient.post(this.baseURL + 'login', user, {headers: myheaders, observe: 'response'});
  }

}

