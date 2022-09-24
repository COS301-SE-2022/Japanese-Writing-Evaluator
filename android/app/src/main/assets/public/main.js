(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 48995:
/*!***************************************************!*\
  !*** ./src/app/Interceptor/loader.interceptor.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadingInterceptor": () => (/* binding */ LoadingInterceptor)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 26439);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 47418);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 46774);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 25843);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var _upload_upload_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../upload/upload.page */ 50292);
/* harmony import */ var _shared_components_toast_toast_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/components/toast/toast.component */ 80257);
/* harmony import */ var _shared_components_obd_modal_obd_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/components/obd-modal/obd-modal.component */ 1777);









let LoadingInterceptor = class LoadingInterceptor {
    //private animeBuilder: AnimationBuilder,
    constructor(loadingController, uploadPage, toast, modalController) {
        this.loadingController = loadingController;
        this.uploadPage = uploadPage;
        this.toast = toast;
        this.modalController = modalController;
    }
    intercept(req, next) {
        if (req.url.endsWith('login')) {
            return this.loginIntercept(req, next);
        }
        if (req.url.endsWith('register')) {
            return this.generalIntercept(req, next);
        }
        if (req.url.endsWith('upload')) {
            return this.uploadIntercept(req, next);
        }
        if (req.url.endsWith('progress')) {
            return this.generalIntercept(req, next);
        }
        if (req.url.endsWith('forgot-password-email')) {
            return this.generalIntercept(req, next);
        }
        if (req.url.endsWith('forgot-password-password')) {
            return this.generalIntercept(req, next);
        }
        if (req.url.endsWith('register')) {
            return this.generalIntercept(req, next);
        }
        if (req.url.endsWith('admin/models')) {
            return this.generalIntercept(req, next);
        }
        if (req.url.endsWith('/object-detection')) {
            return this.objDetectionIntercept(req, next);
        }
    }
    uploadIntercept(req, next) {
        const msg = '<link href="https://fonts.googleapis.com/css?family=ZCOOL XiaoWei" rel="stylesheet">' +
            '<ion-content>' +
            '<div class="infinity-loader">' +
            '<div class="bg">' +
            '   <div class="left-bg"></div>' +
            '  <div class="right-bg"></div>' +
            '</div>' +
            '<div class="fg"> <!--foreground circles-->' +
            '<div class="top-left-rect">' +
            '<div></div>' +
            '</div>' +
            '<div class="bottom-right-rect">' +
            '<div></div>' +
            '</div>' +
            '<div class="top-right-rect">' +
            '<div></div>' +
            '</div>' +
            '<div class="bottom-left-rect">' +
            '<div></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="textOne"><b>LOADING...</b></p>' +
            '</ion-content>';
        this.loadingController.getTop().then(isloading => {
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
        return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)((err) => {
            //console.log('error' + err);
            //show that there is an error in the upload page
            if (err.status === 401) {
                this.loadingController.dismiss();
                let score = new Object();
                score = {
                    data: {
                        stroke1: 0,
                        stroke2: 0,
                        stroke3: 0,
                        score: 0
                    }
                };
                this.uploadPage.showScore(score);
            }
            else {
                this.loadingController.dismiss();
                let score = new Object();
                score = {
                    data: {
                        stroke1: 0,
                        stroke2: 0,
                        stroke3: 0,
                        score: -1
                    }
                };
                this.uploadPage.showScore(score);
            }
            return rxjs__WEBPACK_IMPORTED_MODULE_4__.EMPTY;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.retryWhen)(err => {
            let retryRequestCount = 1; // remove later
            return err.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.delay)(2000), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(error => {
                console.log(retryRequestCount);
                if (retryRequestCount === 2) {
                    throw error;
                }
                else {
                    retryRequestCount++;
                    console.log(retryRequestCount);
                }
                return error;
            }));
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)((event) => {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpResponse) {
                // TODO: Check if the response is 200 ok
                this.loadingController.dismiss();
                if (event.status === 401) {
                    let score = new Object();
                    score = {
                        data: {
                            stroke1: 0,
                            stroke2: 0,
                            stroke3: 0,
                            score: 0
                        }
                    };
                    this.uploadPage.showScore(score);
                }
            }
            return event;
        }));
    }
    generalIntercept(req, next) {
        return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
            console.log('error' + err.status);
            if (err.status === 0) {
                this.toast.showToast('Something went wrong on our side, Try again', 0);
            }
            else if (err.status === 500) {
                this.toast.showToast('Something went wrong on our side, Try again', 500);
            }
            else if (err.status === 401) {
                this.toast.showToast('Incorrect token entered', 401);
            }
            //show that there is an error in the upload page
            return rxjs__WEBPACK_IMPORTED_MODULE_4__.EMPTY;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.retryWhen)(err => {
            let retryRequestCount = 1; // remove later
            return err.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.delay)(1000), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(error => {
                if (retryRequestCount === 2) {
                    throw error;
                }
                else {
                    retryRequestCount++;
                }
                return error;
            }));
        }));
    }
    loginIntercept(req, next) {
        return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
            console.log('error' + err.status);
            console.log(err);
            if (err.status === 0) {
                this.toast.showToast('Something went wrong on our side, Try again', 0);
            }
            else if (err.status === 401) {
                this.toast.showToast('Incorrect email or password. Signup to create a profile', 401);
            }
            //show that there is an error in the upload page
            return rxjs__WEBPACK_IMPORTED_MODULE_4__.EMPTY;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.retryWhen)(err => {
            let retryRequestCount = 1; // remove later
            return err.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.delay)(1000), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(error => {
                if (retryRequestCount === 2) {
                    throw error;
                }
                else {
                    retryRequestCount++;
                }
                return error;
            }));
        }));
    }
    objDetectionIntercept(req, next) {
        this.loadingController.getTop().then(isloading => {
            if (!isloading) {
                this.loadingController.create({
                    spinner: 'crescent',
                    message: 'Detected items loading...',
                    animated: true,
                    cssClass: 'loader'
                    // enterAnimation: this.animeBuilder.build ,
                    // leaveAnimation: animeBuilder
                }).then(loader => loader.present());
            }
        });
        return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)((err) => {
            //console.log('error' + err);
            //show that there is an error in the upload page
            if (err.status === 401) {
                this.loadingController.dismiss();
                //show error
            }
            return rxjs__WEBPACK_IMPORTED_MODULE_4__.EMPTY;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.retryWhen)(err => {
            let retryRequestCount = 1; // remove later
            return err.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.delay)(1000), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(error => {
                console.log(retryRequestCount);
                if (retryRequestCount === 2) {
                    throw error;
                }
                else {
                    retryRequestCount++;
                    console.log(retryRequestCount);
                }
                return error;
            }));
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)((event) => {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpResponse) {
                // TODO: Check if the response is 200 ok
                this.loadingController.dismiss();
                if (event.status === 200) {
                    this.showModal();
                }
            }
            return event;
        }));
    }
    showModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _shared_components_obd_modal_obd_modal_component__WEBPACK_IMPORTED_MODULE_2__.ObdModalComponent
            });
            return yield modal.present();
        });
    }
};
LoadingInterceptor.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.LoadingController },
    { type: _upload_upload_page__WEBPACK_IMPORTED_MODULE_0__.UploadPage },
    { type: _shared_components_toast_toast_component__WEBPACK_IMPORTED_MODULE_1__.ToastComponent },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController }
];
LoadingInterceptor = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injectable)()
], LoadingInterceptor);



