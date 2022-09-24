"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_home_home_module_ts"],{

/***/ 52003:
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageRoutingModule": () => (/* binding */ HomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 62267);




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage,
    },
    {
        path: 'alphabet-category',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_home_alphabet-category_alphabet-category_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./alphabet-category/alphabet-category.module */ 82859)).then(m => m.AlphabetCategoryPageModule)
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], HomePageRoutingModule);



/***/ }),

/***/ 3467:
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _shared_components_options_options_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../shared/components/options/options.module */ 23739);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page */ 62267);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home-routing.module */ 52003);
/* harmony import */ var _progress_progress_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../progress/progress.page */ 4600);
/* harmony import */ var _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/navbar/navbar.module */ 37643);
/* harmony import */ var _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/components/logout/logout.module */ 98192);











let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicModule,
            _home_routing_module__WEBPACK_IMPORTED_MODULE_2__.HomePageRoutingModule,
            _shared_components_options_options_module__WEBPACK_IMPORTED_MODULE_0__.OptionsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
            _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__.NavbarModule,
            _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_5__.LogoutModule
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage],
        providers: [_progress_progress_page__WEBPACK_IMPORTED_MODULE_3__.ProgressPage]
    })
], HomePageModule);



/***/ }),

/***/ 62267:
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page.html?ngResource */ 91670);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss?ngResource */ 1020);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/appService/app-service.service */ 52741);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);






let HomePage = class HomePage {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.alphabetCategory = [
            { character: 'あ', category: 'Hiragana - Vowels' },
            { character: 'か', category: 'Hiragana - Group K' },
            { character: 'さ', category: 'Hiragana - Group S' },
            { character: 'た', category: 'Hiragana - Group T' },
            { character: 'な', category: 'Hiragana - Group N' },
            { character: 'は', category: 'Hiragana - Group H' },
            { character: 'ま', category: 'Hiragana - Group M' },
            { character: 'や', category: 'Hiragana - Group Y' },
            { character: 'ら', category: 'Hiragana - Group R' },
            { character: 'わ', category: 'Hiragana - Group W' },
            { character: 'が', category: 'Hiragana - Group G' },
            { character: 'ざ', category: 'Hiragana - Group Z' },
            { character: 'だ', category: 'Hiragana - Group D' },
            { character: 'ば', category: 'Hiragana - Group B' },
            { character: 'ぱ', category: 'Hiragana - Group P' },
            { character: 'ア', category: 'Katakana' },
            { character: '一', category: 'Kanji' }
        ];
        this.pageRequest = 'home';
    }
    //TODO: check local storage to check if user is guest, #, Phumu
    ifGuest() {
        if (localStorage.getItem('id')) {
            if (localStorage.getItem('id') === 'guest') {
                return true;
            }
        }
        return false;
    }
    ngOnInit() { }
};
HomePage.ctorParameters = () => [
    { type: _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__.AppServiceService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router }
];
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-home',
        template: _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], HomePage);



/***/ }),

/***/ 1020:
/*!************************************************!*\
  !*** ./src/app/home/home.page.scss?ngResource ***!
  \************************************************/
/***/ ((module) => {

module.exports = "ion-content h2 {\n  font-family: \"sans-serif\", \"Helvetica\", \"Arial\", \"Verdana\", \"Tahoma\";\n}\n\nion-img {\n  position: absolute;\n  left: 5px;\n  top: 5px;\n  width: 100px;\n  height: 100px;\n  margin-top: -10px;\n}\n\n.head {\n  background-color: #960722;\n  width: 100%;\n  height: 40%;\n  margin-top: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: white;\n}\n\n.head strong {\n  font-size: 200%;\n}\n\n.head span {\n  font-size: 100%;\n}\n\n.my-grid {\n  height: 100% !important;\n}\n\n.parent-row {\n  height: 100% !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0VBQUE7QUFDRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0FBRUY7O0FBQ0E7RUFDRSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQUVGOztBQUFBO0VBQ0UsZUFBQTtBQUdGOztBQUFBO0VBQ0UsZUFBQTtBQUdGOztBQUFBO0VBQ0UsdUJBQUE7QUFHRjs7QUFEQTtFQUNFLHVCQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQ0FBQTtBQUlGIiwiZmlsZSI6ImhvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQgaDJ7XG4gIGZvbnQtZmFtaWx5OiAnc2Fucy1zZXJpZicsICdIZWx2ZXRpY2EnLCAnQXJpYWwnLCAnVmVyZGFuYScsICdUYWhvbWEnO1xufVxuaW9uLWltZ3tcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1cHg7XG4gIHRvcDogNXB4O1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMTAwcHg7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG4uaGVhZHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk2MDcyMjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDAlO1xuICBtYXJnaW4tdG9wOiAxMDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHdoaXRlO1xufVxuLmhlYWQgc3Ryb25ne1xuICBmb250LXNpemU6IDIwMCU7XG59XG5cbi5oZWFkIHNwYW57XG4gIGZvbnQtc2l6ZTogMTAwJTtcbn1cblxuLm15LWdyaWQge1xuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbn1cbi5wYXJlbnQtcm93IHtcbiAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXIgIWltcG9ydGFudDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXIgIWltcG9ydGFudDtcbn1cbiJdfQ== */";

/***/ }),

/***/ 91670:
/*!************************************************!*\
  !*** ./src/app/home/home.page.html?ngResource ***!
  \************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <div class=\"head\" >\n      <ion-img src=\"assets/images/JWE-logos_black.png\"></ion-img>\n      <app-logout></app-logout>\n\n      <h1></h1>\n      <p>\n        <strong>Welcome</strong><br> <span>ようこそ</span><br>\n        Did you know Japanese has 3 different alphabets?<br>\n        Select which alphabet we shall explore below.<br><br>\n        Note: Hiragana has 15 groups\n      </p>\n  </div>\n\n\n  <div >\n    <ion-grid class=\"my-grid\">\n      <ion-row class=\"parent-row\">\n        <ion-col *ngFor=\"let item of alphabetCategory\" size=\"col-auto\">\n          <app-options [letter]='item.character' [category]='item.category' [pageReq]='pageRequest'></app-options>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n\n<app-navbar *ngIf=\"!ifGuest()\"></app-navbar>\n\n";

/***/ })

}]);
//# sourceMappingURL=src_app_home_home_module_ts.js.map