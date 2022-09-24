"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_sign-up_sign-up_module_ts"],{

/***/ 59204:
/*!***************************************************!*\
  !*** ./src/app/sign-up/sign-up-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignUpPageRoutingModule": () => (/* binding */ SignUpPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _sign_up_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-up.page */ 10080);




const routes = [
    {
        path: '',
        component: _sign_up_page__WEBPACK_IMPORTED_MODULE_0__.SignUpPage
    }
];
let SignUpPageRoutingModule = class SignUpPageRoutingModule {
};
SignUpPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], SignUpPageRoutingModule);



/***/ }),

/***/ 73982:
/*!*******************************************!*\
  !*** ./src/app/sign-up/sign-up.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignUpPageModule": () => (/* binding */ SignUpPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _sign_up_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-up-routing.module */ 59204);
/* harmony import */ var _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/appService/app-service.service */ 52741);
/* harmony import */ var _sign_up_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-up.page */ 10080);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var _shared_components_password_password_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/components/password/password.module */ 32413);
/* harmony import */ var _shared_components_toast_toast_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/toast/toast.component */ 80257);











let SignUpPageModule = class SignUpPageModule {
};
SignUpPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            _sign_up_routing_module__WEBPACK_IMPORTED_MODULE_0__.SignUpPageRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule,
            _shared_components_password_password_module__WEBPACK_IMPORTED_MODULE_3__.PasswordModule,
        ],
        declarations: [_sign_up_page__WEBPACK_IMPORTED_MODULE_2__.SignUpPage],
        providers: [_services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_1__.AppServiceService, _shared_components_toast_toast_component__WEBPACK_IMPORTED_MODULE_4__.ToastComponent]
    })
], SignUpPageModule);



/***/ }),

/***/ 10080:
/*!*****************************************!*\
  !*** ./src/app/sign-up/sign-up.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignUpPage": () => (/* binding */ SignUpPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _sign_up_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-up.page.html?ngResource */ 98796);
/* harmony import */ var _sign_up_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-up.page.scss?ngResource */ 55585);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/appService/app-service.service */ 52741);
/* harmony import */ var _sign_up__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sign-up */ 38855);
/* harmony import */ var _shared_components_toast_toast_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/toast/toast.component */ 80257);








let SignUpPage = class SignUpPage {
    constructor(router, apiService, toast) {
        this.router = router;
        this.apiService = apiService;
        this.toast = toast;
        this.username = '';
        this.email = '';
        this.password = '';
    }
    ngOnInit() {
    }
    signUp(data, form) {
        this.username = data.Username;
        this.email = data.Email;
        this.password = data.Password;
        this.sendData();
        form.reset();
    }
    sendData() {
        this.user = new _sign_up__WEBPACK_IMPORTED_MODULE_3__.SignUp(this.username, this.email, this.password);
        this.addUser();
    }
    addUser() {
        this.apiService.addUser(this.username, this.email, this.password)
            .subscribe(data => {
            if (data.status === 200) {
                this.toast.showToast('Registered', 200);
                this.router.navigate(['/login']);
            }
        });
    }
};
SignUpPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__.AppServiceService },
    { type: _shared_components_toast_toast_component__WEBPACK_IMPORTED_MODULE_4__.ToastComponent }
];
SignUpPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-sign-up',
        template: _sign_up_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_sign_up_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], SignUpPage);



/***/ }),

/***/ 38855:
/*!************************************!*\
  !*** ./src/app/sign-up/sign-up.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignUp": () => (/* binding */ SignUp)
/* harmony export */ });
class SignUp {
    constructor(username, email, password) {
        SignUp.username = username;
        SignUp.email = email;
        SignUp.password = password;
    }
}


/***/ }),

