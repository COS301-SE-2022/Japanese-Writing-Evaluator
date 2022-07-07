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
            this.loadingController.getTop().then( isloading => {
                if (!isloading) {
                    //let animeBuilder: AnimationBuilder = new AnimationBuilder();
                    this.loadingController.create({
                        spinner: 'dots',
                        animated: true,
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
