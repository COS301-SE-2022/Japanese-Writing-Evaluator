"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_upload_upload_module_ts"],{

/***/ 33502:
/*!**************************************************************!*\
  !*** ./src/app/shared/components/navbar/navbar.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavbarComponent": () => (/* binding */ NavbarComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _navbar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navbar.component.html?ngResource */ 30947);
/* harmony import */ var _navbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar.component.scss?ngResource */ 73600);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var src_app_services_objectDetection_object_detection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/objectDetection/object-detection.service */ 17154);






let NavbarComponent = class NavbarComponent {
    constructor(modalController, objDetectionService) {
        this.modalController = modalController;
        this.objDetectionService = objDetectionService;
        this.currentModel = null;
    }
    ngOnInit() {
    }
    takePhoto() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            yield this.objDetectionService.getPicture();
        });
    }
};
NavbarComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController },
    { type: src_app_services_objectDetection_object_detection_service__WEBPACK_IMPORTED_MODULE_2__.ObjectDetectionService }
];
NavbarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-navbar',
        template: _navbar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_navbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], NavbarComponent);



/***/ }),

/***/ 37643:
/*!***********************************************************!*\
  !*** ./src/app/shared/components/navbar/navbar.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavbarModule": () => (/* binding */ NavbarModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _navbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navbar.component */ 33502);





let NavbarModule = class NavbarModule {
};
NavbarModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        declarations: [_navbar_component__WEBPACK_IMPORTED_MODULE_0__.NavbarComponent],
        imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
        exports: [_navbar_component__WEBPACK_IMPORTED_MODULE_0__.NavbarComponent]
    })
], NavbarModule);



/***/ }),

/***/ 36563:
/*!*************************************************!*\
  !*** ./src/app/upload/upload-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UploadPageRoutingModule": () => (/* binding */ UploadPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _upload_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upload.page */ 50292);




const routes = [
    {
        path: '',
        component: _upload_page__WEBPACK_IMPORTED_MODULE_0__.UploadPage
    }
];
let UploadPageRoutingModule = class UploadPageRoutingModule {
};
UploadPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], UploadPageRoutingModule);



/***/ }),

/***/ 54494:
/*!*****************************************!*\
  !*** ./src/app/upload/upload.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UploadPageModule": () => (/* binding */ UploadPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _upload_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upload-routing.module */ 36563);
/* harmony import */ var _upload_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upload.page */ 50292);
/* harmony import */ var _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/components/navbar/navbar.module */ 37643);








let UploadPageModule = class UploadPageModule {
};
UploadPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _upload_routing_module__WEBPACK_IMPORTED_MODULE_0__.UploadPageRoutingModule,
            _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_2__.NavbarModule
        ],
        declarations: [_upload_page__WEBPACK_IMPORTED_MODULE_1__.UploadPage]
    })
], UploadPageModule);



/***/ }),

/***/ 73600:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/navbar/navbar.component.scss?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuYXZiYXIuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 30947:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/navbar/navbar.component.html?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "  \n\n<!-- tabs for the navigation bar-->\n  <ion-footer >\n    <ion-tab-bar>\n      <ion-tabs>\n        <ion-row>\n          <ion-col size=\"4\">\n            <a [routerLink]=\"['/home']\"><!--direct to suggestions-->\n              <ion-tab-button >\n                <ion-icon name=\"language\"></ion-icon>\n                <ion-label>Characters</ion-label>\n              </ion-tab-button>\n            </a>\n          </ion-col>\n\n          <ion-col size=\"4\">\n            <a (click)=\"takePhoto()\"><!--direct to suggestions-->\n              <ion-tab-button >\n                <ion-icon name=\"camera\"></ion-icon>\n                <ion-label>Detect Object</ion-label>\n              </ion-tab-button>\n            </a>\n          </ion-col>\n  \n          <ion-col size=\"4\">\n            <a [routerLink]=\"['/progress']\">\n              <ion-tab-button >\n                <ion-icon name=\"analytics\"></ion-icon>\n                <ion-label>Progress</ion-label>\n              </ion-tab-button>\n            </a>\n          </ion-col>\n        </ion-row>\n      </ion-tabs>\n    </ion-tab-bar>\n  </ion-footer>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_upload_upload_module_ts.js.map