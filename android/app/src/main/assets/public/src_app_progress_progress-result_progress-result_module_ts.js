"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_progress_progress-result_progress-result_module_ts"],{

/***/ 62000:
/*!*********************************************************************!*\
  !*** ./src/app/progress/progress-block/progress-block.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressBlockComponent": () => (/* binding */ ProgressBlockComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _progress_block_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress-block.component.html?ngResource */ 18652);
/* harmony import */ var _progress_block_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progress-block.component.scss?ngResource */ 21333);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _graph_modal_graph_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graph-modal/graph-modal.page */ 98801);






let ProgressBlockComponent = class ProgressBlockComponent {
    constructor(modalController) {
        this.modalController = modalController;
        this.hiraganaAlphabet = [
            { character: 'あ', translation: 'A' },
            { character: 'い', translation: 'I' },
            { character: 'う', translation: 'U' },
            { character: 'え', translation: 'E' },
            { character: 'お', translation: 'O' },
            { character: 'か', translation: 'Ka' },
            { character: 'き', translation: 'Ki' },
            { character: 'く', translation: 'Ku' },
            { character: 'け', translation: 'Ke' },
            { character: 'こ', translation: 'Ko' },
            { character: 'さ', translation: 'Sa' },
            { character: 'し', translation: 'Si' },
            { character: 'す', translation: 'Su' },
            { character: 'せ', translation: 'Se' },
            { character: 'そ', translation: 'So' },
            { character: 'た', translation: 'Ta' },
            { character: 'ち', translation: 'Ti' },
            { character: 'つ', translation: 'Tu' },
            { character: 'て', translation: 'Te' },
            { character: 'と', translation: 'To' },
            { character: 'な', translation: 'Na' },
            { character: 'に', translation: 'Ni' },
            { character: 'ぬ', translation: 'Nu' },
            { character: 'ね', translation: 'Ne' },
            { character: 'の', translation: 'No' },
            { character: 'は', translation: 'Ha' },
            { character: 'ひ', translation: 'Hi' },
            { character: 'ふ', translation: 'Hu' },
            { character: 'へ', translation: 'He' },
            { character: 'ほ', translation: 'Ho' },
            { character: 'ま', translation: 'Ma' },
            { character: 'み', translation: 'Mi' },
            { character: 'む', translation: 'Mu' },
            { character: 'め', translation: 'Me' },
            { character: 'も', translation: 'Mo' },
            { character: 'や', translation: 'Ya' },
            { character: 'ゆ', translation: 'Yu' },
            { character: 'よ', translation: 'Yo' },
            { character: 'ら', translation: 'Ra' },
            { character: 'り', translation: 'Ri' },
            { character: 'る', translation: 'Ru' },
            { character: 'れ', translation: 'Re' },
            { character: 'ろ', translation: 'Ro' },
            { character: 'わ', translation: 'Wa' },
            { character: 'ゐ', translation: 'Wi' },
            { character: 'ゑ', translation: 'We' },
            { character: 'を', translation: 'Wo' },
            { character: 'が', translation: 'Ga' },
            { character: 'ぎ', translation: 'Gi' },
            { character: 'ぐ', translation: 'Gu' },
            { character: 'げ', translation: 'Ge' },
            { character: 'ご', translation: 'Go' },
            { character: 'ざ', translation: 'Za' },
            { character: 'じ', translation: 'Zi' },
            { character: 'ず', translation: 'Zu' },
            { character: 'ぜ', translation: 'Ze' },
            { character: 'ぞ', translation: 'Zo' },
            { character: 'だ', translation: 'Da' },
            { character: 'ぢ', translation: 'Di' },
            { character: 'づ', translation: 'Du' },
            { character: 'で', translation: 'De' },
            { character: 'ど', translation: 'Do' },
            { character: 'ば', translation: 'Ba' },
            { character: 'び', translation: 'Bi' },
            { character: 'ぶ', translation: 'Bu' },
            { character: 'べ', translation: 'Be' },
            { character: 'ぼ', translation: 'Bo' },
            { character: 'ぱ', translation: 'Pa' },
            { character: 'ぴ', translation: 'Pi' },
            { character: 'ぷ', translation: 'Pu' },
            { character: 'ぺ', translation: 'Pe' },
            { character: 'ぽ', translation: 'Po' },
        ];
        this.katakanaAlphabet = [
            { character: 'ア', translation: 'A' },
            { character: 'イ', translation: 'I' },
            { character: 'ウ', translation: 'U' },
            { character: 'エ', translation: 'E' },
        ];
        this.kanjiAlphabet = [
            { character: '一', translation: 'one' },
            { character: '二', translation: 'two' },
            { character: '三', translation: 'three' },
            { character: '四', translation: 'four' },
            { character: '五', translation: 'five' },
            { character: '六', translation: 'six' },
            { character: '七', translation: 'seven' },
            { character: '八', translation: 'eight' },
            { character: '九', translation: 'nine' },
            { character: '十', translation: 'ten' },
        ];
    }
    ngOnInit() { }
    //TODO: open the modal as well as send the modal data, #183, Maryam Mohamad Al Mahdi
    presentModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _graph_modal_graph_modal_page__WEBPACK_IMPORTED_MODULE_2__.GraphModalPage,
                componentProps: {
                    scores: this.myScores,
                    letter: this.letter,
                    alphabetType: this.alphabetType
                }
            });
            yield modal.present();
        });
    }
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterContentInit() {
        this.setAlphabet(this.letter, this.alphabetType);
    }
    // TODO: dynamically set the progress percentage, #69, Maryam Mohamad Al Mahdi
    setStyleCalc() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.styles = { 'stroke-dashoffset': 'calc(440 - (440 *' + this.percent + ') / 100)' };
        return this.styles;
    }
    // TODO: dynamically set the letter, #69, Maryam Mohamad Al Mahdi
    setAlphabet(letter, alphabetType) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        let element = this.hiraganaAlphabet.find((obj) => obj.translation === letter);
        if (alphabetType === 'hiragana') {
            //no change
        }
        if (alphabetType === 'katakana') {
            element = this.katakanaAlphabet.find((obj) => obj.translation === letter);
        }
        if (alphabetType === 'kanji') {
            element = this.kanjiAlphabet.find((obj) => obj.translation === letter);
        }
        if (element !== undefined) {
            this.japaneseLetter = element.character;
            this.translation = element.translation;
        }
        else {
            this.japaneseLetter = 'あ';
            this.translation = 'A';
        }
    }
};
ProgressBlockComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController }
];
ProgressBlockComponent.propDecorators = {
    percent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    letter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    alphabetType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    myScores: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
ProgressBlockComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-progress-block',
        template: _progress_block_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_progress_block_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProgressBlockComponent);



