import { Injectable } from '@angular/core';
import {  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { LoadingController, ModalController } from '@ionic/angular';
import { catchError, delay, map, retryWhen } from 'rxjs/operators';
import { UploadPage } from '../upload/upload.page';
import { Score } from '../shared/interfaces/score';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { ObdModalComponent } from '../shared/components/obd-modal/obd-modal.component';
import { ObjectDetectionService } from '../services/objectDetection/object-detection.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    //private animeBuilder: AnimationBuilder,
    constructor(private loadingController: LoadingController, private uploadPage: UploadPage, private toast: ToastComponent,
        public modalController: ModalController, private obdService: ObjectDetectionService){

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

        if(req.url.endsWith('progress')){
            return this.generalIntercept(req,next);
        }

        if(req.url.endsWith('forgot-password-email')){
            return this.generalIntercept(req,next);
        }

        if(req.url.endsWith('forgot-password-password')){
            return this.generalIntercept(req,next);
        }

        if(req.url.endsWith('admin/models')){
            return this.generalIntercept(req,next);
        }

        if(req.url.endsWith('object-detection')){
            return this.objDetectionIntercept(req,next);
        }

        if(req.url.endsWith('admin/view-users')){
            return this.generalIntercept(req,next);
        }

        if(req.url.endsWith('admin/edit')){
            return this.generalIntercept(req,next);
        }

        if(req.url.endsWith('admin/getFrequency')){
            return this.generalIntercept(req,next);
        }

        if(req.url.endsWith('deleteUser')){
            return this.generalIntercept(req,next);
        }
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
            catchError((err: HttpErrorResponse) => {
                //console.log('error' + err);
                //show that there is an error in the upload page
                if( err.status === 401){
                    this.loadingController.dismiss();
                    let score = new Object() as Score;
                    score = {
                        data: {
                            strokes: [0],
                            score: 0
                        }
                    };
                    this.uploadPage.showScore(score);
                }
                else{
                    this.loadingController.dismiss();
                    let score = new Object() as Score;
                    score = {
                        data: {
                            strokes: [0],
                            score: -1
                        }
                    };
                    this.uploadPage.showScore(score);
                }
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
                    // TODO: Check if the response is 200 ok
                    this.loadingController.dismiss();
                    if(event.status === 401){
                        let score = new Object() as Score;
                        score = {
                            data: {
                                strokes: [0],
                                score: 0
                            }
                        };
                        this.uploadPage.showScore(score);
                    }
                }
                return event;
              })
        );
    }

    generalIntercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            catchError(err => {
                console.log('error' + err.status);
                if (err.status === 0) {
                    this.toast.showToast('Something went wrong on our side, Try again', 0);
                }
                else if (err.status === 500) {
                    this.toast.showToast('Something went wrong on our side, Try again', 500);
                }
                else if (err.status === 401) {
                    this.toast.showToast('Intruder (User not authorized)', 401);
                }
                //show that there is an error in the upload page
                return EMPTY;
            }),
            retryWhen(err => {
                let retryRequestCount = 1;// remove later
                return err.pipe(
                    delay(1000),
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

    loginIntercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.startLoader('Logging In...');

        return next.handle(req).pipe(
            catchError(err => {
                console.log('error' + err.status);
                if (err.status === 0) {
                    this.toast.showToast('Something went wrong on our side, Try again', 0);
                }
                else if (err.status === 401) {
                    this.toast.showToast('Incorrect email or password. Signup to create a profile', 401);
                }
                //show that there is an error in the upload page
                this.loadingController.dismiss();
                return EMPTY;
            }),
            retryWhen(err => {
                let retryRequestCount = 1;// remove later
                return err.pipe(
                    delay(1000),
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
            }),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.loadingController.dismiss();
                }
                return event;
              })
        );
    }

    registerIntercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.startLoader('Your profile is being created');

        return next.handle(req).pipe(
            catchError(err => {
                console.log('error' + err.status);
                if (err.status === 0) {
                    this.toast.showToast('Something went wrong on our side, Try again', 0);
                }
                else if (err.status === 500) {
                    this.toast.showToast('Something went wrong on our side, Try again', 500);
                }
                //show that there is an error in the upload page
                this.loadingController.dismiss();
                return EMPTY;
            }),
            retryWhen(err => {
                let retryRequestCount = 1;// remove later
                return err.pipe(
                    delay(1000),
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
            }),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.loadingController.dismiss();
                }
                return event;
              })
        );
    }


    objDetectionIntercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.startLoader('Detected items loading...');

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                //console.log('error' + err);
                //show that there is an error in the upload page
                if( err.status === 401){
                    this.loadingController.dismiss();
                    //show error
                }
                return EMPTY;
            }),
            retryWhen(err => {
                let retryRequestCount = 1;// remove later
                return err.pipe(
                    delay(1000),
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
                    // TODO: Check if the response is 200 ok
                    this.loadingController.dismiss();
                    if(event.status === 200){
                        this.showModal();
                    }
                }
                return event;
              })
        );
    }

    async showModal(){
        const modal = await this.modalController.create({
          component: ObdModalComponent
        });
        this.obdService.setModal(modal);
        console.log(modal);
        return await modal.present();
      }

    startLoader(msg: string){
        this.loadingController.getTop().then( isloading => {
            if (!isloading) {
                this.loadingController.create({
                    spinner: 'crescent',
                    message: msg,
                    animated: true,
                    cssClass: 'loader'
                }).then(loader => loader.present());
            }
        });
    }

}



