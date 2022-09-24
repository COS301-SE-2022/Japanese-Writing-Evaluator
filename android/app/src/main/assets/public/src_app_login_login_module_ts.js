"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_login_login_module_ts"],{

/***/ 45393:
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageRoutingModule": () => (/* binding */ LoginPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page */ 66825);




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ 80107:
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageModule": () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-routing.module */ 45393);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page */ 66825);
/* harmony import */ var _shared_components_password_password_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/components/password/password.module */ 32413);









let LoginPageModule = class LoginPageModule {
};
LoginPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _login_routing_module__WEBPACK_IMPORTED_MODULE_0__.LoginPageRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _shared_components_password_password_module__WEBPACK_IMPORTED_MODULE_2__.PasswordModule,
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_1__.LoginPage]
    })
], LoginPageModule);



/***/ }),

/***/ 66825:
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _login_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page.html?ngResource */ 41729);
/* harmony import */ var _login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page.scss?ngResource */ 87047);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/appService/app-service.service */ 52741);



/* eslint-disable @typescript-eslint/dot-notation */




let LoginPage = class LoginPage {
    constructor(formBuilder, router, appService) {
        this.router = router;
        this.appService = appService;
        this.isUsername = false; // is there a username provided
        //usernameInputColor = 'border-color: dark;';
        this.isPassword = false; // is there a username provided
        //passwordInputColor = 'border-color: dark;';
        this.hide = true; // a variable used to show or hide a password
        this.login = formBuilder.group({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required])
        });
    }
    ngOnInit() {
    }
    onLogin() {
        const username = this.login.controls.username.value;
        const password = this.login.controls.password.value; //'zamakweyama04@gmail.com', 'P@55word'
        if (username === '') {
            // this.usernameInputColor = 'border-color: darkred;';
            this.isUsername = true;
        }
        else {
            //this.usernameInputColor = 'border-color: dark;';
            this.isUsername = false; // is there a username provided
        }
        if (password === '') {
            this.isPassword = true;
            // this.passwordInputColor = 'border-color: darkred;';
        }
        else {
            this.isPassword = false; // is there a username provided
            //this.passwordInputColor = 'border-color: dark;';
        }
        if (!(username === '') && !(password === '')) {
            this.appService.isUser(username, password)
                .subscribe(data => {
                if (data.status === 200) {
                    if (!localStorage.getItem('id')) {
                        localStorage.setItem('id', data.body['data'][1].toString());
                    }
                    if (!localStorage.getItem('token')) {
                        localStorage.setItem('token', data.body['user-token'].toString());
                    }
                    this.login.controls.username.reset();
                    this.login.controls.password.reset();
                    this.router.navigate(['/home']);
                }
            });
        }
    }
    onGuestLogin() {
        localStorage.setItem('id', 'guest');
        this.router.navigate(['/home']);
    }
};
LoginPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__.AppServiceService }
];
LoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-login',
        template: _login_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], LoginPage);



/***/ }),