/***/ }),

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _app_services_routeGaurd_routeguard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/services/routeGaurd/routeguard.service */ 60503);




const routes = [
    {
        path: 'home',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_progress_progress_page_ts-src_app_shared_components_logout_logout_module_ts-s-2e9e61"), __webpack_require__.e("src_app_home_home_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./home/home.module */ 3467)).then(m => m.HomePageModule),
        canActivate: [_app_services_routeGaurd_routeguard_service__WEBPACK_IMPORTED_MODULE_0__.RouteguardService] //checks if the user is authenticated, if not the user will be redirected to login
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_login_login_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./login/login.module */ 80107)).then(m => m.LoginPageModule)
    },
    {
        path: 'sign-up',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_sign-up_sign-up_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./sign-up/sign-up.module */ 73982)).then(m => m.SignUpPageModule)
    },
    {
        path: 'progress',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_progress_progress_page_ts-src_app_shared_components_logout_logout_module_ts-s-2e9e61"), __webpack_require__.e("src_app_progress_progress_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./progress/progress.module */ 17072)).then(m => m.ProgressPageModule),
        canActivate: [_app_services_routeGaurd_routeguard_service__WEBPACK_IMPORTED_MODULE_0__.RouteguardService]
    },
    {
        path: 'upload',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_upload_upload_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./upload/upload.module */ 54494)).then(m => m.UploadPageModule),
        canActivate: [_app_services_routeGaurd_routeguard_service__WEBPACK_IMPORTED_MODULE_0__.RouteguardService]
    },
    {
        path: 'forgot-password-email',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_forgot-password-email_forgot-password-email_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./forgot-password-email/forgot-password-email.module */ 45416)).then(m => m.ForgotPasswordEmailPageModule)
    },
    {
        path: 'forgot-password-password',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_forgot-password-password_forgot-password-password_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./forgot-password-password/forgot-password-password.module */ 61836)).then(m => m.ForgotPasswordPasswordPageModule)
    },
    {
        path: 'models',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_chart_js_dist_Chart_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_models_models_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./models/models.module */ 4658)).then(m => m.ModelsPageModule),
    },
    {
        path: 'profile',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_profile_profile_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./profile/profile.module */ 84523)).then(m => m.ProfilePageModule),
    },
    {
        path: 'dashboard',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_chart_js_dist_Chart_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_dashboard_dashboard_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./dashboard/dashboard.module */ 34814)).then(m => m.DashboardPageModule)
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_3__.PreloadAllModules })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], AppRoutingModule);



/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.html?ngResource */ 33383);
/* harmony import */ var _app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss?ngResource */ 79259);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_pwa_elements_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/pwa-elements/loader */ 38763);





let AppComponent = class AppComponent {
    constructor() {
        (0,_ionic_pwa_elements_loader__WEBPACK_IMPORTED_MODULE_2__.defineCustomElements)(window);
    }
};
AppComponent.ctorParameters = () => [];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-root',
        template: _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AppComponent);



