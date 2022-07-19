import { Injectable } from '@angular/core';
import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { catchError, delay, map, retryWhen } from 'rxjs/operators';
import { UploadPage } from '../upload/upload.page';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    //private animeBuilder: AnimationBuilder,
    constructor(private loadingController: LoadingController, private uploadPage: UploadPage){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.endsWith('login')){
            return this.loginIntercept(req,next);
        }

        if(req.url.endsWith('register')){
            return this.registerIntercept(req,next);
        }

        if(req.url.endsWith('upload')){
            return this.uploadIntercept(req,next);
        }
    }

    loginIntercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //intercepts an http request
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

    registerIntercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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

    uploadIntercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
            catchError(() => {
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
                        console.log(retryRequestCount);
                        if(retryRequestCount === 2){
                            throw error;
                        }
                        else{
                            retryRequestCount++;
                            console.log(retryRequestCount);
                        }
                        return error;
                    })
                );
            }),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.loadingController.dismiss();
                    //console.log('event--->>>', event);
                }
                return event;
              })
        );
    }

}