/***/ 87047:
/*!**************************************************!*\
  !*** ./src/app/login/login.page.scss?ngResource ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "#logo {\n  height: 250px;\n}\n\n.flexbox {\n  display: flex;\n  justify-content: center;\n}\n\n@media screen and (min-width: 1008px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 5%;\n  }\n\n  ion-card {\n    width: 700px;\n  }\n}\n\n@media screen and (min-width: 641px) and (max-width: 1007px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 10%;\n  }\n\n  ion-card {\n    width: 600px;\n  }\n}\n\n@media screen and (max-width: 640px) and (min-width: 361px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 15%;\n  }\n\n  ion-card {\n    width: 350px;\n  }\n}\n\n@media screen and (max-width: 360px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 18%;\n  }\n\n  ion-card {\n    width: 300px;\n  }\n}\n\n.horizontalflexbox {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.ion-button {\n  width: 120px;\n  height: 35px;\n}\n\n.guestButton {\n  width: 100px;\n  height: 35px;\n}\n\n.input {\n  border-bottom: solid 1px lightgrey;\n  --highlight-color-focused: none;\n}\n\n.loginBackground {\n  margin-top: 2%;\n  padding: 5%;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: 380px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQTtFQUNJLGFBQUE7QUFOSjs7QUFTQTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtBQU5KOztBQW1CQTtFQUNJO0lBQ0ksYUFBQTtJQUNBLHNCQUFBO0lBQ0EsbUJBQUE7SUFDQSx1QkFBQTtJQUNBLGNBQUE7RUFoQk47O0VBbUJFO0lBQ0ksWUFBQTtFQWhCTjtBQUNGOztBQW1CQTtFQUNJO0lBQ0ksYUFBQTtJQUNBLHNCQUFBO0lBQ0EsbUJBQUE7SUFDQSx1QkFBQTtJQUNBLGVBQUE7RUFqQk47O0VBb0JFO0lBQ0ksWUFBQTtFQWpCTjtBQUNGOztBQW9CQTtFQUNJO0lBQ0ksYUFBQTtJQUNBLHNCQUFBO0lBQ0EsbUJBQUE7SUFDQSx1QkFBQTtJQUNBLGVBQUE7RUFsQk47O0VBcUJFO0lBQ0ksWUFBQTtFQWxCTjtBQUNGOztBQXFCQTtFQUNJO0lBQ0ksYUFBQTtJQUNBLHNCQUFBO0lBQ0EsbUJBQUE7SUFDQSx1QkFBQTtJQUNBLGVBQUE7RUFuQk47O0VBc0JFO0lBQ0ksWUFBQTtFQW5CTjtBQUNGOztBQXVCQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBckJKOztBQXdCQTtFQUNJLFlBQUE7RUFDQSxZQUFBO0FBckJKOztBQTZCQTtFQUNJLFlBQUE7RUFDQSxZQUFBO0FBMUJKOztBQTZCQTtFQUNJLGtDQUFBO0VBQ0EsK0JBQUE7QUExQko7O0FBNkJBO0VBRUksY0FBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUFBLGtCQUFBO0VBQ0EsYUFBQTtBQTNCSiIsImZpbGUiOiJsb2dpbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpb24taW5wdXR7XG4vLyAgICAgYmFja2dyb3VuZDogI2Y0ZjVmODtcbiAgICBcbi8vICAgICB3aWR0aDogMjUwcHg7XG4vLyAgICAgaGVpZ2h0OiA0NXB4O1xuLy8gfVxuXG4jbG9nb3tcbiAgICBoZWlnaHQ6IDI1MHB4O1xufVxuXG4uZmxleGJveHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4vLyAuZmxleGJveFJlcGxpY2F7XG4vLyAgICAgZGlzcGxheTogZmxleDtcbi8vICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuLy8gICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4vLyAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4vLyAgICAgbWFyZ2luLXRvcDogNSU7XG4vLyB9XG5cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDA4cHgpICB7XG4gICAgLmZsZXhib3hSZXBsaWNhe1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLXRvcDogNSU7XG4gICAgfVxuXG4gICAgaW9uLWNhcmR7XG4gICAgICAgIHdpZHRoOiA3MDBweDtcbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0MXB4KSBhbmQgKG1heC13aWR0aDogMTAwN3B4KSB7XG4gICAgLmZsZXhib3hSZXBsaWNhe1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLXRvcDogMTAlO1xuICAgIH1cblxuICAgIGlvbi1jYXJke1xuICAgICAgICB3aWR0aDogNjAwcHg7XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NDBweCkgYW5kIChtaW4td2lkdGg6IDM2MXB4KSB7XG4gICAgLmZsZXhib3hSZXBsaWNhe1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLXRvcDogMTUlO1xuICAgIH1cblxuICAgIGlvbi1jYXJke1xuICAgICAgICB3aWR0aDogMzUwcHg7XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNjBweCkge1xuICAgIC5mbGV4Ym94UmVwbGljYXtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbi10b3A6IDE4JTtcbiAgICB9XG4gICAgXG4gICAgaW9uLWNhcmR7XG4gICAgICAgIHdpZHRoOiAzMDBweDtcbiAgICB9XG4gICBcbn1cblxuLmhvcml6b250YWxmbGV4Ym94e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmlvbi1idXR0b257XG4gICAgd2lkdGg6IDEyMHB4O1xuICAgIGhlaWdodDogMzVweDtcbn1cblxuLy8gaW9uLWNhcmR7XG5cbi8vICAgICB3aWR0aDogNTAwcHg7XG4vLyB9XG5cbi5ndWVzdEJ1dHRvbntcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgaGVpZ2h0OiAzNXB4O1xufVxuXG4uaW5wdXR7XG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4IGxpZ2h0Z3JleTtcbiAgICAtLWhpZ2hsaWdodC1jb2xvci1mb2N1c2VkOiBub25lO1xufVxuXG4ubG9naW5CYWNrZ3JvdW5ke1xuICAgIC8vYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgbWFyZ2luLXRvcDogMiU7XG4gICAgcGFkZGluZzogNSU7XG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgIGhlaWdodDogMzgwcHg7XG4gICAgLy9ib3gtc2hhZG93OiByZ2JhKDE0OSwgMTU3LCAxNjUsIDAuMikgMHB4IDhweCAyNHB4O1xuICAgIC8vIGRpc3BsYXk6IGZsZXg7XG4gICAgLy8ganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59Il19 */";