/***/ }),

/***/ 21525:
/*!****************************************************************************!*\
  !*** ./src/app/progress/progress-result/progress-result-routing.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressResultPageRoutingModule": () => (/* binding */ ProgressResultPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _progress_result_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress-result.page */ 56301);




const routes = [
    {
        path: '',
        component: _progress_result_page__WEBPACK_IMPORTED_MODULE_0__.ProgressResultPage
    }
];
let ProgressResultPageRoutingModule = class ProgressResultPageRoutingModule {
};
ProgressResultPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProgressResultPageRoutingModule);



/***/ }),

/***/ 8982:
/*!********************************************************************!*\
  !*** ./src/app/progress/progress-result/progress-result.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressResultPageModule": () => (/* binding */ ProgressResultPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _progress_result_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress-result-routing.module */ 21525);
/* harmony import */ var src_app_shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/components/logout/logout.module */ 98192);
/* harmony import */ var _progress_result_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progress-result.page */ 56301);
/* harmony import */ var _progress_block_progress_block_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../progress-block/progress-block.component */ 62000);
/* harmony import */ var src_app_shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/components/navbar/navbar.module */ 37643);










let ProgressResultPageModule = class ProgressResultPageModule {
};
ProgressResultPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            _progress_result_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProgressResultPageRoutingModule,
            src_app_shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_1__.LogoutModule, src_app_shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__.NavbarModule
        ],
        declarations: [_progress_result_page__WEBPACK_IMPORTED_MODULE_2__.ProgressResultPage, _progress_block_progress_block_component__WEBPACK_IMPORTED_MODULE_3__.ProgressBlockComponent]
    })
], ProgressResultPageModule);



