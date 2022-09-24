"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_home_alphabet-category_alphabet-category_module_ts"],{

/***/ 94334:
/*!****************************************************************************!*\
  !*** ./src/app/home/alphabet-category/alphabet-category-routing.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlphabetCategoryPageRoutingModule": () => (/* binding */ AlphabetCategoryPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _alphabet_category_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alphabet-category.page */ 95566);




const routes = [
    {
        path: '',
        component: _alphabet_category_page__WEBPACK_IMPORTED_MODULE_0__.AlphabetCategoryPage
    }
];
let AlphabetCategoryPageRoutingModule = class AlphabetCategoryPageRoutingModule {
};
AlphabetCategoryPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], AlphabetCategoryPageRoutingModule);



/***/ }),

/***/ 82859:
/*!********************************************************************!*\
  !*** ./src/app/home/alphabet-category/alphabet-category.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlphabetCategoryPageModule": () => (/* binding */ AlphabetCategoryPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _alphabet_category_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alphabet-category-routing.module */ 94334);
/* harmony import */ var _alphabet_category_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alphabet-category.page */ 95566);
/* harmony import */ var _block_try_char_block_try_char_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .././block-try-char/block-try-char.component */ 82744);
/* harmony import */ var src_app_shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/components/navbar/navbar.module */ 37643);









let AlphabetCategoryPageModule = class AlphabetCategoryPageModule {
};
AlphabetCategoryPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule,
            _alphabet_category_routing_module__WEBPACK_IMPORTED_MODULE_0__.AlphabetCategoryPageRoutingModule,
            src_app_shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_3__.NavbarModule
        ],
        declarations: [_alphabet_category_page__WEBPACK_IMPORTED_MODULE_1__.AlphabetCategoryPage, _block_try_char_block_try_char_component__WEBPACK_IMPORTED_MODULE_2__.BlockTryCharComponent]
    })
], AlphabetCategoryPageModule);



/***/ }),

/***/ 95566:
/*!******************************************************************!*\
  !*** ./src/app/home/alphabet-category/alphabet-category.page.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlphabetCategoryPage": () => (/* binding */ AlphabetCategoryPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _alphabet_category_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alphabet-category.page.html?ngResource */ 78668);
/* harmony import */ var _alphabet_category_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alphabet-category.page.scss?ngResource */ 49926);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/character_data/character_sets.json */ 14141);






let AlphabetCategoryPage = class AlphabetCategoryPage {
    constructor(route, router) {
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        this.currentJSON = '';
        this.category = this.route.snapshot.queryParamMap.get('category');
        this.heading = this.category;
        const splitted = this.category.split(' ');
        console.log(splitted);
        this.currentJSON += splitted[0];
        this.currentJSON = this.currentJSON.toLowerCase();
        this.style = this.currentJSON;
        if (splitted.indexOf('Group') > -1) {
            this.currentJSON += 'Group' + splitted[3];
        }
        else {
            if (splitted.indexOf('Vowels') > -1) {
                this.currentJSON += 'Vowels';
            }
        }
        console.log(this.currentJSON);
        this.getJSON();
    }
    getJSON() {
        if (this.currentJSON === 'katakana') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.katakana;
        }
        if (this.currentJSON === 'kanji') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.kanji;
        }
        if (this.currentJSON === 'hiraganaVowels') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaVowels;
        }
        if (this.currentJSON === 'hiraganaGroupK') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupK;
        }
        if (this.currentJSON === 'hiraganaGroupS') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupS;
        }
        if (this.currentJSON === 'hiraganaGroupT') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupT;
        }
        if (this.currentJSON === 'hiraganaGroupN') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupN;
        }
        if (this.currentJSON === 'hiraganaGroupH') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupH;
        }
        if (this.currentJSON === 'hiraganaGroupM') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupK;
        }
        if (this.currentJSON === 'hiraganaGroupY') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupY;
        }
        if (this.currentJSON === 'hiraganaGroupR') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupK;
        }
        if (this.currentJSON === 'hiraganaGroupW') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupW;
        }
        if (this.currentJSON === 'hiraganaGroupG') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupG;
        }
        if (this.currentJSON === 'hiraganaGroupZ') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupZ;
        }
        if (this.currentJSON === 'hiraganaGroupD') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupD;
        }
        if (this.currentJSON === 'hiraganaGroupB') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupB;
        }
        if (this.currentJSON === 'hiraganaGroupP') {
            this.jsonAlphabet = _shared_character_data_character_sets_json__WEBPACK_IMPORTED_MODULE_2__.hiraganaGroupP;
        }
    }
    onLogout() {
        localStorage.removeItem('id');
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        this.router.navigate(['/login']);
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
AlphabetCategoryPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router }
];
AlphabetCategoryPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-alphabet-category',
        template: _alphabet_category_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_alphabet_category_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AlphabetCategoryPage);



/***/ }),

