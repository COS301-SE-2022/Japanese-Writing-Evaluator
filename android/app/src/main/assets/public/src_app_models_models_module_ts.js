"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_models_models_module_ts"],{

/***/ 6421:
/*!*************************************************!*\
  !*** ./src/app/models/models-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelsPageRoutingModule": () => (/* binding */ ModelsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _models_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models.page */ 41112);




const routes = [
    {
        path: '',
        component: _models_page__WEBPACK_IMPORTED_MODULE_0__.ModelsPage
    }
];
let ModelsPageRoutingModule = class ModelsPageRoutingModule {
};
ModelsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ModelsPageRoutingModule);



/***/ }),

/***/ 4658:
/*!*****************************************!*\
  !*** ./src/app/models/models.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelsPageModule": () => (/* binding */ ModelsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _models_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models-routing.module */ 6421);
/* harmony import */ var _models_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models.page */ 41112);
/* harmony import */ var _shared_components_piechart_piechart_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/components/piechart/piechart.module */ 28071);
/* harmony import */ var _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/components/logout/logout.module */ 98192);
/* harmony import */ var _shared_components_admin_nav_bar_admin_nav_bar_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/admin-nav-bar/admin-nav-bar.module */ 68603);










let ModelsPageModule = class ModelsPageModule {
};
ModelsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            _models_routing_module__WEBPACK_IMPORTED_MODULE_0__.ModelsPageRoutingModule,
            _shared_components_piechart_piechart_module__WEBPACK_IMPORTED_MODULE_2__.PiechartModule,
            _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_3__.LogoutModule,
            _shared_components_admin_nav_bar_admin_nav_bar_module__WEBPACK_IMPORTED_MODULE_4__.AdminNavBarModule
        ],
        declarations: [_models_page__WEBPACK_IMPORTED_MODULE_1__.ModelsPage]
    })
], ModelsPageModule);



/***/ }),

/***/ 41112:
/*!***************************************!*\
  !*** ./src/app/models/models.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelsPage": () => (/* binding */ ModelsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _models_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models.page.html?ngResource */ 65714);
/* harmony import */ var _models_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models.page.scss?ngResource */ 73676);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ 37942);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/appService/app-service.service */ 52741);







