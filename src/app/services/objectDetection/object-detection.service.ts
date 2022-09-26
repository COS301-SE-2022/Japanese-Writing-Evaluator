/* eslint-disable @typescript-eslint/naming-convention */
/*Source: https://ionicframework.com/docs/angular/your-first-app/taking-photos*/
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

//import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { Odpicture, Odresponse, OdresponseElements } from 'src/app/shared/interfaces/odpicture';

@Injectable({
  providedIn: 'root'
})
export class ObjectDetectionService {
  currentModal;
  photo: string;
  responseData: OdresponseElements[] = null;
  baseURL = 'https://flask-api-1-cplmvcuylq-uc.a.run.app/';//localhost is 10.0.2.2 for android studios (change to localhost for website),
  // link for deployed api: https://flask-api-1-cplmvcuylq-uc.a.run.app/
  constructor(private httpClient: HttpClient) { }

  //getter and setter for object detection modal
  public getModal() {
    return this.currentModal;
  }

  public setModal(modal) {
    this.currentModal = modal;
  }

  //TODO: Take a picture to send to backend for object detection, #216, Phumu
  public async getPicture() {
    // Take a photo
    const picture = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photo = picture.webPath;
    if(picture != null){
      const base64Result = await this.readAsBase64(picture);

      let image = new Object() as Odpicture;
      image = {
        image: base64Result,
      };

      this.sendODPicture(image).subscribe(res => {
        this.responseData = [];
        this.responseData = res.body.response;
      });

    }
  }

  // send the base64 string to backend for object detection
  sendODPicture(image: Odpicture): Observable<HttpResponse<Odresponse>> {
    const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}`};
    return this.httpClient.post<Odresponse>(this.baseURL + 'object-detection', image, { headers: myheaders, observe: 'response'});
  }

  // convertToBase64(blob: Blob){
  //   const fileReader = new FileReader();
  //   fileReader.onerror = reject;
  //   fileReader.onload = ()=>{//e
  //     //this.base64Result = e.target.result;
  //     //console.log(this.base64Result);
  //     resolve(fileReader.result);

  //   };
  //   fileReader.readAsDataURL(blob);
  // }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
