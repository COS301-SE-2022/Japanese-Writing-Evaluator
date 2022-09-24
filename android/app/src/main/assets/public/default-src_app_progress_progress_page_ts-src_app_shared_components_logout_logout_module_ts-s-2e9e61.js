"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_progress_progress_page_ts-src_app_shared_components_logout_logout_module_ts-s-2e9e61"],{

/***/ 4600:
/*!*******************************************!*\
  !*** ./src/app/progress/progress.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressPage": () => (/* binding */ ProgressPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _progress_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress.page.html?ngResource */ 58085);
/* harmony import */ var _progress_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progress.page.scss?ngResource */ 38091);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/appService/app-service.service */ 52741);






//import { AppServiceService } from '../services/app-service.service';
let ProgressPage = class ProgressPage {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        // object: { char: string; score: string; date: string };
        this.progressHiragana = new Map();
        this.progressKatakana = new Map();
        this.progressKanji = new Map();
        this.alphabetCategory = [
            { character: 'あ', category: 'Hiragana' },
            { character: 'ア', category: 'Katakana' },
            { character: '一', category: 'Kanji' }
        ];
        this.pageRequest = 'progress';
        this.char = '';
        this.percent = 0;
        this.hiragana = 'hiragana';
        this.katakana = 'katakana';
        this.kanji = 'kanji';
        this.map = new Map();
    }
    ngOnInit() {
        this.char = localStorage.getItem('char');
        this.percent = +localStorage.getItem('percentage');
        this.service.getProgress().subscribe(data => {
            this.progressArray = data.body.response;
            console.log(data);
            this.manipulateScores();
        });
        //testPurposes
        //also note the naming conventions are incorrect from the API so they need be changed
        this.writingStylesArray = [
            'hiragana', 'katakana', 'kanji'
        ];
        // this.progressArray = [
        //   { writing_style: 'hiragana', url: ' ', character: 'A', score: '25', uploadDate: '2022-07-19'  },
        //   { writing_style: 'hiragana', url: ' ', character: 'A', score: '50', uploadDate: '2022-07-20'  },
        //   { writing_style: 'hiragana', url: ' ', character: 'Ka', score: '72', uploadDate: '2022-07-22'  },
        //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '11', uploadDate: '2022-08-10'  },
        //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '22', uploadDate: '2022-08-12'  },
        //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '40', uploadDate: '2022-08-13'  },
        //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '67', uploadDate: '2022-08-14'  },
        //   { writing_style: 'hiragana', url: ' ', character: 'Ha', score: '84', uploadDate: '2022-08-15'  },
        //   { writing_style: 'kanji', url: ' ', character: 'two', score: '36', uploadDate: '2022-08-22'  },
        //   { writing_style: 'kanji', url: ' ', character: 'two', score: '80', uploadDate: '2022-08-23'  },
        //   { writing_style: 'kanji', url: ' ', character: 'one', score: '80', uploadDate: '2022-08-23'  },
        //   { writing_style: 'kanji', url: ' ', character: 'three', score: '80', uploadDate: '2022-08-23'  },
        //   { writing_style: 'katakana', url: ' ', character: 'A', score: '98', uploadDate: '2022-08-30'  },
        //   { writing_style: 'hiragana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30'  },
        //   { writing_style: 'katakana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30'  },
        //   { writing_style: 'katakana', url: ' ', character: 'A', score: '88', uploadDate: '2022-09-15'  },
        //   { writing_style: 'katakana', url: ' ', character: 'A', score: '70', uploadDate: '2022-09-18'  },
        //   { writing_style: 'katakana', url: ' ', character: 'U', score: '60', uploadDate: '2022-09-18'  },
        // ];
    }
    //calculating the averages from the score
    manipulateScores() {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.progressArray.length; i++) {
            //let scores: { score: string; date: string }[];
            let keyString = '';
            keyString += this.progressArray[i].character + '_';
            keyString += this.progressArray[i].writingStyle;
            if (this.progressHiragana.has(keyString) && keyString.includes('hiragana')) {
                const object = {
                    score: this.progressArray[i].score,
                    date: this.progressArray[i].uploadDate,
                };
                this.progressHiragana.get(keyString).push(object);
            }
            else if (keyString.includes('hiragana')) {
                const object = [{
                        score: this.progressArray[i].score,
                        date: this.progressArray[i].uploadDate,
                    }];
            }
            else if (this.progressKatakana.has(keyString) && keyString.includes('katakana')) {
                const object = {
                    score: this.progressArray[i].score,
                    date: this.progressArray[i].uploadDate,
                };
                this.progressKatakana.get(keyString).push(object);
            }
            else if (keyString.includes('katakana')) {
                const object = [{
                        score: this.progressArray[i].score,
                        date: this.progressArray[i].uploadDate,
                    }];
                this.progressKatakana.set(keyString, object);
            }
            else if (this.progressKanji.has(keyString) && keyString.includes('kanji')) {
                const object = {
                    score: this.progressArray[i].score,
                    date: this.progressArray[i].uploadDate,
                };
                this.progressKanji.get(keyString).push(object);
            }
            else if (keyString.includes('kanji')) {
                const object = [{
                        score: this.progressArray[i].score,
                        date: this.progressArray[i].uploadDate,
                    }];
                this.progressKanji.set(keyString, object);
            }
        }
    }
    // TODO: set the character and percentage, #73, Maryam Mohamad Al Mahdi
    setDisplay(char, percent) {
        this.char = char;
        this.percent = percent;
    }
    // TODO: navigates to home page, #73, Maryam Mohamad Al Mahdi
    setHome() {
        this.router.navigate(['/home']);
    }
    getLetter(letter) {
        let letterString = '';
        let index = letter.indexOf('_');
        if (index !== -1) {
            index -= 1;
            while (index !== -1) {
                letterString += letter[index];
                index -= 1;
            }
        }
        return letterString.split('').reverse().join('');
    }
    getStyle(writingStyle) {
        if (writingStyle.includes('hiragana')) {
            return 'hiragana';
        }
        else if (writingStyle.includes('katakana')) {
            return 'katakana';
        }
        else {
            return 'kanji';
        }
    }
    getPercent(objArray) {
        let totalPercent = 0;
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < objArray.length; i++) {
            totalPercent += Number(objArray[i].score);
        }
        return Math.round(totalPercent / objArray.length);
    }
    ifGuest() {
        if (localStorage.getItem('id')) {
            if (localStorage.getItem('id') === 'guest') {
                return true;
            }
        }
        return false;
    }
};
ProgressPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: _services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__.AppServiceService }
];
ProgressPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-progress',
        template: _progress_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_progress_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProgressPage);



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

