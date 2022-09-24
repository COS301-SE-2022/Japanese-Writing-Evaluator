"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_progress_graph-modal_graph-modal_module_ts"],{

/***/ 96558:
/*!********************************************************************!*\
  !*** ./src/app/progress/graph-modal/graph-modal-routing.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphModalPageRoutingModule": () => (/* binding */ GraphModalPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _graph_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph-modal.page */ 98801);




const routes = [
    {
        path: '',
        component: _graph_modal_page__WEBPACK_IMPORTED_MODULE_0__.GraphModalPage
    }
];
let GraphModalPageRoutingModule = class GraphModalPageRoutingModule {
};
GraphModalPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], GraphModalPageRoutingModule);



/***/ }),

/***/ 23694:
/*!************************************************************!*\
  !*** ./src/app/progress/graph-modal/graph-modal.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphModalPageModule": () => (/* binding */ GraphModalPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _graph_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph-modal-routing.module */ 96558);
/* harmony import */ var _graph_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graph-modal.page */ 98801);







let GraphModalPageModule = class GraphModalPageModule {
};
GraphModalPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _graph_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__.GraphModalPageRoutingModule
        ],
        declarations: [_graph_modal_page__WEBPACK_IMPORTED_MODULE_1__.GraphModalPage]
    })
], GraphModalPageModule);



/***/ })

}]);
//# sourceMappingURL=src_app_progress_graph-modal_graph-modal_module_ts.js.map