/***/ }),

/***/ 41729:
/*!**************************************************!*\
  !*** ./src/app/login/login.page.html?ngResource ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\" no-scroll \" style=\"--background: url('../../assets/images/loginbackground.png');\" ><!--style=\"--background: url('../../assets/images/loginbackground.png');#EEEEEE\"-->\r\n  <!--Guest Login button-->\r\n  <!-- <ion-toolbar id=\"guestBtn\">\r\n    \r\n  </ion-toolbar> -->\r\n\r\n  <!-- logo -->\r\n  \r\n\r\n  <!-- login form class=\"loginbackground\"-->\r\n  <div  class=\"flexboxReplica\">\r\n    <ion-card > \r\n      <ion-img src=\"assets/images/JWE-logos_black.png\" id=\"logo\"></ion-img>\r\n      <ion-card-content >\r\n        <form [formGroup]=\"login\" (ngSubmit)=\"onLogin()\" > <!-- login form-->\r\n          <div class=\"horizontalflexbox\">\r\n            <ion-item  lines=\"none\" > <!--Username input item-->\r\n              <ion-label position=\"floating\">Email</ion-label>\r\n              <ion-input  formControlName=\"username\" type=\"text\"  class=\"input\" size=\"24\"></ion-input>\r\n            </ion-item>\r\n          </div>\r\n          <ion-label class=\"horizontalflexbox\" *ngIf=\"isUsername\" color=\"danger\">Email required</ion-label>\r\n\r\n          <div class=\"horizontalflexbox\">\r\n             <ion-item  lines=\"none\"><!-- Password input item -->\r\n              <ion-label position=\"floating\">Password</ion-label>\r\n              <app-password>\r\n                <ion-input  formControlName=\"password\" type=\"password\" class=\"input\"></ion-input>\r\n              </app-password>\r\n            </ion-item>\r\n          </div>\r\n          <ion-label class=\"horizontalflexbox\" *ngIf=\"isPassword\" color=\"danger\">Password required</ion-label><br/>\r\n\r\n          <div class=\"horizontalflexbox\">\r\n            <ion-button class=\"ion-button\" type=\"submit\" shape=\"round\" color=\"primary\">Login</ion-button>\r\n          </div>\r\n        </form>\r\n        <div class=\"horizontalflexbox\">\r\n          <ion-button slot=\"end\" shape=\"round\" color=\"dark\" class=\"guestButton\" (click)=\"onGuestLogin()\">guest</ion-button>\r\n        </div>\r\n        <div class=\"horizontalflexbox\">\r\n          <a [routerLink]=\"['/forgot-password-email']\" style=\"color:rgb(124, 167, 245);\">Forgot Password?</a>\r\n        </div>\r\n        <div class=\"horizontalflexbox\">\r\n          <p>Don't have an account? <a [routerLink]=\"['/sign-up']\" style=\"color:rgb(124, 167, 245);\">Signup</a></p>\r\n        </div>\r\n      </ion-card-content>      \r\n    </ion-card> \r\n  </div>\r\n</ion-content>\r\n\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_login_login_module_ts.js.map