/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var _Interceptor_loader_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Interceptor/loader.interceptor */ 48995);
/* harmony import */ var _upload_upload_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upload/upload.page */ 50292);
/* harmony import */ var _shared_components_toast_toast_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/components/toast/toast.component */ 80257);
/* harmony import */ var _shared_components_obd_modal_obd_modal_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/components/obd-modal/obd-modal.module */ 60653);













let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
        entryComponents: [],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule.forRoot(),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule,
        ],
        providers: [
            { provide: _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouteReuseStrategy, useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicRouteStrategy },
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HTTP_INTERCEPTORS, useClass: _Interceptor_loader_interceptor__WEBPACK_IMPORTED_MODULE_2__.LoadingInterceptor, multi: true },
            _upload_upload_page__WEBPACK_IMPORTED_MODULE_3__.UploadPage,
            _shared_components_toast_toast_component__WEBPACK_IMPORTED_MODULE_4__.ToastComponent,
            _shared_components_obd_modal_obd_modal_module__WEBPACK_IMPORTED_MODULE_5__.ObdModalModule
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    })
], AppModule);



/***/ }),

/***/ 52741:
/*!************************************************************!*\
  !*** ./src/app/services/appService/app-service.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppServiceService": () => (/* binding */ AppServiceService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 28784);

/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */

// import { Character } from '../shared/character';