/***/ }),

/***/ 56301:
/*!******************************************************************!*\
  !*** ./src/app/progress/progress-result/progress-result.page.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressResultPage": () => (/* binding */ ProgressResultPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _progress_result_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress-result.page.html?ngResource */ 98943);
/* harmony import */ var _progress_result_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progress-result.page.scss?ngResource */ 86562);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 52816);





let ProgressResultPage = class ProgressResultPage {
    constructor(router, route) {
        this.router = router;
        this.route = route;
        this.progressHiragana = new Map();
        this.progressKatakana = new Map();
        this.progressKanji = new Map();
    }
    //TODO: get category from the url, that data is sent in from options in shared folder, #183, Maryam Mohamad Al Mahdi
    ngOnInit() {
        this.category = this.route.snapshot.queryParamMap.get('category');
        this.heading = this.category;
        //testPurposes
        //also note the naming conventions are incorrect from the API so they need be changed
        this.writingStylesArray = [
            'hiragana', 'katakana', 'kanji'
        ];
        this.progressArray = [
            { writingStyle: 'hiragana', url: ' ', character: 'A', score: '25', uploadDate: '2022-07-19' },
            { writingStyle: 'hiragana', url: ' ', character: 'A', score: '50', uploadDate: '2022-07-20' },
            { writingStyle: 'hiragana', url: ' ', character: 'Ka', score: '72', uploadDate: '2022-07-22' },
            { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '11', uploadDate: '2022-08-10' },
            { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '22', uploadDate: '2022-08-12' },
            { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '40', uploadDate: '2022-08-13' },
            { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '67', uploadDate: '2022-08-14' },
            { writingStyle: 'hiragana', url: ' ', character: 'Ha', score: '84', uploadDate: '2022-08-15' },
            { writingStyle: 'kanji', url: ' ', character: 'two', score: '36', uploadDate: '2022-08-22' },
            { writingStyle: 'kanji', url: ' ', character: 'two', score: '80', uploadDate: '2022-08-23' },
            { writingStyle: 'kanji', url: ' ', character: 'one', score: '80', uploadDate: '2022-08-23' },
            { writingStyle: 'kanji', url: ' ', character: 'three', score: '80', uploadDate: '2022-08-23' },
            { writingStyle: 'katakana', url: ' ', character: 'A', score: '98', uploadDate: '2022-08-30' },
            { writingStyle: 'hiragana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30' },
            { writingStyle: 'katakana', url: ' ', character: 'A', score: '10', uploadDate: '2022-08-30' },
            { writingStyle: 'katakana', url: ' ', character: 'A', score: '88', uploadDate: '2022-09-15' },
            { writingStyle: 'katakana', url: ' ', character: 'A', score: '70', uploadDate: '2022-09-18' },
            { writingStyle: 'katakana', url: ' ', character: 'U', score: '60', uploadDate: '2022-09-18' },
        ];
        this.manipulateScores();
    }
    //TODO: calculating the averages from the score of the letters that were practised per writing style, #183, Maryam Mohamad Al Mahdi
    manipulateScores() {
        for (const result of this.progressArray) {
            let scores;
            let keyString = '';
            keyString += result.character + '_';
            keyString += result.writingStyle;
            if (this.progressHiragana.has(keyString) && keyString.includes('hiragana')) {
                const object = {
                    score: result.score,
                    date: result.uploadDate,
                };
                this.progressHiragana.get(keyString).push(object);
            }
            else if (keyString.includes('hiragana')) {
                const object = [{
                        score: result.score,
                        date: result.uploadDate,
                    }];
                this.progressHiragana.set(keyString, object);
            }
            else if (this.progressKatakana.has(keyString) && keyString.includes('katakana')) {
                const object = {
                    score: result.score,
                    date: result.uploadDate,
                };
                this.progressKatakana.get(keyString).push(object);
            }
            else if (keyString.includes('katakana')) {
                const object = [{
                        score: result.score,
                        date: result.uploadDate,
                    }];
                this.progressKatakana.set(keyString, object);
            }
            else if (this.progressKanji.has(keyString) && keyString.includes('kanji')) {
                const object = {
                    score: result.score,
                    date: result.uploadDate,
                };
                this.progressKanji.get(keyString).push(object);
            }
            else if (keyString.includes('kanji')) {
                const object = [{
                        score: result.score,
                        date: result.uploadDate,
                    }];
                this.progressKanji.set(keyString, object);
            }
        }
        this.setStyle();
    }
    //TODO: set the writing style based on the category variable, #183, Maryam Mohamad Al Mahdi
    setStyle() {
        if (this.category === 'Hiragana') {
            this.currentStyle = this.progressHiragana;
        }
        else if (this.category === 'Katakana') {
            this.currentStyle = this.progressKatakana;
        }
        else if (this.category === 'Kanji') {
            this.currentStyle = this.progressKanji;
        }
    }
    onLogout() {
        // this function logs the user out of the system
        localStorage.removeItem('id');
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        this.router.navigate(['/login']);
    }
    //TODO: get the singely typed character based on the string feed in, #183, Maryam Mohamad Al Mahdi
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
    //TODO: get the writing style, #183, Maryam Mohamad Al Mahdi
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
    //TODO: get get the percentage of progress, #183, Maryam Mohamad Al Mahdi
    getPercent(objArray) {
        let totalPercent = 0;
        for (const obj of objArray) {
            totalPercent += Number(obj.score);
        }
        return Math.round(totalPercent / objArray.length);
    }
    setHome() {
        this.router.navigate(['/home']);
    }
    setProgress() {
        this.router.navigate(['/progress']);
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
ProgressResultPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute }
];
ProgressResultPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-progress-result',
        template: _progress_result_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_progress_result_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProgressResultPage);