/***/ 82744:
/*!*****************************************************************!*\
  !*** ./src/app/home/block-try-char/block-try-char.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlockTryCharComponent": () => (/* binding */ BlockTryCharComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _block_try_char_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block-try-char.component.html?ngResource */ 61475);
/* harmony import */ var _block_try_char_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block-try-char.component.scss?ngResource */ 64380);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var src_app_services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/appService/app-service.service */ 52741);






let BlockTryCharComponent = class BlockTryCharComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
    }
    ngOnInit() { }
    //TODO: add navigation to upload page, #, Phumu
    showUploadPage() {
        //send image to the upload page and redirect to upload page
        const image = {
            characterName: this.translate,
            group: this.group,
            url: this.letter
        };
        this.service.setTryImage(image);
        this.router.navigate(['/upload']);
    }
};
BlockTryCharComponent.ctorParameters = () => [
    { type: src_app_services_appService_app_service_service__WEBPACK_IMPORTED_MODULE_2__.AppServiceService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router }
];
BlockTryCharComponent.propDecorators = {
    letter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }],
    translate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }],
    group: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }]
};
BlockTryCharComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-block-try-char',
        template: _block_try_char_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_block_try_char_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], BlockTryCharComponent);



/***/ }),

/***/ 49926:
/*!*******************************************************************************!*\
  !*** ./src/app/home/alphabet-category/alphabet-category.page.scss?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = "ion-content {\n  font-family: sans-serif, Helvetica, Arial, Verdana, Tahoma;\n}\n\nion-button {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n}\n\nion-img {\n  position: absolute;\n  left: 5px;\n  top: 5px;\n  width: 100px;\n  height: 100px;\n  margin-top: -10px;\n}\n\n.head {\n  background-color: #960722;\n  width: 100%;\n  height: 40%;\n  margin-top: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: white;\n  margin-bottom: 30px;\n}\n\n.head strong {\n  font-size: 200%;\n}\n\n.head span {\n  font-size: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFscGhhYmV0LWNhdGVnb3J5LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDBEQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUNBO0VBQ0UsZUFBQTtBQUVGOztBQUNBO0VBQ0UsZUFBQTtBQUVGIiwiZmlsZSI6ImFscGhhYmV0LWNhdGVnb3J5LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50e1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZiwgSGVsdmV0aWNhLCBBcmlhbCwgVmVyZGFuYSwgVGFob21hO1xufVxuXG5pb24tYnV0dG9ue1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1cHg7XG4gIHRvcDogNXB4O1xufVxuXG5pb24taW1ne1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDVweDtcbiAgdG9wOiA1cHg7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG59XG5cbi5oZWFke1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTYwNzIyO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MCU7XG4gIG1hcmdpbi10b3A6IDEwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogd2hpdGU7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG59XG4uaGVhZCBzdHJvbmd7XG4gIGZvbnQtc2l6ZTogMjAwJTtcbn1cblxuLmhlYWQgc3BhbntcbiAgZm9udC1zaXplOiAxMDAlO1xufVxuIl19 */";

/***/ }),

/***/ 64380:
/*!******************************************************************************!*\
  !*** ./src/app/home/block-try-char/block-try-char.component.scss?ngResource ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = "ion-card {\n  display: flex;\n  position: relative;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  transition: all 0.2s ease-in-out;\n}\n\nion-card:hover {\n  transform: scale(1.1);\n  box-shadow: 15px 15px 15px -10px rgba(0, 0, 0, 0.4);\n}\n\n.character {\n  width: 200px;\n  height: 200px;\n  background: #ffffff;\n  border-radius: 5%;\n  position: relative;\n  top: -10px;\n  border: 5px solid #960722;\n}\n\n.character h1 {\n  font-size: 90px;\n  text-align: center;\n}\n\n.character p {\n  padding-bottom: 20px;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2NrLXRyeS1jaGFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7QUFDRjs7QUFFQTtFQUNFLHFCQUFBO0VBQ0EsbURBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7QUFDRiIsImZpbGUiOiJibG9jay10cnktY2hhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jYXJke1xuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2UtaW4tb3V0O1xufVxuXG5pb24tY2FyZDpob3ZlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbiAgYm94LXNoYWRvdzogMTVweCAxNXB4IDE1cHggLTEwcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xufVxuXG4uY2hhcmFjdGVye1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDUlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogLTEwcHg7XG4gIGJvcmRlcjogNXB4IHNvbGlkICM5NjA3MjI7XG59XG5cbi5jaGFyYWN0ZXIgaDF7XG4gIGZvbnQtc2l6ZTogOTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2hhcmFjdGVyIHB7XG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iXX0= */";

/***/ }),

/***/ 78668:
/*!*******************************************************************************!*\
  !*** ./src/app/home/alphabet-category/alphabet-category.page.html?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <div class=\"head\" >\n    <ion-button slot=\"end\" (click)=\"onLogout()\" color=\"dark\">Logout</ion-button>\n    <ion-img src=\"assets/images/JWE-logos_black.png\"></ion-img>\n\n    <p>\n      <strong>{{heading}}</strong><br>\n      Select which character we you would like to upload below.\n    </p>\n</div>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col *ngFor=\"let item of jsonAlphabet\">\n          <app-block-try-char [letter]='item.character' [translate]='item.translation' [group]='style'></app-block-try-char>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n<app-navbar *ngIf=\"!ifGuest()\"></app-navbar>\n";

/***/ }),