/***/ 55585:
/*!******************************************************!*\
  !*** ./src/app/sign-up/sign-up.page.scss?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "#logo {\n  height: 220px;\n}\n\n@media screen and (min-width: 1008px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n\n  ion-card {\n    width: 700px;\n  }\n}\n\n@media screen and (min-width: 641px) and (max-width: 1007px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 2%;\n  }\n\n  ion-card {\n    width: 600px;\n  }\n}\n\n@media screen and (max-width: 640px) and (min-width: 360px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 5%;\n  }\n\n  ion-card {\n    width: 350px;\n  }\n}\n\n@media screen and (max-width: 360px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 10%;\n  }\n\n  ion-card {\n    width: 300px;\n  }\n}\n\n.horizontalflexbox {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\nion-button {\n  text-transform: none;\n}\n\n.no-scroll .scroll-content {\n  overflow: hidden;\n}\n\n.ion-button {\n  width: 120px;\n  height: 35px;\n}\n\n.padding {\n  padding: 5px;\n}\n\n.position {\n  margin-top: 18px;\n  margin-left: 5px;\n}\n\n.input {\n  border-bottom: solid 1px lightgrey;\n  --highlight-color-focused: none;\n}\n\nform {\n  margin-bottom: 3%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ24tdXAucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQUNGOztBQUdBO0VBQ0U7SUFDSSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxtQkFBQTtJQUNBLHVCQUFBO0VBQUo7O0VBSUE7SUFDSSxZQUFBO0VBREo7QUFDRjs7QUFJQTtFQUNFO0lBQ0ksYUFBQTtJQUNBLHNCQUFBO0lBQ0EsbUJBQUE7SUFDQSx1QkFBQTtJQUNBLGNBQUE7RUFGSjs7RUFLQTtJQUNJLFlBQUE7RUFGSjtBQUNGOztBQUtBO0VBQ0U7SUFDSSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxtQkFBQTtJQUNBLHVCQUFBO0lBQ0EsY0FBQTtFQUhKOztFQU1BO0lBQ0ksWUFBQTtFQUhKO0FBQ0Y7O0FBTUE7RUFDRTtJQUNJLGFBQUE7SUFDQSxzQkFBQTtJQUNBLG1CQUFBO0lBQ0EsdUJBQUE7SUFDQSxlQUFBO0VBSko7O0VBT0E7SUFDSSxZQUFBO0VBSko7QUFDRjs7QUFRQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBTkY7O0FBVUE7RUFDRSxvQkFBQTtBQVBGOztBQVVBO0VBQ0UsZ0JBQUE7QUFQRjs7QUFVQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0FBUEY7O0FBV0E7RUFFRSxZQUFBO0FBVEY7O0FBWUE7RUFFRSxnQkFBQTtFQUNBLGdCQUFBO0FBVkY7O0FBYUE7RUFDRSxrQ0FBQTtFQUNBLCtCQUFBO0FBVkY7O0FBYUE7RUFDRSxpQkFBQTtBQVZGIiwiZmlsZSI6InNpZ24tdXAucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2xvZ297XG4gIGhlaWdodDogMjIwcHg7XG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwOHB4KSAge1xuICAuZmxleGJveFJlcGxpY2F7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIC8vIG1hcmdpbi10b3A6IDUlO1xuICB9XG5cbiAgaW9uLWNhcmR7XG4gICAgICB3aWR0aDogNzAwcHg7XG4gIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjQxcHgpIGFuZCAobWF4LXdpZHRoOiAxMDA3cHgpIHtcbiAgLmZsZXhib3hSZXBsaWNhe1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBtYXJnaW4tdG9wOiAyJTtcbiAgfVxuXG4gIGlvbi1jYXJke1xuICAgICAgd2lkdGg6IDYwMHB4O1xuICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSBhbmQgKG1pbi13aWR0aDogMzYwcHgpIHtcbiAgLmZsZXhib3hSZXBsaWNhe1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBtYXJnaW4tdG9wOiA1JTtcbiAgfVxuXG4gIGlvbi1jYXJke1xuICAgICAgd2lkdGg6IDM1MHB4O1xuICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XG4gIC5mbGV4Ym94UmVwbGljYXtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogMTAlO1xuICB9XG4gIFxuICBpb24tY2FyZHtcbiAgICAgIHdpZHRoOiAzMDBweDtcbiAgfVxuIFxufVxuXG4uaG9yaXpvbnRhbGZsZXhib3h7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5cbmlvbi1idXR0b24ge1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbn1cblxuLm5vLXNjcm9sbCAuc2Nyb2xsLWNvbnRlbnR7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5pb24tYnV0dG9ue1xuICB3aWR0aDogMTIwcHg7XG4gIGhlaWdodDogMzVweDtcbn1cblxuXG4ucGFkZGluZ1xue1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5wb3NpdGlvblxue1xuICBtYXJnaW4tdG9wOiAxOHB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG4uaW5wdXR7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCBsaWdodGdyZXk7XG4gIC0taGlnaGxpZ2h0LWNvbG9yLWZvY3VzZWQ6IG5vbmU7XG59XG5cbmZvcm17XG4gIG1hcmdpbi1ib3R0b206IDMlO1xufVxuIl19 */";