/***/ }),

/***/ 21333:
/*!**********************************************************************************!*\
  !*** ./src/app/progress/progress-block/progress-block.component.scss?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = "ion-card {\n  display: flex;\n  justify-content: center;\n  position: relative;\n  width: 220px;\n  height: 220px;\n  background: #ffffff;\n  border: 5px solid #960722;\n  border-radius: 5%;\n  text-align: center;\n  transition: all 0.2s ease-in-out;\n}\n\nion-card:hover {\n  transform: scale(1.1);\n  box-shadow: 15px 15px 15px -10px rgba(0, 0, 0, 0.4);\n}\n\n.box .percent {\n  position: relative;\n  width: 150px;\n  height: 150px;\n}\n\n.box .percent svg {\n  margin-top: 10px;\n  position: relative;\n  width: 150px;\n  height: 150px;\n  fill: #ffffff;\n}\n\n.box .percent svg circle {\n  width: 150px;\n  height: 150px;\n  stroke-width: 10;\n  stroke: #000;\n  transform: translate(5px, 5px);\n  stroke-dasharray: 440;\n  stroke-dashoffset: 440;\n  stroke-linecap: round;\n}\n\n.box .percent svg circle:nth-child(1) {\n  stroke-dashoffset: 0;\n  stroke: #c5c3c3;\n}\n\n.box .percent svg circle:nth-child(2) {\n  stroke: #960722;\n}\n\n.box .percent .outer {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.box .percent .outer h2 {\n  font-size: 48px;\n  display: inline;\n}\n\n.box .percent .outer span {\n  font-size: 24px;\n}\n\n.box .percent .inner {\n  position: absolute;\n}\n\n.box .percent .inner:nth-child(1) {\n  margin-bottom: 20px;\n}\n\n.box .percent .inner:nth-child(2) {\n  margin-top: 65px;\n}\n\n.box .text {\n  padding: 10px 0 0;\n  font-weight: 700;\n  letter-spacing: 1px;\n  font-size: small;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLWJsb2NrLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBRUEsa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUVBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7QUFERjs7QUFJQTtFQUNFLHFCQUFBO0VBQ0EsbURBQUE7QUFERjs7QUFJQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7QUFERjs7QUFJQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7QUFERjs7QUFJQTtFQUNFLG9CQUFBO0VBQ0EsZUFBQTtBQURGOztBQUlBO0VBRUUsZUFBQTtBQUZGOztBQUtBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFGRjs7QUFLQTtFQUNFLGVBQUE7RUFDQSxlQUFBO0FBRkY7O0FBT0E7RUFDRSxlQUFBO0FBSkY7O0FBT0E7RUFDRSxrQkFBQTtBQUpGOztBQU9BO0VBQ0UsbUJBQUE7QUFKRjs7QUFPQTtFQUNFLGdCQUFBO0FBSkY7O0FBTUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQUhGIiwiZmlsZSI6InByb2dyZXNzLWJsb2NrLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNhcmR7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAvL2FsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDIyMHB4O1xuICBoZWlnaHQ6IDIyMHB4O1xuICAvL2ZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm9yZGVyOiA1cHggc29saWQgIzk2MDcyMjtcbiAgYm9yZGVyLXJhZGl1czogNSU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLWluLW91dDtcbn1cblxuaW9uLWNhcmQ6aG92ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gIGJveC1zaGFkb3c6IDE1cHggMTVweCAxNXB4IC0xMHB4IHJnYmEoMCwgMCwgMCwgMC40KTtcbn1cblxuLmJveCAucGVyY2VudHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTUwcHg7XG4gIGhlaWdodDogMTUwcHg7XG59XG5cbi5ib3ggLnBlcmNlbnQgc3Zne1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxNTBweDtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgZmlsbDogI2ZmZmZmZjtcbn1cblxuLmJveCAucGVyY2VudCBzdmcgY2lyY2xle1xuICB3aWR0aDogMTUwcHg7XG4gIGhlaWdodDogMTUwcHg7XG4gIHN0cm9rZS13aWR0aDogMTA7XG4gIHN0cm9rZTogIzAwMDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNXB4LCA1cHgpO1xuICBzdHJva2UtZGFzaGFycmF5OiA0NDA7XG4gIHN0cm9rZS1kYXNob2Zmc2V0OiA0NDA7XG4gIHN0cm9rZS1saW5lY2FwOiByb3VuZDtcbn1cblxuLmJveCAucGVyY2VudCBzdmcgY2lyY2xlOm50aC1jaGlsZCgxKXtcbiAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7XG4gIHN0cm9rZTogcmdiKDE5NywgMTk1LCAxOTUpO1xufVxuXG4uYm94IC5wZXJjZW50IHN2ZyBjaXJjbGU6bnRoLWNoaWxkKDIpe1xuICAvLyBzdHJva2UtZGFzaG9mZnNldDogY2FsYyg0NDAgLSAoNDQwICogODcpIC8gMTAwKTtcbiAgc3Ryb2tlOiAjOTYwNzIyO1xufVxuXG4uYm94IC5wZXJjZW50IC5vdXRlcntcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYm94IC5wZXJjZW50IC5vdXRlciBoMntcbiAgZm9udC1zaXplOiA0OHB4O1xuICBkaXNwbGF5OiBpbmxpbmU7XG59XG5cblxuXG4uYm94IC5wZXJjZW50IC5vdXRlciBzcGFue1xuICBmb250LXNpemU6IDI0cHg7XG59XG5cbi5ib3ggLnBlcmNlbnQgLmlubmVye1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5ib3ggLnBlcmNlbnQgLmlubmVyOm50aC1jaGlsZCgxKXtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmJveCAucGVyY2VudCAuaW5uZXI6bnRoLWNoaWxkKDIpe1xuICBtYXJnaW4tdG9wOiA2NXB4O1xufVxuLmJveCAudGV4dHtcbiAgcGFkZGluZzogMTBweCAwIDA7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG59XG4iXX0= */";

