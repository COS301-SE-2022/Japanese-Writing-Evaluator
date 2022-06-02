import { Injectable } from '@angular/core';
// import { Character } from '../shared/character';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../shared/image';
import { Score } from '../shared/score';
import { User } from '../shared/user';
import { HomeImage } from '../shared/image';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  baseURL = 'http://localhost:5000/';
  private image: Image;
  private homeImage: HomeImage;


  constructor(private httpclient: HttpClient) { }//

  setTryImage(img: Image){
    //this function takes in an image to be set to the class' image attr
    this.image = img;
  }

  getTryImage(): Image{
    //this function returns the class' image attr
    return this.image;
  }

  getHomeImages(): Observable<HomeImage[]>{
    const headers = { 'content-type': 'application/json'};

    return this.httpclient.get<HomeImage[]>(this.baseURL + "/home", {headers});
  }

  addUser(name: string, mail: string, pass: string): Observable<any>
  {
    const headers = { 'content-type': 'application/json'};
    const user = {
      username: name,
      email: mail,
      password:pass
    };
    const body=JSON.stringify(user);
    console.log(body);
    return this.httpclient.post(this.baseURL + '/register', body,{ headers });
  }
  // getCharacters(): Observable<Character[]>{
  //   return this.httpclient.get<Character[]>(''); /// calling api to get the character images stored in firebase
  // }

  getProgress(){
    // get users progress, feedback for each character practiced
  }

  uploadImage(image: File, charName: string, groupName: string): Observable<HttpResponse<Score>>{// pass through the image as a parameter
    // send image to backend to be evaluated
    const myheaders = { 'content-type': 'application/json'};
    let img = new Object() as Image;
    img = {
      userId: localStorage.getItem('id'),
      uploadedImage: image,
      characterName: charName,
      group: groupName
    };
    return this.httpclient.post<Score>(this.baseURL + 'upload', img, { headers: myheaders, observe: 'response'});
  }

  isUser(name: string, pass: string){
    const myheaders = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    let user = new Object() as User;
    user = {
      username: name,
      password:pass
    };
    return this.httpclient.post(this.baseURL + '/login', user, {headers: myheaders, observe: 'response'});
  }

}