let ModelsPage = class ModelsPage {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.accuracy = [];
        this.loss = [];
        this.chartLabels = [];
    }
    ngOnInit() {
        this.service.adminModelData().subscribe(res => {
            this.characterModel = res.body;
            console.log(res.body);
        });
    }
    onLogout() {
        // this function logs the user out of the system
        localStorage.removeItem('id');
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        this.router.navigate(['/login']);
    }
    // function to create chart
    chartCreator(chartlabels, accuracy, loss, canvas) {
        console.log(accuracy);
        this.barGraph = new (chart_js__WEBPACK_IMPORTED_MODULE_2___default())(canvas.nativeElement, {
            type: 'bar',
            data: {
                labels: chartlabels,
                datasets: [
                    {
                        label: 'Model Accuracy',
                        data: accuracy,
                        backgroundColor: [
                            'rgb(50,205,50,0.2)',
                            'rgb(50,205,50,0.2)',
                            'rgb(50,205,50,0.2)',
                        ],
                        borderColor: [
                            'rgb(50,205,50)',
                            'rgb(50,205,50)',
                            'rgb(50,205,50)'
                        ],
                        borderWidth: 1,
                    },
                    {
                        label: 'Model Loss',
                        data: loss,
                        backgroundColor: [
                            'rgb(255,69,0,0.2)',
                            'rgb(255,69,0,0.2)',
                            'rgb(255,69,0,0.2)',
                        ],
                        borderColor: [
                            'rgb(255,69,0)',
                            'rgb(255,69,0)',
                            'rgb(255,69,0)',
                        ],
                        borderWidth: 1,
                    }
                ],
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 10,
                            }
                        }],
                }
            }
        });
    }
    // set all the chart data to the right writing style
    showHiraganaCharts() {
        //call chartCreator with corresponding writing style
        let characcuracy = [];
        let charloss = [];
        let charchartLabels = [];
        //character recognition
        this.characterModel.data.hiragana.characterRecognition.forEach(model => {
            characcuracy.push(Number(model.accuracy.substring(0, 7)));
            charloss.push(Number(model.loss.substring(0, 7)));
            charchartLabels.push(model.version);
        });
        this.chartCreator(charchartLabels, characcuracy, charloss, this.hiraganaCharacterCanvas);
        characcuracy = [];
        charloss = [];
        charchartLabels = [];
        //stroke recognition
        this.characterModel.data.hiragana.strokes.forEach(model => {
            characcuracy.push(Number(model.accuracy.substring(0, 7)));
            charloss.push(Number(model.loss.substring(0, 7)));
            charchartLabels.push(model.version);
        });
        this.chartCreator(charchartLabels, characcuracy, charloss, this.hiraganaStrokeCanvas);
    }
    showKatakanaCharts() {
        //call chartCreator with corresponding writing style
        let characcuracy = [];
        let charloss = [];
        let charchartLabels = [];
        //character recognition
        this.characterModel.data.katakana.characterRecognition.forEach(model => {
            characcuracy.push(Number(model.accuracy.substring(0, 7)));
            charloss.push(Number(model.loss.substring(0, 7)));
            charchartLabels.push(model.version);
        });
        this.chartCreator(charchartLabels, characcuracy, charloss, this.katakanaCharacterCanvas);
        characcuracy = [];
        charloss = [];
        charchartLabels = [];
        //stroke recognition
        this.characterModel.data.katakana.strokes.forEach(model => {
            characcuracy.push(Number(model.accuracy.substring(0, 7)));
            charloss.push(Number(model.loss.substring(0, 7)));
            charchartLabels.push(model.version);
        });
        this.chartCreator(charchartLabels, characcuracy, charloss, this.katakanaStrokeCanvas);
    }
    showKanjiCharts() {
        //call chartCreator with corresponding writing style
        let characcuracy = [];
        let charloss = [];
        let charchartLabels = [];
        //character recognition
        this.characterModel.data.kanji.characterRecognition.forEach(model => {
            characcuracy.push(Number(model.accuracy.substring(0, 7)));
            charloss.push(Number(model.loss.substring(0, 7)));
            charchartLabels.push(model.version);
        });
        this.chartCreator(charchartLabels, characcuracy, charloss, this.kanjiCharacterCanvas);
        characcuracy = [];
        charloss = [];
        charchartLabels = [];
        //stroke recognition
        this.characterModel.data.kanji.strokes.forEach(model => {
            characcuracy.push(Number(model.accuracy.substring(0, 7)));
            charloss.push(Number(model.loss.substring(0, 7)));
            charchartLabels.push(model.version);
        });
        this.chartCreator(charchartLabels, characcuracy, charloss, this.kanjiStrokeCanvas);
    }
};
ModelsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_3__.AppServiceService }
];
ModelsPage.propDecorators = {
    hiraganaCharacterCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild, args: ['hiraganaCharacterCanvas',] }],
    hiraganaStrokeCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild, args: ['hiraganaStrokeCanvas',] }],
    katakanaCharacterCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild, args: ['katakanaCharacterCanvas',] }],
    katakanaStrokeCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild, args: ['katakanaStrokeCanvas',] }],
    kanjiCharacterCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild, args: ['kanjiCharacterCanvas',] }],
    kanjiStrokeCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild, args: ['kanjiStrokeCanvas',] }]
};
ModelsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-models',
        template: _models_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_models_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ModelsPage);



/***/ }),

/***/ 9487:
/*!**************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogoutComponent": () => (/* binding */ LogoutComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _logout_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logout.component.html?ngResource */ 62182);
/* harmony import */ var _logout_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logout.component.scss?ngResource */ 42131);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 52816);





let LogoutComponent = class LogoutComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    onLogout() {
        // this function logs the user out of the system
        localStorage.removeItem('id');
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        this.router.navigate(['/login']);
    }
};
LogoutComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router }
];
LogoutComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-logout',
        template: _logout_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_logout_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], LogoutComponent);



/***/ }),

/***/ 98192:
/*!***********************************************************!*\
  !*** ./src/app/shared/components/logout/logout.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogoutModule": () => (/* binding */ LogoutModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _logout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logout.component */ 9487);





let LogoutModule = class LogoutModule {
};
LogoutModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        declarations: [_logout_component__WEBPACK_IMPORTED_MODULE_0__.LogoutComponent],
        imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
        exports: [_logout_component__WEBPACK_IMPORTED_MODULE_0__.LogoutComponent]
    })
], LogoutModule);



/***/ }),

