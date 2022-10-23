/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
// import { Character } from '../shared/character';
import {HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterImage, GuestUploadedImage, UploadedImage } from '../../shared/interfaces/image';
import { Score } from '../../shared/interfaces/score';
import { Id, User } from '../../shared/interfaces/user';
import { Progress } from '../../shared/interfaces/progress';
import { ForgotPasswordEmail, ForgotPasswordPassword } from '../../shared/interfaces/forgotpassword';
import { Models, ModelsArray } from 'src/app/shared/interfaces/models';
import { Role, UserRoles } from 'src/app/shared/interfaces/role';
import { RoleInfo} from 'src/app/shared/interfaces/roleInfo';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  baseURL = 'https://jwe-api-gateway-cplmvcuylq-uc.a.run.app/';
  //http://localhost:8080/
  //localhost is 10.0.2.2 for android studios https://jwe-api-gateway-cplmvcuylq-uc.a.run.app/(change to localhost for website)
  //https://flask-api-1-cplmvcuylq-uc.a.run.app/
  private characterImage: CharacterImage = {
    characterName: ' ',
    group: ' ',
    url: ' '
  };

  //progressMap needed to track progress
  private progressHiragana:  Map<string, {score: number; date: string }[]>;
  private progressKatakana:  Map<string, {score: number; date: string }[]>;
  private progressKanji:  Map<string, {score: number; date: string }[]>;
  private score: Score;
  private userImage;


  constructor(private httpclient: HttpClient) { }//

  setProgressHiragana(map: Map<string, {score: number; date: string }[]>){
      this.progressHiragana = map;
  }

  setProgressKatakana(map: Map<string, {score: number; date: string }[]>){
    this.progressKatakana = map;
  }

  setProgressKanji(map: Map<string, {score: number; date: string }[]>){
  this.progressKanji = map;
  }

  setTryImage(img: CharacterImage){
    //this function takes in an image to be set to the class' image attr
    this.characterImage = img;
  }

  setUserImage(img){
    //this function takes in an image to be set to the class' image attr
    this.userImage = img;
  }

  setScore(score: Score) {
    this.score = score;
  }


  getProgressHiragana(){
    return this.progressHiragana;
  }

  getProgressKatakana(){
    return this.progressKatakana;
  }

  getProgressKanji(){
    return this.progressKanji;
  }

  getTryImage(): CharacterImage{
    //this function returns the class' image attr
    return this.characterImage;
  }

  getUserImage(){
    //this function returns the class' image attr
    return this.userImage;
  }

  getScore(): Score {
    return this.score;
  }

  addUser(name: string, mail: string, pass: string)
  {
    const myheaders = { 'content-type': 'application/json'};
    const user = {
      username: name,
      email: mail,
      password:pass
    };
    const body=JSON.stringify(user);
    return this.httpclient.post(this.baseURL + 'register', body,{headers: myheaders, observe: 'response' });
  }
  // getCharacters(): Observable<Character[]>{
  //   return this.httpclient.get<Character[]>(''); /// calling api to get the character images stored in firebase
  // }

  getProgress(): Observable<HttpResponse<Progress>>{
    // get users progress, feedback for each character practiced
    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}`};
    let body = new Object() as Id;
    body = {
      id: localStorage.getItem('id')
    };
    return this.httpclient.post<Progress>(this.baseURL + 'progress',body,{ headers: myheaders, observe: 'response'});
  }

  uploadImage(uploadedImg: UploadedImage): Observable<HttpResponse<Score>>{// pass through the image as a parameter
    // send image to backend to be evaluated

    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}`};
    return this.httpclient.post<Score>(this.baseURL + 'upload', uploadedImg, { headers: myheaders, observe: 'response'});
  }

  guestUploadImage(img: GuestUploadedImage): Observable<HttpResponse<Score>>{
    const myheaders = { 'content-type': 'application/json' };
    return this.httpclient.post<Score>(this.baseURL + 'guest/upload', img, { headers: myheaders, observe: 'response'});
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

  forgotPasswordEmail(email: ForgotPasswordEmail){
    const myheaders = { 'content-type': 'application/json' };
    return this.httpclient.post(this.baseURL+'forgot-password-email', email, {headers: myheaders, observe: 'response'});
  }

  forgotPasswordPassword(pass: ForgotPasswordPassword){
    const myheaders = { 'content-type': 'application/json' };
    return this.httpclient.put(this.baseURL+'forgot-password-password', pass, {headers: myheaders, observe: 'response'});
  }

  // function for checking if the token has expired
  /* https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3 */
  public isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (token === null && id === 'guest') {
      return true;
    }
    else if (token === '' ) {
      return false;
    }
    else if (token === null) {
      return false;
    }


    return true;
  }


  //TODO: function for api call to get data , #207, Phumudzo Ndou
  //
  adminModelData(): Observable<HttpResponse<ModelsArray>>{
    // get users progress, feedback for each character practiced
    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}`};
    return this.httpclient.get<ModelsArray>(this.baseURL + 'admin/models',{ headers: myheaders, observe: 'response'});
  }

  getRoles(): Observable<HttpResponse<UserRoles>>{
    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}` };
    let userId = new Object() as Role;
    userId = {id: localStorage.getItem('id')};
    return this.httpclient.post<UserRoles>(this.baseURL+'admin/view-users', userId, {headers: myheaders, observe: 'response'});
  }

  editRole(info: RoleInfo){ //post
    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}` };
    return this.httpclient.post(this.baseURL+'admin/edit', info, {headers: myheaders, observe: 'response'});
  }

  getFrequency(): Observable<HttpResponse<ModelsArray>>{
    // get users progress, feedback for each character practiced
    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}`};
    return this.httpclient.get<ModelsArray>(this.baseURL + 'admin/getFrequency',{ headers: myheaders, observe: 'response'});
  }

  getAverages(): Observable<HttpResponse<ModelsArray>>{
    // get users progress, feedback for each character practiced
    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}`};
    return this.httpclient.get<ModelsArray>(this.baseURL + 'admin/edit',{ headers: myheaders, observe: 'response'});
  }

  removeUser(){
    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}`};
    let userId = new Object() as Role;
    userId = {id: localStorage.getItem('id')};
    return this.httpclient.post(this.baseURL + 'deleteUser',userId,{ headers: myheaders, observe: 'response'});
  }

  // getProgress(): Observable<HttpResponse<Progress>>{
  //   // get users progress, feedback for each character practiced
  //   const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}`};
  //   let body = new Object() as Id;
  //   body = {
  //     id: localStorage.getItem('id')
  //   };
  //   return this.httpclient.post<Progress>(this.baseURL + 'progress',body,{ headers: myheaders, observe: 'response'});
  // }

}

