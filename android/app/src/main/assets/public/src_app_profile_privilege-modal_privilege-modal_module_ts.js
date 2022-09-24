"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_profile_privilege-modal_privilege-modal_module_ts"],{

/***/ 58624:
/*!***************************************************************************!*\
  !*** ./src/app/profile/privilege-modal/privilege-modal-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivilegeModalPageRoutingModule": () => (/* binding */ PrivilegeModalPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _privilege_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./privilege-modal.page */ 14058);




const routes = [
    {
        path: '',
        component: _privilege_modal_page__WEBPACK_IMPORTED_MODULE_0__.PrivilegeModalPage
    }
];
let PrivilegeModalPageRoutingModule = class PrivilegeModalPageRoutingModule {
};
PrivilegeModalPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], PrivilegeModalPageRoutingModule);



/***/ }),

/***/ 84000:
/*!*******************************************************************!*\
  !*** ./src/app/profile/privilege-modal/privilege-modal.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivilegeModalPageModule": () => (/* binding */ PrivilegeModalPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _privilege_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./privilege-modal-routing.module */ 58624);
/* harmony import */ var _privilege_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./privilege-modal.page */ 14058);







let PrivilegeModalPageModule = class PrivilegeModalPageModule {
};
PrivilegeModalPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _privilege_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__.PrivilegeModalPageRoutingModule
        ],
        declarations: [_privilege_modal_page__WEBPACK_IMPORTED_MODULE_1__.PrivilegeModalPage]
    })
], PrivilegeModalPageModule);



/***/ })

}]);
//# sourceMappingURL=src_app_profile_privilege-modal_privilege-modal_module_ts.js.map