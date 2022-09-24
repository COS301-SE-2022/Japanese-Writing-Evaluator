"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_forgot-password-email_forgot-password-email_module_ts"],{

/***/ 14233:
/*!*******************************************************************************!*\
  !*** ./src/app/forgot-password-email/forgot-password-email-routing.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ForgotPasswordEmailPageRoutingModule": () => (/* binding */ ForgotPasswordEmailPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _forgot_password_email_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forgot-password-email.page */ 63376);




const routes = [
    {
        path: '',
        component: _forgot_password_email_page__WEBPACK_IMPORTED_MODULE_0__.ForgotPasswordEmailPage
    }
];
let ForgotPasswordEmailPageRoutingModule = class ForgotPasswordEmailPageRoutingModule {
};
ForgotPasswordEmailPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ForgotPasswordEmailPageRoutingModule);



/***/ }),

/***/ 45416:
/*!***********************************************************************!*\
  !*** ./src/app/forgot-password-email/forgot-password-email.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ForgotPasswordEmailPageModule": () => (/* binding */ ForgotPasswordEmailPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _forgot_password_email_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forgot-password-email-routing.module */ 14233);
/* harmony import */ var _forgot_password_email_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forgot-password-email.page */ 63376);







let ForgotPasswordEmailPageModule = class ForgotPasswordEmailPageModule {
};
ForgotPasswordEmailPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _forgot_password_email_routing_module__WEBPACK_IMPORTED_MODULE_0__.ForgotPasswordEmailPageRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule
        ],
        declarations: [_forgot_password_email_page__WEBPACK_IMPORTED_MODULE_1__.ForgotPasswordEmailPage]
    })
], ForgotPasswordEmailPageModule);



/***/ }),

/***/ 63376:
/*!*********************************************************************!*\
  !*** ./src/app/forgot-password-email/forgot-password-email.page.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ForgotPasswordEmailPage": () => (/* binding */ ForgotPasswordEmailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _forgot_password_email_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forgot-password-email.page.html?ngResource */ 99067);
/* harmony import */ var _forgot_password_email_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forgot-password-email.page.scss?ngResource */ 38366);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/appService/app-service.service */ 52741);








let ForgotPasswordEmailPage = class ForgotPasswordEmailPage {
    constructor(formBuilder, appService, toast, router) {
        this.appService = appService;
        this.toast = toast;
        this.router = router;
        this.forgotpassword = formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]),
        });
    }
    ngOnInit() {
    }
    onSubmitEmail() {
        if (this.forgotpassword.valid) {
            let email = new Object();
            email = {
                email: this.forgotpassword.controls.email.value,
            };
            //localStorage.setItem('email', this.forgotpassword.controls.email.value);
            this.appService.forgotPasswordEmail(email).subscribe(data => {
                //check if the response is okay so you can send a toast
                if (data.status === 200) {
                    this.showToast(true);
                    this.router.navigate(['/login']);
                }
                else {
                    //check what the problem is
                    // switch(data.status){
                    //   case 500:
                    //     //internal server error
                    //     break;
                    //   case 404:
                    //     //not found
                    //     break;
                    //   case 401:
                    //     //invalid email(unauthorised)
                    //     break;
                    //   default:
                    // }
                    this.showToast(false);
                }
            }); // sends the email to backend so that the email can be sent
        }
    }
    showToast(success) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const toastSuccess = yield this.toast.create({
                message: 'Email has been sent',
                duration: 1500,
                buttons: [
                    {
                        side: 'end',
                        icon: 'close',
                        role: 'cancel'
                    }
                ],
                color: 'success'
            });
            const toastFail = yield this.toast.create({
                message: 'Email was not sent. Retype email address',
                duration: 1500,
                buttons: [
                    {
                        side: 'end',
                        icon: 'close',
                        role: 'cancel'
                    }
                ],
                color: 'Danger'
            });
            if (success) {
                toastSuccess.present();
            }
            else {
                toastFail.present();
            }
        });
    }
};
ForgotPasswordEmailPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder },
    { type: _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__.AppServiceService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ToastController },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router }
];
ForgotPasswordEmailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-forgot-password-email',
        template: _forgot_password_email_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_forgot_password_email_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ForgotPasswordEmailPage);



/***/ }),