/***/ 88186:
/*!******************************************************************!*\
  !*** ./src/app/shared/components/piechart/piechart.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PiechartComponent": () => (/* binding */ PiechartComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _piechart_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piechart.component.html?ngResource */ 14268);
/* harmony import */ var _piechart_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./piechart.component.scss?ngResource */ 24665);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ 37942);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_2__);





let PiechartComponent = class PiechartComponent {
    constructor() { }
    ngAfterViewInit() {
        this.pieChartCreator();
    }
    pieChartCreator() {
        this.pieChart = new chart_js__WEBPACK_IMPORTED_MODULE_2__.Chart(this.pieCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: this.labels,
                datasets: [{
                        label: 'blue',
                        data: this.data
                    }],
            }
        });
    }
};
PiechartComponent.ctorParameters = () => [];
PiechartComponent.propDecorators = {
    data: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }],
    labels: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }],
    pieCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild, args: ['pieCanvas',] }]
};
PiechartComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-piechart',
        template: _piechart_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_piechart_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], PiechartComponent);



/***/ }),

/***/ 28071:
/*!***************************************************************!*\
  !*** ./src/app/shared/components/piechart/piechart.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PiechartModule": () => (/* binding */ PiechartModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _piechart_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piechart.component */ 88186);



let PiechartModule = class PiechartModule {
};
PiechartModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        declarations: [_piechart_component__WEBPACK_IMPORTED_MODULE_0__.PiechartComponent],
        imports: [],
        exports: [_piechart_component__WEBPACK_IMPORTED_MODULE_0__.PiechartComponent]
    })
], PiechartModule);



/***/ }),

/***/ 73676:
/*!****************************************************!*\
  !*** ./src/app/models/models.page.scss?ngResource ***!
  \****************************************************/
/***/ ((module) => {

module.exports = ".head {\n  background-color: #960722;\n  width: 100%;\n  height: 200px;\n  margin-top: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: white;\n}\n\n.head strong {\n  font-size: 200%;\n}\n\n.head span {\n  font-size: 100%;\n}\n\nion-img {\n  position: absolute;\n  left: 5px;\n  top: 5px;\n  width: 100px;\n  height: 100px;\n  margin-top: -10px;\n}\n\nion-button {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n}\n\na {\n  color: white;\n}\n\n.models {\n  margin: 2px;\n  width: 250px;\n  height: inherit;\n  border: solid 3px #960722;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUdBO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFBSjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7QUFBRjs7QUFPQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBSkYiLCJmaWxlIjoibW9kZWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFke1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM5NjA3MjI7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAyMDBweDsvLzIwJVxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuXG4uaGVhZCBzdHJvbmd7XG4gIGZvbnQtc2l6ZTogMjAwJTtcbn1cblxuLmhlYWQgc3BhbntcbiAgZm9udC1zaXplOiAxMDAlO1xufVxuXG4gIFxuaW9uLWltZ3tcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogNXB4O1xuICAgIHRvcDogNXB4O1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG5pb24tYnV0dG9ue1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1cHg7XG4gIHRvcDogNXB4O1xufVxuXG5he1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi8vIGlvbi1hY2NvcmRpb257XG4vLyAgIC0tYm9yZGVyLWNvbG9yOiAjRDNEM0QzO1xuLy8gfVxuXG4ubW9kZWxze1xuICBtYXJnaW46IDJweDtcbiAgd2lkdGg6IDI1MHB4O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIGJvcmRlcjogc29saWQgM3B4ICM5NjA3MjIgO1xuXG59Il19 */";

/***/ }),

/***/ 42131:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.scss?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "ion-button {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ291dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7QUFDRiIsImZpbGUiOiJsb2dvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tYnV0dG9ue1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1cHg7XG4gIHRvcDogNXB4O1xufVxuIl19 */";

/***/ }),

