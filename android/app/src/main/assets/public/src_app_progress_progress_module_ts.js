"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_progress_progress_module_ts"],{

/***/ 50935:
/*!*****************************************************!*\
  !*** ./src/app/progress/progress-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressPageRoutingModule": () => (/* binding */ ProgressPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _progress_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress.page */ 4600);




const routes = [
    {
        path: '',
        component: _progress_page__WEBPACK_IMPORTED_MODULE_0__.ProgressPage
    },
    {
        path: 'graph-modal',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_chart_js_dist_Chart_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_progress_graph-modal_graph-modal_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./graph-modal/graph-modal.module */ 23694)).then(m => m.GraphModalPageModule)
    },
    {
        path: 'progress-result',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_chart_js_dist_Chart_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_progress_progress-result_progress-result_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./progress-result/progress-result.module */ 8982)).then(m => m.ProgressResultPageModule)
    }
];
let ProgressPageRoutingModule = class ProgressPageRoutingModule {
};
ProgressPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes),],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProgressPageRoutingModule);



/***/ }),

/***/ 17072:
/*!*********************************************!*\
  !*** ./src/app/progress/progress.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressPageModule": () => (/* binding */ ProgressPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _shared_components_options_options_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../shared/components/options/options.module */ 23739);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _progress_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progress-routing.module */ 50935);
/* harmony import */ var _progress_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progress.page */ 4600);
/* harmony import */ var _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../shared/components/logout/logout.module */ 98192);
/* harmony import */ var _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/navbar/navbar.module */ 37643);










let ProgressPageModule = class ProgressPageModule {
};
ProgressPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            _shared_components_options_options_module__WEBPACK_IMPORTED_MODULE_0__.OptionsModule,
            _progress_routing_module__WEBPACK_IMPORTED_MODULE_1__.ProgressPageRoutingModule,
            _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__.NavbarModule,
            _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_3__.LogoutModule
        ],
        declarations: [_progress_page__WEBPACK_IMPORTED_MODULE_2__.ProgressPage]
    })
], ProgressPageModule);



/***/ })

}]);
//# sourceMappingURL=src_app_progress_progress_module_ts.js.map