/***/ 33335:
/*!****************************************************************!*\
  !*** ./src/app/shared/components/options/options.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsComponent": () => (/* binding */ OptionsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _options_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options.component.html?ngResource */ 64819);
/* harmony import */ var _options_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options.component.scss?ngResource */ 70251);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 52816);





let OptionsComponent = class OptionsComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    navigateAlphabet() {
        if (this.pageReq === 'home') {
            this.router.navigateByUrl('/home/alphabet-category?category=' + this.category);
        }
        else {
            this.router.navigateByUrl('/progress/progress-result?category=' + this.category);
        }
    }
};
OptionsComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router }
];
OptionsComponent.propDecorators = {
    letter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }],
    category: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }],
    pageReq: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }]
};
OptionsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-options',
        template: _options_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_options_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], OptionsComponent);



/***/ }),

/***/ 23739:
/*!*************************************************************!*\
  !*** ./src/app/shared/components/options/options.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsModule": () => (/* binding */ OptionsModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _options_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options.component */ 33335);




let OptionsModule = class OptionsModule {
};
OptionsModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        declarations: [_options_component__WEBPACK_IMPORTED_MODULE_0__.OptionsComponent],
        imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule],
        exports: [_options_component__WEBPACK_IMPORTED_MODULE_0__.OptionsComponent]
    })
], OptionsModule);



/***/ }),

/***/ 38091:
/*!********************************************************!*\
  !*** ./src/app/progress/progress.page.scss?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = ".container {\n  display: flex;\n  align-items: center;\n}\n\nh1 {\n  padding: 20px;\n}\n\nion-button {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n}\n\nion-img {\n  position: absolute;\n  left: 5px;\n  top: 5px;\n  width: 100px;\n  height: 100px;\n  margin-top: -10px;\n}\n\n.head {\n  background-color: #960722;\n  width: 100%;\n  height: 40%;\n  margin-top: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: white;\n  margin-bottom: 30px;\n}\n\n.head strong {\n  font-size: 200%;\n}\n\n.head span {\n  font-size: 100%;\n}\n\n.my-grid {\n  height: 100% !important;\n}\n\n.parent-row {\n  height: 100% !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFJQTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUFERjs7QUFHQTtFQUNFLGVBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7QUFBRjs7QUFHQTtFQUNFLHVCQUFBO0FBQUY7O0FBRUE7RUFDRSx1QkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0NBQUE7QUFDRiIsImZpbGUiOiJwcm9ncmVzcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuaDF7XG4gIHBhZGRpbmc6IDIwcHg7XG59XG5cbmlvbi1idXR0b257XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDVweDtcbiAgdG9wOiA1cHg7XG59XG5cbmlvbi1pbWd7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNXB4O1xuICB0b3A6IDVweDtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBtYXJnaW4tdG9wOiAtMTBweDtcbn1cblxuXG5cbi5oZWFke1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTYwNzIyO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MCU7XG4gIG1hcmdpbi10b3A6IDEwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogd2hpdGU7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG59XG4uaGVhZCBzdHJvbmd7XG4gIGZvbnQtc2l6ZTogMjAwJTtcbn1cblxuLmhlYWQgc3BhbntcbiAgZm9udC1zaXplOiAxMDAlO1xufVxuXG4ubXktZ3JpZCB7XG4gIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xufVxuLnBhcmVudC1yb3cge1xuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlciAhaW1wb3J0YW50O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlciAhaW1wb3J0YW50O1xufSJdfQ== */";