/***/ 24665:
/*!*******************************************************************************!*\
  !*** ./src/app/shared/components/piechart/piechart.component.scss?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwaWVjaGFydC5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 65714:
/*!****************************************************!*\
  !*** ./src/app/models/models.page.html?ngResource ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "\n\n<ion-content>\n  <div class=\"head\" >\n    <ion-img src=\"assets/images/JWE-logos_black.png\"></ion-img>\n    <app-logout></app-logout>\n\n    <h1></h1>\n    <p>\n      <strong>Dashboard</strong><br> <span>ダッシュボード</span><br>\n      \"In some narrow use cases, computer vision is more effective than human vision.\"<br>\n      -<a href=\"https://loupfunds.com/eight-fun-facts-about-computer-vision/\">Doug Clinton</a>\n    </p>\n  </div>\n\n  <div > <!--graph will go here-->\n\n  </div>\n\n  <ion-accordion-group> <!--the drop down for the models for each of the writing styles-->\n    <ion-grid>\n      <ion-row>\n        <ion-accordion>\n          <ion-item slot=\"header\"  (click)=\"showHiraganaCharts()\">\n            <ion-label>Hiragana</ion-label>\n          </ion-item>\n          <div class=\"ion-padding\" slot=\"content\"> <!--The content of the dropdown, the diferent dives with the models-->\n            <ion-col>\n              <ion-card  class=\"graph\" ><!--for loop for the number of models-->\n                <h5>Character Recognition Model</h5>\n                <!--Pie chart loss and accuracy-->\n                <canvas #hiraganaCharacterCanvas style=\"position: relative; height:20vh; width:40vw\"></canvas>\n              </ion-card>\n            </ion-col>\n            <ion-col>\n              <ion-card  class=\"graph\" ><!--for loop for the number of models-->\n                <h5>Stroke Recognition Model</h5>\n                <!--Pie chart loss and accuracy-->\n                <canvas #hiraganaStrokeCanvas style=\"position: relative; height:20vh; width:40vw\"></canvas>\n              </ion-card>\n            </ion-col>\n          </div>\n        </ion-accordion>\n      </ion-row>\n\n\n      <ion-row>\n        <ion-accordion>\n          <ion-item slot=\"header\" (click)=\"showKatakanaCharts()\">\n            <ion-label>Katakana</ion-label>\n          </ion-item>\n          <div class=\"ion-padding\" slot=\"content\"> <!--The content of the dropdown, the diferent dives with the models-->\n            <ion-col>\n              <ion-card  class=\"graph\" ><!--for loop for the number of models-->\n                <h5>Character Recognition Model</h5>\n                <!--Pie chart loss and accuracy-->\n                <canvas #katakanaCharacterCanvas style=\"position: relative; height:20vh; width:40vw\"></canvas>\n              </ion-card>\n            </ion-col>\n            <ion-col>\n              <ion-card  class=\"graph\" ><!--for loop for the number of models-->\n                <h5>Stroke Recognition Model</h5>\n                <!--Pie chart loss and accuracy-->\n                <canvas #katakanaStrokeCanvas style=\"position: relative; height:20vh; width:40vw\"></canvas>\n              </ion-card>\n            </ion-col>\n          </div>\n        </ion-accordion>\n      </ion-row>\n\n\n      <ion-row>\n        <ion-accordion>\n          <ion-item slot=\"header\" (click)=\"showKanjiCharts()\">\n            <ion-label>Kanji</ion-label>\n          </ion-item>\n          <div class=\"ion-padding\" slot=\"content\"> <!--The content of the dropdown, the diferent dives with the models-->\n            <ion-col>\n              <ion-card  class=\"graph\" ><!--for loop for the number of models-->\n                <h5>Character Recognition Model</h5>\n                <!--Pie chart loss and accuracy-->\n                <canvas #kanjiCharacterCanvas style=\"position: relative; height:20vh; width:40vw\"></canvas>\n              </ion-card>\n            </ion-col>\n            <ion-col>\n              <ion-card  class=\"graph\" ><!--for loop for the number of models-->\n                <h5>Stroke Recognition Model</h5>\n                <!--Pie chart loss and accuracy-->\n                <canvas #kanjiStrokeCanvas style=\"position: relative; height:20vh; width:40vw\"></canvas>\n              </ion-card>\n            </ion-col>\n          </div>\n        </ion-accordion>\n      </ion-row>\n    </ion-grid>\n  </ion-accordion-group>\n\n</ion-content>\n\n<app-admin-nav-bar></app-admin-nav-bar>\n";

/***/ }),

/***/ 62182:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.html?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "<ion-button slot=\"end\" (click)=\"onLogout()\" color=\"dark\">Logout</ion-button>\n";

/***/ }),

/***/ 14268:
/*!*******************************************************************************!*\
  !*** ./src/app/shared/components/piechart/piechart.component.html?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = "<canvas #pieCanvas style=\"position: relative; height:20vh; width:40vw\"></canvas>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_models_models_module_ts.js.map