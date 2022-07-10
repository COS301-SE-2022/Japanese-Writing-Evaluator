import { Injectable } from '@angular/core';
import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
//import {AnimationBuilder} from '@angular/animations';
import { catchError, delay, map, retryWhen } from 'rxjs/operators';
import { UploadPage } from '../upload/upload.page';
//import { AppServiceService } from '../services/app-service.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    //private animeBuilder: AnimationBuilder,
    constructor(private loadingController: LoadingController, private uploadPage: UploadPage){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //intercepts an http request
        if(req.url.endsWith('login')){
            return next.handle(req).pipe(
                catchError(err => {
                    console.log('login error' + err);
                    //show that there is an error in the upload page
                    return EMPTY;
                }),
                retryWhen(err => {
                    let retryRequestCount = 1;// remove later
                    return err.pipe(
                        delay(2000),
                        map(error => {
                            if(retryRequestCount === 2){
                                throw error;
                            }
                            else{
                                retryRequestCount++;
                            }
                            return error;
                        })
                    );
                })
            );
        }

        if(req.url.endsWith('register')){
            return next.handle(req).pipe(
                catchError(err => {
                    console.log('register error' + err);
                    //show that there is an error in the upload page
                    return EMPTY;
                }),
                retryWhen(err => {
                    let retryRequestCount = 1;// remove later
                    return err.pipe(
                        delay(2000),
                        map(error => {
                            if(retryRequestCount === 2){
                                throw error;
                            }
                            else{
                                retryRequestCount++;
                            }
                            return error;
                        })
                    );
                })
            );
        }

        if(req.url.endsWith('upload')){
            const msg: string = '<link href="https://fonts.googleapis.com/css?family=ZCOOL XiaoWei" rel="stylesheet">'+
            '<ion-content>'+
              '<div class="infinity-loader">'+
                '<div class="bg">'+
                 '   <div class="left-bg"></div>'+
                  '  <div class="right-bg"></div>'+
                '</div>'+
                '<div class="fg"> <!--foreground circles-->'+
                  '<div class="top-left-rect">'+
                    '<div></div>'+
                  '</div>'+
                  '<div class="bottom-right-rect">'+
                    '<div></div>'+
                  '</div>'+
                  '<div class="top-right-rect">'+
                    '<div></div>'+
                  '</div>'+
                  '<div class="bottom-left-rect">'+
                    '<div></div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<p class="textOne"><b>LOADING...</b></p>'+
            '</ion-content>';
            this.loadingController.getTop().then( isloading => {
                if (!isloading) {
                    //let animeBuilder: AnimationBuilder = new AnimationBuilder();
                    this.loadingController.create({
                        spinner: null,
                        message: msg,
                        animated: true,
                        cssClass: 'loader'
                        // enterAnimation: this.animeBuilder.build ,
                        // leaveAnimation: animeBuilder
                    }).then(loader => loader.present());
                }
            });

            return next.handle(req).pipe(
                catchError(err => {
                    //console.log('error' + err);
                    //show that there is an error in the upload page
                    this.loadingController.dismiss();
                    this.uploadPage.showScore(-1);
                    return EMPTY;
                }),
                retryWhen(err => {
                    let retryRequestCount = 1;// remove later
                    return err.pipe(
                        delay(2000),
                        map(error => {
                            if(retryRequestCount === 2){
                                throw error;
                            }
                            else{
                                retryRequestCount++;
                            }
                            return error;
                        })
                    );
                })
            );
        }
    }
}