/***/ 38366:
/*!**********************************************************************************!*\
  !*** ./src/app/forgot-password-email/forgot-password-email.page.scss?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = "#logo {\n  height: 230px;\n}\n\n.input {\n  border-bottom: solid 1px lightgrey;\n  --highlight-color-focused: none;\n}\n\n.ion-button {\n  width: 120px;\n  height: 35px;\n  text-transform: none;\n  font-family: sans-serif, Helvetica, Arial, Verdana, Tahoma;\n}\n\nform {\n  margin-bottom: 3%;\n}\n\n.horizontalflexbox {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n@media screen and (min-width: 1008px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 5%;\n  }\n\n  ion-card {\n    width: 700px;\n  }\n}\n\n@media screen and (min-width: 641px) and (max-width: 1007px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 5%;\n  }\n\n  ion-card {\n    width: 600px;\n  }\n}\n\n@media screen and (max-width: 640px) and (min-width: 360px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 5%;\n  }\n\n  ion-card {\n    width: 350px;\n  }\n}\n\n@media screen and (max-width: 360px) {\n  .flexboxReplica {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin-top: 10%;\n  }\n\n  ion-card {\n    width: 300px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcmdvdC1wYXNzd29yZC1lbWFpbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQ0FBQTtFQUNBLCtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0VBQ0EsMERBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUNGOztBQUVBO0VBQ0U7SUFDSSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxtQkFBQTtJQUNBLHVCQUFBO0lBQ0EsY0FBQTtFQUNKOztFQUVBO0lBQ0ksWUFBQTtFQUNKO0FBQ0Y7O0FBRUE7RUFDRTtJQUNJLGFBQUE7SUFDQSxzQkFBQTtJQUNBLG1CQUFBO0lBQ0EsdUJBQUE7SUFDQSxjQUFBO0VBQUo7O0VBR0E7SUFDSSxZQUFBO0VBQUo7QUFDRjs7QUFHQTtFQUNFO0lBQ0ksYUFBQTtJQUNBLHNCQUFBO0lBQ0EsbUJBQUE7SUFDQSx1QkFBQTtJQUNBLGNBQUE7RUFESjs7RUFJQTtJQUNJLFlBQUE7RUFESjtBQUNGOztBQUlBO0VBQ0U7SUFDSSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxtQkFBQTtJQUNBLHVCQUFBO0lBQ0EsZUFBQTtFQUZKOztFQUtBO0lBQ0ksWUFBQTtFQUZKO0FBQ0YiLCJmaWxlIjoiZm9yZ290LXBhc3N3b3JkLWVtYWlsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNsb2dve1xuICBoZWlnaHQ6IDIzMHB4O1xufVxuXG4uaW5wdXR7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCBsaWdodGdyZXk7XG4gIC0taGlnaGxpZ2h0LWNvbG9yLWZvY3VzZWQ6IG5vbmU7XG59XG5cbi5pb24tYnV0dG9ue1xuICB3aWR0aDogMTIwcHg7XG4gIGhlaWdodDogMzVweDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmLCBIZWx2ZXRpY2EsIEFyaWFsLCBWZXJkYW5hLCBUYWhvbWE7XG59XG5cbmZvcm17XG4gIG1hcmdpbi1ib3R0b206IDMlO1xufVxuXG4uaG9yaXpvbnRhbGZsZXhib3h7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDA4cHgpICB7XG4gIC5mbGV4Ym94UmVwbGljYXtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogNSU7XG4gIH1cblxuICBpb24tY2FyZHtcbiAgICAgIHdpZHRoOiA3MDBweDtcbiAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NDFweCkgYW5kIChtYXgtd2lkdGg6IDEwMDdweCkge1xuICAuZmxleGJveFJlcGxpY2F7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi10b3A6IDUlO1xuICB9XG5cbiAgaW9uLWNhcmR7XG4gICAgICB3aWR0aDogNjAwcHg7XG4gIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjQwcHgpIGFuZCAobWluLXdpZHRoOiAzNjBweCkge1xuICAuZmxleGJveFJlcGxpY2F7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi10b3A6IDUlO1xuICB9XG5cbiAgaW9uLWNhcmR7XG4gICAgICB3aWR0aDogMzUwcHg7XG4gIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzYwcHgpIHtcbiAgLmZsZXhib3hSZXBsaWNhe1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBtYXJnaW4tdG9wOiAxMCU7XG4gIH1cbiAgXG4gIGlvbi1jYXJke1xuICAgICAgd2lkdGg6IDMwMHB4O1xuICB9XG4gXG59XG5cbiJdfQ== */";

/***/ }),

/***/ 99067:
/*!**********************************************************************************!*\
  !*** ./src/app/forgot-password-email/forgot-password-email.page.html?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = "<link href='https://fonts.googleapis.com/css?family=ZCOOL XiaoWei' rel='stylesheet'>\n<p class=\"padding\">\n  <ion-button color=\"light\" href=\"login\">\n    <ion-icon name=\"chevron-back-outline\" ></ion-icon>\n  </ion-button>\n</p>\n<ion-content>\n\n  <div  class=\"flexboxReplica\">\n    <ion-card > \n      <ion-img src=\"assets/images/JWE-logos_black.png\" id=\"logo\"></ion-img>\n      <ion-card-content >\n        <form (ngSubmit)=\"onSubmitEmail()\" [formGroup]=\"forgotpassword\">\n          <div class=\"horizontalflexbox\">\n            <ion-item  lines=\"none\" > <!--Username input item-->\n              <ion-label position=\"floating\">Email</ion-label>\n              <ion-input class=\"input\" type=\"text\"  formControlName=\"email\" ></ion-input>\n            </ion-item>\n            <!-- <ion-label *ngIf=\"isUsername\" color=\"primary\">Username(Email) required</ion-label><br *ngIf=\"isUsername\"/> -->\n          </div><br>\n\n          <div class=\"horizontalflexbox\">\n            <ion-button class=\"ion-button\" type=\"submit\" shape=\"round\" color=\"primary\">Send Email</ion-button>\n          </div>\n        \n        </form>\n      </ion-card-content>\n    </ion-card>\n      </div>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_forgot-password-email_forgot-password-email_module_ts.js.map