/***/ 61475:
/*!******************************************************************************!*\
  !*** ./src/app/home/block-try-char/block-try-char.component.html?ngResource ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card class=\"character\" (click)=\"showUploadPage()\">\n    <h1>{{letter}}</h1>\n    <p>{{translate}}</p>\n  </ion-card>\n";

/***/ }),

/***/ 14141:
/*!***********************************************************!*\
  !*** ./src/app/shared/character_data/character_sets.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"hiraganaVowels":[{"character":"あ","translation":"A"},{"character":"い","translation":"I"},{"character":"う","translation":"U"},{"character":"え","translation":"E"},{"character":"お","translation":"O"}],"hiraganaGroupK":[{"character":"か","translation":"Ka"},{"character":"き","translation":"Ki"},{"character":"く","translation":"Ku"},{"character":"け","translation":"Ke"},{"character":"こ","translation":"Ko"}],"hiraganaGroupS":[{"character":"さ","translation":"Sa"},{"character":"し","translation":"Si"},{"character":"す","translation":"Su"},{"character":"せ","translation":"Se"},{"character":"そ","translation":"So"}],"hiraganaGroupT":[{"character":"た","translation":"Ta"},{"character":"ち","translation":"Ti"},{"character":"つ","translation":"Tu"},{"character":"て","translation":"Te"},{"character":"と","translation":"To"}],"hiraganaGroupN":[{"character":"な","translation":"Na"},{"character":"に","translation":"Ni"},{"character":"ぬ","translation":"Nu"},{"character":"ね","translation":"Ne"},{"character":"の","translation":"No"}],"hiraganaGroupH":[{"character":"は","translation":"Ha"},{"character":"ひ","translation":"Hi"},{"character":"ふ","translation":"Hu"},{"character":"へ","translation":"He"},{"character":"ほ","translation":"Ho"}],"hiraganaGroupM":[{"character":"ま","translation":"Ma"},{"character":"み","translation":"Mi"},{"character":"む","translation":"Mu"},{"character":"め","translation":"Me"},{"character":"も","translation":"Mo"}],"hiraganaGroupY":[{"character":"や","translation":"Ya"},{"character":"ゆ","translation":"Yu"},{"character":"よ","translation":"Yo"}],"hiraganaGroupR":[{"character":"ら","translation":"Ra"},{"character":"り","translation":"Ri"},{"character":"る","translation":"Ru"},{"character":"れ","translation":"Re"},{"character":"ろ","translation":"Ro"}],"hiraganaGroupW":[{"character":"わ","translation":"Wa"},{"character":"ゐ","translation":"Wi"},{"character":"ゑ","translation":"We"},{"character":"を","translation":"Wo"}],"hiraganaGroupG":[{"character":"が","translation":"Ga"},{"character":"ぎ","translation":"Gi"},{"character":"ぐ","translation":"Gu"},{"character":"げ","translation":"Ge"},{"character":"ご","translation":"Go"}],"hiraganaGroupZ":[{"character":"ざ","translation":"Za"},{"character":"じ","translation":"Zi"},{"character":"ず","translation":"Zu"},{"character":"ぜ","translation":"Ze"},{"character":"ぞ","translation":"Zo"}],"hiraganaGroupD":[{"character":"だ","translation":"Da"},{"character":"ぢ","translation":"Di"},{"character":"づ","translation":"Du"},{"character":"で","translation":"De"},{"character":"ど","translation":"Do"}],"hiraganaGroupB":[{"character":"ば","translation":"Ba"},{"character":"び","translation":"Bi"},{"character":"ぶ","translation":"Bu"},{"character":"べ","translation":"Be"},{"character":"ぼ","translation":"Bo"}],"hiraganaGroupP":[{"character":"ぱ","translation":"Pa"},{"character":"ぴ","translation":"Pi"},{"character":"ぷ","translation":"Pu"},{"character":"ぺ","translation":"Pe"},{"character":"ぽ","translation":"Po"}],"katakana":[{"character":"ア","translation":"A"},{"character":"イ","translation":"I"},{"character":"ウ","translation":"U"},{"character":"エ","translation":"E"}],"kanji":[{"character":"一","translation":"one"},{"character":"二","translation":"two"},{"character":"三","translation":"three"},{"character":"四","translation":"four"},{"character":"五","translation":"five"},{"character":"六","translation":"six"},{"character":"七","translation":"seven"},{"character":"八","translation":"eight"},{"character":"九","translation":"nine"},{"character":"十","translation":"ten"}]}');

/***/ })

}]);
//# sourceMappingURL=src_app_home_alphabet-category_alphabet-category_module_ts.js.map