let AppServiceService = class AppServiceService {
    constructor(httpclient) {
        this.httpclient = httpclient;
        this.baseURL = 'http://127.0.0.1:5000/'; //localhost is 10.0.2.2 for android studios (change to localhost for website)
        this.characterImage = {
            characterName: ' ',
            group: ' ',
            url: ' '
        };
    } //
    setTryImage(img) {
        //this function takes in an image to be set to the class' image attr
        this.characterImage = img;
    }
    getTryImage() {
        //this function returns the class' image attr
        return this.characterImage;
    }
    // getHomeImages(): Observable<CharacterStyle[]>{
    //   const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`};
    //   return this.httpclient.get<CharacterStyle[]>(this.baseURL + '/home', {headers});
    // }
    addUser(name, mail, pass) {
        const myheaders = { 'content-type': 'application/json' };
        const user = {
            username: name,
            email: mail,
            password: pass
        };
        const body = JSON.stringify(user);
        return this.httpclient.post(this.baseURL + 'register', body, { headers: myheaders, observe: 'response' });
    }
    // getCharacters(): Observable<Character[]>{
    //   return this.httpclient.get<Character[]>(''); /// calling api to get the character images stored in firebase
    // }
    getProgress() {
        // get users progress, feedback for each character practiced
        const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}` };
        let body = new Object();
        body = {
            id: localStorage.getItem('id')
        };
        return this.httpclient.post(this.baseURL + 'progress', body, { headers: myheaders, observe: 'response' });
    }
    uploadImage(uploadedImg) {
        // send image to backend to be evaluated
        const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}` };
        return this.httpclient.post(this.baseURL + 'upload', uploadedImg, { headers: myheaders, observe: 'response' });
    }
    guestUploadImage(img) {
        const myheaders = { 'content-type': 'application/json' };
        return this.httpclient.post(this.baseURL + 'guest/upload', img, { headers: myheaders, observe: 'response' });
    }
    isUser(name, pass) {
        const myheaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders().set('content-type', 'application/json');
        let user = new Object();
        user = {
            email: name,
            password: pass
        };
        return this.httpclient.post(this.baseURL + 'login', user, { headers: myheaders, observe: 'response' });
    }
    forgotPasswordEmail(email) {
        const myheaders = { 'content-type': 'application/json' };
        return this.httpclient.post(this.baseURL + 'forgot-password-email', email, { headers: myheaders, observe: 'response' });
    }
    forgotPasswordPassword(pass) {
        const myheaders = { 'content-type': 'application/json' };
        return this.httpclient.put(this.baseURL + 'forgot-password-password', pass, { headers: myheaders, observe: 'response' });
    }
    // function for checking if the token has expired
    /* https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3 */
    isAuthenticated() {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if (token === null && id === 'guest') {
            return true;
        }
        else if (token === '') {
            return false;
        }
        else if (token === null) {
            return false;
        }
        return true;
    }
    //TODO: function for api call to get data , #207, Phumudzo Ndou
    //
    adminModelData() {
        // get users progress, feedback for each character practiced
        const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}` };
        return this.httpclient.get(this.baseURL + 'admin/models', { headers: myheaders, observe: 'response' });
    }
};
AppServiceService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient }
];
AppServiceService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root'
    })
], AppServiceService);



/***/ }),

/***/ 17154:
/*!**********************************************************************!*\
  !*** ./src/app/services/objectDetection/object-detection.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectDetectionService": () => (/* binding */ ObjectDetectionService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _capacitor_camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/camera */ 4241);

/* eslint-disable @typescript-eslint/naming-convention */
/*Source: https://ionicframework.com/docs/angular/your-first-app/taking-photos*/



let ObjectDetectionService = class ObjectDetectionService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.responseData = null;
        this.baseURL = 'http://localhost:5000/'; //localhost is 10.0.2.2 for android studios (change to localhost for website)
        this.convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    }
    //TODO: Take a picture to send to backend for object detection, #216, Phumu
    getPicture() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            // Take a photo
            const picture = yield _capacitor_camera__WEBPACK_IMPORTED_MODULE_0__.Camera.getPhoto({
                resultType: _capacitor_camera__WEBPACK_IMPORTED_MODULE_0__.CameraResultType.Uri,
                source: _capacitor_camera__WEBPACK_IMPORTED_MODULE_0__.CameraSource.Camera,
                quality: 100
            });
            this.photo = picture.webPath;
            if (picture != null) {
                const base64Result = yield this.readAsBase64(picture);
                let image = new Object();
                image = {
                    image: base64Result,
                };
                this.sendODPicture(image).subscribe(res => {
                    this.responseData = [];
                    this.responseData = res.body.response;
                });
            }
        });
    }
    // send the base64 string to backend for object detection
    sendODPicture(image) {
        const myheaders = { 'content-type': 'application/json', 'user-token': ` ${localStorage.getItem('token')}` };
        return this.httpClient.post(this.baseURL + '/object-detection', image, { headers: myheaders, observe: 'response' });
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
    readAsBase64(photo) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = yield fetch(photo.webPath);
            const blob = yield response.blob();
            return yield this.convertBlobToBase64(blob);
        });
    }
};
ObjectDetectionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient }
];
ObjectDetectionService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
        providedIn: 'root'
    })
], ObjectDetectionService);



/***/ }),

/***/ 60503:
/*!***********************************************************!*\
  !*** ./src/app/services/routeGaurd/routeguard.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RouteguardService": () => (/* binding */ RouteguardService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _appService_app_service_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../appService/app-service.service */ 52741);

/*https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3*/


;

let RouteguardService = class RouteguardService {
    constructor(service, router) {
        this.service = service;
        this.router = router;
    }
    canActivate() {
        if (!this.service.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
};
RouteguardService.ctorParameters = () => [
    { type: _appService_app_service_service__WEBPACK_IMPORTED_MODULE_0__.AppServiceService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__.Router }
];
RouteguardService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
        providedIn: 'root'
    })
], RouteguardService);



/***/ }),

/***/ 1777:
/*!********************************************************************!*\
  !*** ./src/app/shared/components/obd-modal/obd-modal.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObdModalComponent": () => (/* binding */ ObdModalComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _obd_modal_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./obd-modal.component.html?ngResource */ 6962);
/* harmony import */ var _obd_modal_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./obd-modal.component.scss?ngResource */ 59225);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_services_objectDetection_object_detection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/objectDetection/object-detection.service */ 17154);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper */ 63587);
/* harmony import */ var src_app_services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/appService/app-service.service */ 52741);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 52816);









swiper__WEBPACK_IMPORTED_MODULE_3__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_3__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_3__.Keyboard, swiper__WEBPACK_IMPORTED_MODULE_3__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_3__.Scrollbar, swiper__WEBPACK_IMPORTED_MODULE_3__.Zoom]);
let ObdModalComponent = class ObdModalComponent {
    constructor(modalController, objDectService, service, router) {
        this.modalController = modalController;
        this.objDectService = objDectService;
        this.service = service;
        this.router = router;
    }
    ngOnInit() {
        this.objectsArr = this.objDectService.responseData;
        this.photo = this.objDectService.photo;
        // .forEach(element => {
        //     this.objectsArr.push(element);
        //   });
        // this.objectsArr = this.objDectService.responseData;
        console.log(this.objectsArr);
    }
    showUploadPage(character) {
        //send image to the upload page and redirect to upload page
        const image = {
            characterName: '',
            group: '',
            url: character
        };
        this.service.setTryImage(image);
        this.router.navigate(['/upload']);
        this.dismiss();
        setTimeout(() => {
            console.log('wait');
        }, 5000);
    }
    dismiss() {
        this.modalController.dismiss();
    }
};
ObdModalComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController },
    { type: src_app_services_objectDetection_object_detection_service__WEBPACK_IMPORTED_MODULE_2__.ObjectDetectionService },
    { type: src_app_services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_4__.AppServiceService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router }
];
ObdModalComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-obd-modal',
        template: _obd_modal_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_obd_modal_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ObdModalComponent);



/***/ }),

/***/ 60653:
/*!*****************************************************************!*\
  !*** ./src/app/shared/components/obd-modal/obd-modal.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObdModalModule": () => (/* binding */ ObdModalModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _obd_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./obd-modal.component */ 1777);






let ObdModalModule = class ObdModalModule {
};
ObdModalModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        declarations: [_obd_modal_component__WEBPACK_IMPORTED_MODULE_0__.ObdModalComponent],
        imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule],
        exports: [_obd_modal_component__WEBPACK_IMPORTED_MODULE_0__.ObdModalComponent]
    })
], ObdModalModule);



/***/ }),

/***/ 80257:
/*!************************************************************!*\
  !*** ./src/app/shared/components/toast/toast.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToastComponent": () => (/* binding */ ToastComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _toast_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toast.component.html?ngResource */ 70130);
/* harmony import */ var _toast_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toast.component.scss?ngResource */ 81722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 93819);





let ToastComponent = class ToastComponent {
    constructor(toastController) {
        this.toastController = toastController;
    }
    ngOnInit() { }
    showToast(msg, type) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            let toast;
            switch (type) {
                case 0:
                    toast = yield this.toastController.create({
                        message: msg,
                        position: 'bottom',
                        duration: 2000,
                        color: 'danger'
                    });
                    break;
                case 500:
                    toast = yield this.toastController.create({
                        message: msg,
                        position: 'bottom',
                        duration: 2000,
                        color: 'danger'
                    });
                    break;
                case 401:
                    toast = yield this.toastController.create({
                        message: msg,
                        position: 'bottom',
                        duration: 2000,
                        color: 'warning'
                    });
                    break;
                case 200:
                    toast = yield this.toastController.create({
                        message: msg,
                        position: 'bottom',
                        duration: 2000,
                        color: 'success'
                    });
                    break;
                default:
                    break;
            }
            toast.present();
        });
    }
};
ToastComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ToastController }
];
ToastComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-toast',
        template: _toast_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_toast_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ToastComponent);



/***/ }),

/***/ 50292:
/*!***************************************!*\
  !*** ./src/app/upload/upload.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UploadPage": () => (/* binding */ UploadPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _upload_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upload.page.html?ngResource */ 39669);
/* harmony import */ var _upload_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upload.page.scss?ngResource */ 33474);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/appService/app-service.service */ 52741);



/* eslint-disable max-len */



let UploadPage = class UploadPage {
    //TODO:add form parameters to constructor, #71, Phumu
    constructor(service, alertController) {
        this.service = service;
        this.alertController = alertController;
    }
    //TODO: get the character image to be practiced, #71, Phumu
    ngOnInit() {
        this.characterImage = this.service.getTryImage();
    }
    // ${this.characterImage.url}
    //TODO: show popover when evaluate is clicked, #71, Phumu
    showScore(score) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            //if score is negative 1 == error
            let scoreMessage;
            let alert;
            if (score.data.score === -1) {
                scoreMessage = 'Try again'; // todo: add error message, #68, Phumu
                alert = yield this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: 'Something went wrong...',
                    message: `<ion-img src="../../assets/icon/uploaderror.png" alt="Error Image" ></ion-img>${scoreMessage}`,
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {
                                console.log('Confirm Okay');
                            }
                        }
                    ]
                });
            }
            else if (score.data.score === 0) {
                scoreMessage = 'Try upload another image'; // todo: add error message, #68, Phumu
                alert = yield this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: 'Image is invalid...',
                    message: `<ion-img src="../../assets/icon/uploaderror.png" alt="Error Image" ></ion-img>${scoreMessage}`,
                    buttons: [
                        {
                            text: 'Retry',
                            handler: () => {
                                console.log('Confirm Okay');
                            }
                        }
                    ]
                });
            }
            else { // link for image for stroke: https://www.nicepng.com/downpng/u2w7e6r5q8t4u2r5_hiragana-strokes-vowels-hiragana-stroke-order/
                scoreMessage = 'Your overall score is ' + Math.round(score.data.score).toString();
                const charImageUrl = '../assets/upload/' + this.characterImage.characterName + '.jpg';
                alert = yield this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: 'Character Accuracy',
                    message: `
        <h1>${this.characterImage.url}</h1>${scoreMessage}
        <h4>Your character</h4>
        <ion-img src="${this.userImage}"></ion-img>
        <h4>Accurate character</h4>
        <ion-img src="${charImageUrl}"></ion-img>
        <div>
          <ion-item>
          <p class="stroke1">o </p><p>Stroke 1: ${Math.round(score.data.stroke1)}</p> 
          </ion-item>
          <ion-item>
          <p class="stroke2">o </p><p>Stroke 2: ${Math.round(score.data.stroke2)}</p> 
          </ion-item>
          <ion-item>
          <p class="stroke3">o </p><p>Stroke 3: ${Math.round(score.data.stroke3)}</p> 
          </ion-item>
        </div>`,
                    buttons: [
                        {
                            text: 'Close',
                            handler: () => {
                                console.log('Confirm Okay');
                            }
                        }
                    ]
                });
            }
            /*images for the strokes
              <ion-img src="../assets/images/a_strokes/a_stroke1.png" alt="Stroke 1"></ion-img>
              <ion-img src="../assets/images/a_strokes/a_stroke2.png" alt="Stroke 2">
              <ion-img src="../assets/images/a_strokes/a_stroke3.png" alt="Stroke 3"></ion-img>
            */
            yield alert.present();
            // const { role } = await alert.onDidDismiss();
            // console.log('onDidDismiss resolved with role', role);
        });
    }
    //TODO: get uploaded image from the file input, #71, Phumu
    getUploadedImage($event) {
        this.uploadedImage = $event.target.files[0];
        this.convertImageToBase64(this.uploadedImage);
        this.uploadImageName = $event.target.files[0].name;
    }
    convertImageToBase64(file) {
        //let base64Result;
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            this.base64Result = e.target.result;
            this.userImage = fileReader.result;
            //console.log(this.base64Result);
        };
        fileReader.readAsDataURL(file);
        //console.log(this.base64Result);
        //return base64Result;
    }
    //TODO: send image to backend to be evaluated by the AI, #71, Phumu
    evaluateImage() {
        // add if user is a guest
        if (this.uploadedImage != null && localStorage.getItem('id') !== '') {
            let base64String = '';
            base64String = this.base64Result;
            //console.log('in');
            if (localStorage.getItem('id') !== 'guest') {
                //console.log('in');
                let img = new Object();
                img = {
                    id: localStorage.getItem('id'),
                    image: base64String,
                    imagechar: this.characterImage.characterName,
                    file: this.uploadImageName,
                    style: this.characterImage.group, // the writing style that the letter is from
                };
                this.service.uploadImage(img).subscribe(data => {
                    this.score = data.body;
                    this.showScore(this.score);
                });
                // get the score
            }
            else {
                let img = new Object();
                img = {
                    image: base64String,
                    imagechar: this.characterImage.characterName,
                    style: this.characterImage.group
                };
                this.service.guestUploadImage(img).subscribe(data => {
                    this.score = data.body;
                    this.showScore(this.score);
                });
            }
        }
    }
    ifGuest() {
        if (localStorage.getItem('id')) {
            if (localStorage.getItem('id') === 'guest') {
                //console.log(localStorage.getItem('id'));
                return true;
            }
        }
        return false;
    }
};
UploadPage.ctorParameters = () => [
    { type: _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__.AppServiceService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.AlertController }
];
UploadPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-upload',
        template: _upload_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_upload_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], UploadPage);



/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 68150);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 92340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.log(err));


/***/ }),

/***/ 50863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-accordion_2.entry.js": [
		70079,
		"common",
		"node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js"
	],
	"./ion-action-sheet.entry.js": [
		25593,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		13225,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		4812,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		86655,
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		44856,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		13059,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-breadcrumb_2.entry.js": [
		58648,
		"common",
		"node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js"
	],
	"./ion-button_2.entry.js": [
		98308,
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		44690,
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		64090,
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		36214,
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		69447,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime-button.entry.js": [
		17950,
		"default-node_modules_ionic_core_dist_esm_parse-1c2207b2_js-node_modules_ionic_core_dist_esm_t-5248a4",
		"node_modules_ionic_core_dist_esm_ion-datetime-button_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		79689,
		"default-node_modules_ionic_core_dist_esm_parse-1c2207b2_js-node_modules_ionic_core_dist_esm_t-5248a4",
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		18840,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		40749,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		69667,
		"common",
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		83288,
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		35473,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		53634,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		22855,
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		495,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		58737,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		99632,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-picker-column-internal.entry.js": [
		54446,
		"common",
		"node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js"
	],
	"./ion-picker-internal.entry.js": [
		32275,
		"node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js"
	],
	"./ion-popover.entry.js": [
		48050,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		18994,
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		23592,
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		35454,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		290,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		92666,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		64816,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		45534,
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		94902,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		91938,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		78179,
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		90668,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		61624,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		19989,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		28902,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		70199,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		48395,
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		96357,
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		38268,
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		15269,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		32875,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 50863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 55899:
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/pwa-elements/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \**************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./pwa-action-sheet.entry.js": [
		45464,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-action-sheet_entry_js"
	],
	"./pwa-camera-modal-instance.entry.js": [
		68724,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-camera-modal-instance_entry_js"
	],
	"./pwa-camera-modal.entry.js": [
		8145,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-camera-modal_entry_js"
	],
	"./pwa-camera.entry.js": [
		30527,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-camera_entry_js"
	],
	"./pwa-toast.entry.js": [
		44389,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-toast_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 55899;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 79259:
/*!***********************************************!*\
  !*** ./src/app/app.component.scss?ngResource ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 59225:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/obd-modal/obd-modal.component.scss?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = ".character {\n  width: 100px;\n  height: 100px;\n  background: #ffffff;\n  border-radius: 5%;\n  position: relative;\n  top: -10px;\n  border: 5px solid #960722;\n  text-align: center;\n}\n\n.horizontalflexbox {\n  display: flex;\n  align-items: row;\n  justify-content: center;\n}\n\nion-card:hover {\n  transform: scale(1.1);\n  box-shadow: 15px 15px 15px -10px rgba(0, 0, 0, 0.4);\n}\n\nion-img {\n  width: 100px;\n  height: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9iZC1tb2RhbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQkFBQTtFQUNBLG1EQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtBQUNGIiwiZmlsZSI6Im9iZC1tb2RhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jaGFyYWN0ZXJ7XG4gICAgd2lkdGg6IDEwMHB4O1xuICAgIGhlaWdodDogMTAwcHg7XG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA1JTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAtMTBweDtcbiAgICBib3JkZXI6IDVweCBzb2xpZCAjOTYwNzIyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4uaG9yaXpvbnRhbGZsZXhib3h7XG4gIGRpc3BsYXk6ZmxleDtcbiAgYWxpZ24taXRlbXM6IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbmlvbi1jYXJkOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICBib3gtc2hhZG93OiAxNXB4IDE1cHggMTVweCAtMTBweCByZ2JhKDAsIDAsIDAsIDAuNCk7XG59XG5cbmlvbi1pbWd7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiAxMDBweDtcbn0iXX0= */";

/***/ }),

/***/ 81722:
/*!*************************************************************************!*\
  !*** ./src/app/shared/components/toast/toast.component.scss?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0b2FzdC5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 33474:
/*!****************************************************!*\
  !*** ./src/app/upload/upload.page.scss?ngResource ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "#foregroundDiv {\n  width: 210px;\n  height: 210px;\n  background-color: white;\n  border-radius: 10%;\n}\n\n#backgroundDiv {\n  width: 240px;\n  height: 240px;\n  background-color: #960722;\n  border-radius: 10%;\n  box-shadow: 3px 3px 6px -1px rgba(0, 0, 0, 0.68);\n}\n\n.input {\n  height: 40px;\n  outline: auto;\n}\n\n::-webkit-file-upload-button {\n  background-color: black;\n  color: white;\n  font-family: \"ZCOOL XiaoWei\";\n  border-color: black;\n  height: 40px;\n}\n\n@media screen and (min-width: 1008px) {\n  .horizontalflexbox {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    margin-bottom: 5%;\n    margin-top: 5%;\n  }\n}\n\n@media screen and (min-width: 641px) and (max-width: 1007px) {\n  .horizontalflexbox {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    margin-bottom: 10%;\n    margin-top: 10%;\n  }\n}\n\n@media screen and (max-width: 640px) and (min-width: 360px) {\n  .horizontalflexbox {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    margin-bottom: 20%;\n    margin-top: 20%;\n  }\n}\n\n@media screen and (max-width: 360px) {\n  .horizontalflexbox {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    margin-bottom: 75px;\n    margin-top: 100px;\n  }\n\n  .input {\n    width: 230px;\n  }\n\n  ion-card {\n    size: 6;\n  }\n}\n\n.flexbox {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.character {\n  width: 210px;\n  height: 210px;\n  background: #ffffff;\n  border-radius: 10%;\n  position: relative;\n  margin: 5%;\n}\n\n.character h1 {\n  font-size: 130px;\n  text-align: center;\n}\n\n.character p {\n  padding-bottom: 150px;\n  text-align: center;\n}\n\n.stroke1 {\n  color: blue;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFBRjs7QUFPQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdEQUFBO0FBSkY7O0FBT0E7RUFDRSxZQUFBO0VBQ0EsYUFBQTtBQUpGOztBQU9BO0VBQ0UsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsNEJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFKRjs7QUFtQkE7RUFDRTtJQUNFLGFBQUE7SUFDQSxtQkFBQTtJQUNBLHVCQUFBO0lBQ0EsaUJBQUE7SUFDQSxjQUFBO0VBaEJGO0FBQ0Y7O0FBbUJBO0VBQ0U7SUFDRSxhQUFBO0lBQ0EsbUJBQUE7SUFDQSx1QkFBQTtJQUNBLGtCQUFBO0lBQ0EsZUFBQTtFQWpCRjtBQUNGOztBQW9CQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLG1CQUFBO0lBQ0EsdUJBQUE7SUFDQSxrQkFBQTtJQUNBLGVBQUE7RUFsQkY7QUFDRjs7QUFxQkE7RUFDRTtJQUNFLGFBQUE7SUFDQSxtQkFBQTtJQUNBLHVCQUFBO0lBQ0EsbUJBQUE7SUFDQSxpQkFBQTtFQW5CRjs7RUFzQkE7SUFDRSxZQUFBO0VBbkJGOztFQXNCQTtJQUNFLE9BQUE7RUFuQkY7QUFDRjs7QUF1QkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQXJCRjs7QUF3QkE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUFyQkY7O0FBd0JBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtBQXJCRjs7QUF3QkE7RUFDRSxxQkFBQTtFQUNBLGtCQUFBO0FBckJGOztBQXdCQTtFQUNFLFdBQUE7QUFyQkYiLCJmaWxlIjoidXBsb2FkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuI2ZvcmVncm91bmREaXZ7XG4gIHdpZHRoOiAyMTBweDtcbiAgaGVpZ2h0OiAyMTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgLy8gcG9zaXRpb246IHJlbGF0aXZlO1xuICAvLyB0b3A6IDUuNXB4O1xuICAvLyBsZWZ0OiA1LjVweDtcbiAgXG59XG5cbiNiYWNrZ3JvdW5kRGl2e1xuICB3aWR0aDogMjQwcHg7XG4gIGhlaWdodDogMjQwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5NjA3MjI7XG4gIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgYm94LXNoYWRvdzogM3B4IDNweCA2cHggLTFweCByZ2JhKDAsMCwwLDAuNjgpO1xufVxuXG4uaW5wdXR7XG4gIGhlaWdodDogNDBweDtcbiAgb3V0bGluZTogYXV0bztcbn1cblxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbntcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1mYW1pbHk6J1pDT09MIFhpYW9XZWknO1xuICBib3JkZXItY29sb3I6IGJsYWNrO1xuICBoZWlnaHQ6IDQwcHg7XG59XG5cblxuXG4vLyAuaG9yaXpvbnRhbGZsZXhib3h7XG4vLyAgIGRpc3BsYXk6IGZsZXg7XG4vLyAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4vLyAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuLy8gICBtYXJnaW4tYm90dG9tOiA1JTtcbi8vICAgbWFyZ2luLXRvcDogNSU7XG4vLyB9XG5cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDA4cHgpICB7XG4gIC5ob3Jpem9udGFsZmxleGJveHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogNSU7XG4gICAgbWFyZ2luLXRvcDogNSU7XG4gIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjQxcHgpIGFuZCAobWF4LXdpZHRoOiAxMDA3cHgpIHtcbiAgLmhvcml6b250YWxmbGV4Ym94e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAxMCU7XG4gICAgbWFyZ2luLXRvcDogMTAlO1xuICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSBhbmQgKG1pbi13aWR0aDogMzYwcHgpIHtcbiAgLmhvcml6b250YWxmbGV4Ym94e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAyMCU7XG4gICAgbWFyZ2luLXRvcDogMjAlO1xuICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XG4gIC5ob3Jpem9udGFsZmxleGJveHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcbiAgfVxuXG4gIC5pbnB1dHtcbiAgICB3aWR0aDogMjMwcHg7XG4gIH1cblxuICBpb24tY2FyZHtcbiAgICBzaXplOiA2O1xuICB9XG4gXG59XG5cbi5mbGV4Ym94e1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmNoYXJhY3RlcntcbiAgd2lkdGg6IDIxMHB4O1xuICBoZWlnaHQ6IDIxMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3JkZXItcmFkaXVzOiAxMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiA1JTtcbn1cblxuLmNoYXJhY3RlciBoMXtcbiAgZm9udC1zaXplOiAxMzBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2hhcmFjdGVyIHB7XG4gIHBhZGRpbmctYm90dG9tOiAxNTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uc3Ryb2tlMXtcbiAgY29sb3I6IGJsdWU7XG59Il19 */";

/***/ }),

/***/ 33383:
/*!***********************************************!*\
  !*** ./src/app/app.component.html?ngResource ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-app>\n  <ion-router-outlet ></ion-router-outlet><!--(window:beforeunload)=\"doBeforeUnload()\" (window:unload)=\"doUnload()\"-->\n</ion-app>\n";

/***/ }),

/***/ 6962:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/obd-modal/obd-modal.component.html?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--Creating slides for the object detection-->\n<!-- <ion-modal #modal trigger=\"open-modal\">\n  <ng-template>\n     -->\n  <ion-toolbar>\n    <ion-title>Modal</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"dark\" (click)=\"dismiss()\">Close</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n  \n  <ion-content>\n    <!--<swiper [autoplay]=\"true\" [keyboard]=\"true\" [pagination]=\"true\" [scrollbar]=\"true\" [zoom]=\"true\">\n      <ng-template swiper-slide  >-->\n      <ion-item *ngFor=\"let obj of objectsArr\" class=\"horizontalflexbox\">\n          <ion-grid>\n          <ion-row>\n            <ion-img [src]=\"this.photo\"></ion-img> <!--image of the identified object-->\n          </ion-row>\n          <ion-row>\n            <h4 >Identified item: {{obj.object}}</h4><!--name of object identified-->\n          </ion-row>\n          <ion-row>\n            <h4>Pronunciation: {{obj.pronunciation}}</h4><!--japanese pronounciation of object identified-->\n          </ion-row>\n          <ion-row>\n            <h4>Try the word's characters:</h4>\n          </ion-row>\n          <div class=\"horizontalflexbox\">\n            <ion-item *ngFor=\"let char of obj.characters\" lines=\"none\"><!-- -->\n              <ion-card class=\"character\" (click)=\"showUploadPage(char)\"><!--(click)=\"showUploadPage()\" -->\n              <h1>{{char}}</h1>\n              </ion-card>   <!--get every character in the identified word-->\n            </ion-item>\n          </div>\n      </ion-grid>\n      </ion-item>\n      <!--</ng-template>\n    </swiper>-->\n  </ion-content> \n    <!-- \n  </ng-template>\n</ion-modal> -->\n";

/***/ }),

/***/ 70130:
/*!*************************************************************************!*\
  !*** ./src/app/shared/components/toast/toast.component.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<p>\n  toast works!\n</p>\n";

/***/ }),

/***/ 39669:
/*!****************************************************!*\
  !*** ./src/app/upload/upload.page.html?ngResource ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content>\n  <div class=\"horizontalflexbox\">\n    <div lines=\"none\" id=\"backgroundDiv\" >\n      <div class=\"flexbox\">\n        <div lines=\"none\" class=\"character\">\n          <h1>{{characterImage.url}}</h1>\n          <!--characterImage.url -->\n          <p>{{characterImage.characterName}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"horizontalflexbox\">\n    <ion-item lines=\"none\">\n      <div>\n        <ion-label color=\"black\" style=\"font-family:'ZCOOL XiaoWei'; font-size: larger;\">Choose an image:</ion-label>\n        <input type=\"file\" accept=\"image/*\" (change)=\"getUploadedImage($event)\" class=\"input\" >\n      </div>\n    </ion-item>\n  </div>\n\n  <div class=\"horizontalflexbox\">\n    <ion-button (click)=\"evaluateImage()\" style=\"box-shadow: 3px 6px -1px rgba(0,0,0,0.68);\" >Evaluate</ion-button>\n  </div>\n</ion-content>\n\n<app-navbar *ngIf=\"!ifGuest()\"></app-navbar>\n\n";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map