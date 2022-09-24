"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_dashboard_dashboard_module_ts"],{

/***/ 50425:
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPageRoutingModule": () => (/* binding */ DashboardPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.page */ 65935);




const routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_0__.DashboardPage
    }
];
let DashboardPageRoutingModule = class DashboardPageRoutingModule {
};
DashboardPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], DashboardPageRoutingModule);



/***/ }),

/***/ 34814:
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPageModule": () => (/* binding */ DashboardPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard-routing.module */ 50425);
/* harmony import */ var _shared_components_admin_nav_bar_admin_nav_bar_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/components/admin-nav-bar/admin-nav-bar.module */ 68603);
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.page */ 65935);
/* harmony import */ var _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/components/logout/logout.module */ 98192);









let DashboardPageModule = class DashboardPageModule {
};
DashboardPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule,
            _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.DashboardPageRoutingModule,
            _shared_components_admin_nav_bar_admin_nav_bar_module__WEBPACK_IMPORTED_MODULE_1__.AdminNavBarModule,
            _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_3__.LogoutModule
        ],
        declarations: [_dashboard_page__WEBPACK_IMPORTED_MODULE_2__.DashboardPage]
    })
], DashboardPageModule);



/***/ }),

/***/ 65935:
/*!*********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPage": () => (/* binding */ DashboardPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _dashboard_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.page.html?ngResource */ 73957);
/* harmony import */ var _dashboard_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.page.scss?ngResource */ 95065);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ 37942);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_2__);






let DashboardPage = class DashboardPage {
    constructor(router) {
        //   this.dataForAvg = {
        //     response: [
        //         {
        //             2022: {
        //                 '07': {
        //                     hiragana: {
        //                         averageScore: 49.142857142857146
        //                     }
        //                 },
        //                 '08': {
        //                     hiragana: {
        //                         averageScore: 33.25
        //                     }
        //                 },
        //                 '09': {
        //                     hiragana: {
        //                         averageScore: 51.0
        //                     }
        //                 }
        //             }
        //         }
        //     ]
        //  };
        this.router = router;
        // this.n = this.dataForAvg.response[0][2022]['10'];
        // console.log(this.n);
    }
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterViewInit() {
        this.frequencyOfVisits();
    }
    ngOnInit() { }
    //TODO: send data required to lineChartMethod for frequency of visits, #183, Maryam Mohamad Al Mahdi
    frequencyOfVisits() {
        this.lineChartMethod('Frequency of Uploads', [1, 54, 93, 67, 31, 50, 74, 48, 82, 70, 56, 27]);
    }
    //TODO: send data required to lineChartMethod for the average of hiragana, #183, Maryam Mohamad Al Mahdi
    averageHiragana() {
        this.lineChartMethod('Average of Hiragana', [3, 9, 45, 30, 21, 49, 72, 36, 54, 57, 83, 92]);
    }
    //TODO: send data required to lineChartMethod for the average of katakana, #183, Maryam Mohamad Al Mahdi
    averageKatakana() {
        this.lineChartMethod('Average of Katakana', [5, 26, 29, 37, 64, 78, 99, 55, 82, 61, 10, 21]);
    }
    //TODO: send data required to lineChartMethod for the average of kanji, #183, Maryam Mohamad Al Mahdi
    averageKanji() {
        this.lineChartMethod('Average of Kanji', [4, 6, 9, 11, 22, 21, 18, 27, 26, 15, 70, 86]);
    }
    //TODO: form the chart using chartjs for frequency and averages of the writing style, #183, Maryam Mohamad Al Mahdi
    lineChartMethod(title, percentage) {
        this.lineChart = new chart_js__WEBPACK_IMPORTED_MODULE_2__.Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: title,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: '#648981',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointStyle: 'rect',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 6,
                        pointHitRadius: 10,
                        data: percentage,
                        spanGaps: false,
                    },
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 10,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Percentage'
                            }
                        }],
                    xAxes: [{
                            ticks: {},
                            scaleLabel: {
                                display: true,
                                labelString: 'Months'
                            }
                        }]
                }
            }
        });
    }
};
DashboardPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router }
];
DashboardPage.propDecorators = {
    lineCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.ViewChild, args: ['lineCanvas',] }]
};
DashboardPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-dashboard',
        template: _dashboard_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_dashboard_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], DashboardPage);



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