/***/ }),

/***/ 86562:
/*!*******************************************************************************!*\
  !*** ./src/app/progress/progress-result/progress-result.page.scss?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = ".container {\n  display: flex;\n  align-items: center;\n}\n\nh1 {\n  padding: 20px;\n}\n\nion-img {\n  position: absolute;\n  left: 5px;\n  top: 5px;\n  width: 100px;\n  height: 100px;\n  margin-top: -10px;\n}\n\n.head {\n  background-color: #960722;\n  width: 100%;\n  height: 40%;\n  margin-top: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: white;\n  margin-bottom: 30px;\n}\n\n.head strong {\n  font-size: 200%;\n}\n\n.head span {\n  font-size: 100%;\n}\n\n.my-grid {\n  height: 100% !important;\n}\n\n.parent-row {\n  height: 100% !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLXJlc3VsdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBSUE7RUFDRSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBREY7O0FBR0E7RUFDRSxlQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0FBQUY7O0FBR0E7RUFDRSx1QkFBQTtBQUFGOztBQUVBO0VBQ0UsdUJBQUE7RUFDQSw4QkFBQTtFQUNBLGtDQUFBO0FBQ0YiLCJmaWxlIjoicHJvZ3Jlc3MtcmVzdWx0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5oMXtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuaW9uLWltZ3tcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1cHg7XG4gIHRvcDogNXB4O1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMTAwcHg7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG5cblxuLmhlYWR7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5NjA3MjI7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDQwJTtcbiAgbWFyZ2luLXRvcDogMTAwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cbi5oZWFkIHN0cm9uZ3tcbiAgZm9udC1zaXplOiAyMDAlO1xufVxuXG4uaGVhZCBzcGFue1xuICBmb250LXNpemU6IDEwMCU7XG59XG5cbi5teS1ncmlkIHtcbiAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG59XG4ucGFyZW50LXJvdyB7XG4gIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xuICBhbGlnbi1pdGVtczogY2VudGVyICFpbXBvcnRhbnQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyICFpbXBvcnRhbnQ7XG59XG5cbiJdfQ== */";