/***/ }),

/***/ 42131:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.scss?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "ion-button {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ291dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7QUFDRiIsImZpbGUiOiJsb2dvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tYnV0dG9ue1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1cHg7XG4gIHRvcDogNXB4O1xufVxuIl19 */";

/***/ }),

/***/ 73600:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/navbar/navbar.component.scss?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuYXZiYXIuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 70251:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/components/options/options.component.scss?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "ion-card {\n  display: flex;\n  position: relative;\n  border: 5px solid #960722;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 200px;\n  height: 200px;\n  transition: all 0.2s ease-in-out;\n  border-radius: 5%;\n}\n\nion-card:hover {\n  transform: scale(1.1);\n  box-shadow: 15px 15px 15px -10px rgba(0, 0, 0, 0.4);\n}\n\n.option {\n  margin-top: 10px;\n  width: 150px;\n  height: 180px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.descript {\n  width: 150px;\n  height: 180px;\n  text-align: center;\n}\n\n.letter {\n  font-size: 90px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wdGlvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UscUJBQUE7RUFDQSxtREFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0YiLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jYXJke1xuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlcjogNXB4IHNvbGlkICM5NjA3MjI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIHRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1pbi1vdXQ7XG4gIGJvcmRlci1yYWRpdXM6IDUlO1xufVxuXG5pb24tY2FyZDpob3ZlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbiAgYm94LXNoYWRvdzogMTVweCAxNXB4IDE1cHggLTEwcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xufVxuXG4ub3B0aW9ue1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICB3aWR0aDogMTUwcHg7XG4gIGhlaWdodDogMTgwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uZGVzY3JpcHR7XG4gIHdpZHRoOiAxNTBweDtcbiAgaGVpZ2h0OiAxODBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubGV0dGVye1xuICBmb250LXNpemU6IDkwcHg7XG59XG4iXX0= */";

/***/ }),

/***/ 58085:
/*!********************************************************!*\
  !*** ./src/app/progress/progress.page.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "<ion-content [fullscreen]=\"true\">\n  <div class=\"head\" >\n    <ion-img src=\"assets/images/JWE-logos_black.png\"></ion-img>\n    <app-logout></app-logout>\n    <p>\n      <strong>Progress</strong><br>\n      <em>\"You don't have to be extreme, just consistent\"</em><br>\n      Select which writing style progress results you would like to view below.\n    </p>\n  </div>\n\n  <div class>\n    <ion-grid class=\"my-grid\">\n      <ion-row class=\"parent-row\">\n        <ion-col *ngFor=\"let item of alphabetCategory\" size=\"col-auto\">\n          <app-options  [letter]='item.character' [category]='item.category' [pageReq]='pageRequest'></app-options>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n\n<app-navbar *ngIf=\"!ifGuest()\"></app-navbar>\n";

/***/ }),

/***/ 62182:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.html?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "<ion-button slot=\"end\" (click)=\"onLogout()\" color=\"dark\">Logout</ion-button>\n";

/***/ }),

/***/ 30947:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/navbar/navbar.component.html?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "  \n\n<!-- tabs for the navigation bar-->\n  <ion-footer >\n    <ion-tab-bar>\n      <ion-tabs>\n        <ion-row>\n          <ion-col size=\"4\">\n            <a [routerLink]=\"['/home']\"><!--direct to suggestions-->\n              <ion-tab-button >\n                <ion-icon name=\"language\"></ion-icon>\n                <ion-label>Characters</ion-label>\n              </ion-tab-button>\n            </a>\n          </ion-col>\n\n          <ion-col size=\"4\">\n            <a (click)=\"takePhoto()\"><!--direct to suggestions-->\n              <ion-tab-button >\n                <ion-icon name=\"camera\"></ion-icon>\n                <ion-label>Detect Object</ion-label>\n              </ion-tab-button>\n            </a>\n          </ion-col>\n  \n          <ion-col size=\"4\">\n            <a [routerLink]=\"['/progress']\">\n              <ion-tab-button >\n                <ion-icon name=\"analytics\"></ion-icon>\n                <ion-label>Progress</ion-label>\n              </ion-tab-button>\n            </a>\n          </ion-col>\n        </ion-row>\n      </ion-tabs>\n    </ion-tab-bar>\n  </ion-footer>\n";

/***/ }),

/***/ 64819:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/components/options/options.component.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card (click)=\"navigateAlphabet()\">\n  <div class=\"option\">\n    <div class=\"letter\">\n      <p>{{letter}}</p>\n    </div>\n  </div>\n  <p class=\"descript\">{{category}}</p>\n</ion-card>\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_progress_progress_page_ts-src_app_shared_components_logout_logout_module_ts-s-2e9e61.js.map