/***/ 95065:
/*!**********************************************************!*\
  !*** ./src/app/dashboard/dashboard.page.scss?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "ion-content {\n  font-family: \"sans-serif\", \"Helvetica\", \"Arial\", \"Verdana\", \"Tahoma\", Sans-serif;\n}\n\nion-button {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n}\n\nion-img {\n  position: absolute;\n  left: 5px;\n  top: 5px;\n  width: 100px;\n  height: 100px;\n  margin-top: -10px;\n}\n\n.head {\n  background-color: #960722;\n  width: 100%;\n  height: 40%;\n  margin-top: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: white;\n  margin-bottom: 30px;\n}\n\n.head strong {\n  font-size: 200%;\n}\n\n.head span {\n  font-size: 100%;\n}\n\n.my-grid {\n  height: 100% !important;\n}\n\n.parent-row {\n  height: 100% !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n\n.topnav {\n  background-color: #333;\n  overflow: hidden;\n  display: flex;\n  justify-content: center;\n}\n\n.navCol {\n  font-size: 17px;\n  color: #f2f2f2;\n}\n\n.navCol:hover {\n  color: black;\n  background-color: #ddd;\n}\n\n.user {\n  display: flex;\n  justify-content: center;\n}\n\n.graph {\n  position: relative;\n  height: 50%;\n  width: 80%;\n  text-align: center;\n}\n\ncanvas {\n  height: 50%;\n  width: 50%;\n  transform: translateX(12%);\n  margin-top: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnRkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFDQTtFQUNFLGVBQUE7QUFFRjs7QUFDQTtFQUNFLGVBQUE7QUFFRjs7QUFDQTtFQUNFLHVCQUFBO0FBRUY7O0FBQUE7RUFDRSx1QkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0NBQUE7QUFHRjs7QUFBQTtFQUNFLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7QUFHRjs7QUFBQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBR0Y7O0FBQUE7RUFDRSxZQUFBO0VBQ0Esc0JBQUE7QUFHRjs7QUFBQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQUdGOztBQUFBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0FBR0Y7O0FBQUE7RUFDRSxXQUFBO0VBQ0EsVUFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7QUFHRiIsImZpbGUiOiJkYXNoYm9hcmQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xuICBmb250LWZhbWlseTogJ3NhbnMtc2VyaWYnLCAnSGVsdmV0aWNhJywgJ0FyaWFsJywgJ1ZlcmRhbmEnLCAnVGFob21hJywgU2Fucy1zZXJpZjtcbn1cblxuaW9uLWJ1dHRvbntcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNXB4O1xuICB0b3A6IDVweDtcbn1cblxuaW9uLWltZ3tcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1cHg7XG4gIHRvcDogNXB4O1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMTAwcHg7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG4uaGVhZHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk2MDcyMjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDAlO1xuICBtYXJnaW4tdG9wOiAxMDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHdoaXRlO1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xufVxuLmhlYWQgc3Ryb25ne1xuICBmb250LXNpemU6IDIwMCU7XG59XG5cbi5oZWFkIHNwYW57XG4gIGZvbnQtc2l6ZTogMTAwJTtcbn1cblxuLm15LWdyaWQge1xuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbn1cbi5wYXJlbnQtcm93IHtcbiAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXIgIWltcG9ydGFudDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXIgIWltcG9ydGFudDtcbn1cblxuLnRvcG5hdiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyXG59XG5cbi5uYXZDb2x7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgY29sb3I6ICNmMmYyZjI7XG59XG5cbi5uYXZDb2w6aG92ZXIge1xuICBjb2xvcjogYmxhY2s7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG59XG5cbi51c2Vye1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxufVxuXG4uZ3JhcGh7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiA1MCU7XG4gIHdpZHRoOiA4MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuY2FudmFze1xuICBoZWlnaHQ6IDUwJTtcbiAgd2lkdGg6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEyJSk7XG4gIG1hcmdpbi10b3A6IDUwcHg7XG59XG5cbiJdfQ== */";

/***/ }),

/***/ 42131:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.scss?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "ion-button {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ291dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7QUFDRiIsImZpbGUiOiJsb2dvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tYnV0dG9ue1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1cHg7XG4gIHRvcDogNXB4O1xufVxuIl19 */";

/***/ }),

/***/ 73957:
/*!**********************************************************!*\
  !*** ./src/app/dashboard/dashboard.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <div class=\"head\" >\n    <ion-img src=\"assets/images/JWE-logos_black.png\"></ion-img>\n    <app-logout></app-logout>\n    <p>\n      <strong>Dashboard</strong><br>\n      View analytics of the application below.\n    </p>\n  </div>\n\n  <div class=\"topnav\">\n    <ion-grid class=\"my-grid\">\n      <ion-row class=\"parent-row\">\n        <ion-col class=\"navCol\"><div class=\"user\" (click)=\"frequencyOfVisits()\">Frequency</div></ion-col>\n        <ion-col class=\"navCol\"><div class=\"user\" (click)=\"averageHiragana()\">Average - Hiragana</div></ion-col>\n        <ion-col class=\"navCol\"><div class=\"user\" (click)=\"averageKatakana()\">Average - Katakana</div></ion-col>\n        <ion-col class=\"navCol\"><div class=\"user\" (click)=\"averageKanji()\">Average - Kanji</div></ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n\n  <div class=\"graph\">\n    <canvas #lineCanvas style=\"position: relative; height: 20vh; width:20vw\"></canvas>\n  </div>\n\n \n\n  </ion-content>\n  <app-admin-nav-bar></app-admin-nav-bar>\n";

/***/ }),

/***/ 62182:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.html?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "<ion-button slot=\"end\" (click)=\"onLogout()\" color=\"dark\">Logout</ion-button>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_dashboard_dashboard_module_ts.js.map