/***/ }),

/***/ 98796:
/*!******************************************************!*\
  !*** ./src/app/sign-up/sign-up.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "<p class=\"padding\">\n  <ion-button color=\"light\" href=\"login\">\n    <ion-icon name=\"chevron-back-outline\" ></ion-icon>\n  </ion-button>\n</p>\n\n<ion-content>\n<!-- \n  <ion-buttons slot=\"start\">\n    <ion-back-button></ion-back-button>\n  </ion-buttons> -->\n  <div  class=\"flexboxReplica\">\n    <ion-card > \n      <ion-img src=\"assets/images/JWE-logos_black.png\" id=\"logo\"></ion-img>\n      <ion-card-content >\n        <form #form=\"ngForm\" (ngSubmit)=\"signUp(form.value,form)\" > <!-- login form-->\n          <div class=\"horizontalflexbox\">\n            <ion-item  lines=\"none\" > <!--Username input item-->\n              <ion-label position=\"floating\">Username</ion-label>\n              <ion-input class=\"input\" type=\"text\" name=\"Username\" ngModel required size=\"24\"></ion-input>\n            </ion-item>\n            <!-- <ion-label *ngIf=\"isUsername\" color=\"primary\">Username(Email) required</ion-label><br *ngIf=\"isUsername\"/> -->\n          </div><br>\n\n          <div class=\"horizontalflexbox\">\n            <ion-item  lines=\"none\" > <!--Username input item-->\n              <ion-label position=\"floating\">Email</ion-label>\n              <ion-input class=\"input\" type=\"text\" name=\"Email\"  ngModel required size=\"24\"></ion-input>\n            </ion-item>\n            <!-- <ion-label *ngIf=\"isUsername\" color=\"primary\">Username(Email) required</ion-label><br *ngIf=\"isUsername\"/> -->\n          </div><br>\n\n          <div class=\"horizontalflexbox\">\n             <ion-item  lines=\"none\"><!-- Password input item -->\n              <ion-label position=\"floating\">Password</ion-label>\n              <app-password>\n                <ion-input class=\"input\" type=\"password\" name=\"Password\" ngModel required></ion-input>\n              </app-password>\n            </ion-item>\n            <!-- <ion-label *ngIf=\"isPassword\" color=\"primary\">Password required</ion-label><br *ngIf=\"isPassword\"/> -->\n          </div><br/><br/>\n\n          <div class=\"horizontalflexbox\">\n            <ion-button class=\"ion-button\" type=\"submit\" shape=\"round\" color=\"primary\" [disabled]=\"form.invalid\">Create Profile</ion-button>\n          </div>\n        </form>\n\n      </ion-card-content>\n    </ion-card>\n  </div>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_sign-up_sign-up_module_ts.js.map