/***/ }),

/***/ 18652:
/*!**********************************************************************************!*\
  !*** ./src/app/progress/progress-block/progress-block.component.html?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = "<ion-card (click)=\"presentModal()\">\n  <div class=\"box\">\n    <div class=\"percent\">\n      <svg>\n        <circle cx=\"70\" cy=\"70\" r=\"70\"></circle>\n        <circle cx=\"70\" cy=\"70\" r=\"70\" [ngStyle]=\"setStyleCalc()\"></circle>\n      </svg>\n      <div class=\"outer\">\n        <div class=\"inner\">\n          <h2>{{japaneseLetter}}</h2>\n        </div>\n        <div class=\"inner\">\n          <span>{{translation}}</span>\n        </div>\n      </div>\n    </div>\n    <h2 class=\"text\">Accuracy: {{percent}}%</h2>\n  </div>\n</ion-card>\n\n\n";

/***/ }),

/***/ 98943:
/*!*******************************************************************************!*\
  !*** ./src/app/progress/progress-result/progress-result.page.html?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <div class=\"head\" >\n    <ion-img src=\"assets/images/JWE-logos_black.png\"></ion-img>\n    <app-logout></app-logout>\n\n    <p>\n      <strong>Progress</strong><br>\n      <em>Track your progress below for {{heading}}</em><br>\n    </p>\n  </div>\n\n  <div>\n    <ion-grid class=\"my-grid\">\n      <ion-row class=\"parent-row\">\n        <ion-col *ngFor=\"let item of (currentStyle) | keyvalue\" size=\"col-auto\">\n          <app-progress-block [alphabetType]=\"getStyle(item.key)\"  [letter]='getLetter(item.key)' [percent]='getPercent(item.value)' [myScores]='item.value'></app-progress-block>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n\n<app-navbar *ngIf=\"!ifGuest()\"></app-navbar>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_progress_progress-result_progress-result_module_ts.js.map