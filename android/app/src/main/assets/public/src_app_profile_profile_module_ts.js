"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_profile_profile_module_ts"],{

/***/ 16002:
/*!******************************************************!*\
  !*** ./src/app/profile/popover/popover.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopoverComponent": () => (/* binding */ PopoverComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _popover_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popover.component.html?ngResource */ 3225);
/* harmony import */ var _popover_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popover.component.scss?ngResource */ 27449);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _privilege_modal_privilege_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../privilege-modal/privilege-modal.page */ 14058);







let PopoverComponent = class PopoverComponent {
    constructor(modalController, popOverCtrl) {
        this.modalController = modalController;
        this.popOverCtrl = popOverCtrl;
        this.selectedRole = '';
    }
    ngOnInit() {
        //list of the popover options
        this.list = ['edit privileges'];
    }
    //TODO: Navigate to the appropriate page based on which popover function was selected, #203, Maryam
    popoverOption(item) {
        if (item === this.list[0]) {
            this.presentModal();
        }
    }
    //TODO: open the modal as well as send the modal data, #183, Maryam Mohamad Al Mahdi
    presentModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _privilege_modal_privilege_modal_page__WEBPACK_IMPORTED_MODULE_2__.PrivilegeModalPage,
                cssClass: 'my-modal-class',
                componentProps: {
                    role: this.role,
                }
            });
            yield modal.present();
            return modal.onDidDismiss().then((data) => {
                if (data) {
                    if (data.data !== undefined) {
                        this.selectedRole = data.data.data;
                        this.close();
                    }
                    else {
                        this.selectedRole = undefined;
                        this.close();
                    }
                }
            });
        });
    }
    //TODO: closes the popover, #183, Maryam Mohamad Al Mahdi
    close() {
        console.log(this.selectedRole + ' from popover');
        if (this.selectedRole !== undefined) {
            this.popOverCtrl.dismiss({ data: this.selectedRole });
        }
        else {
            this.popOverCtrl.dismiss();
        }
    }
};
PopoverComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.PopoverController }
];
PopoverComponent.propDecorators = {
    role: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
PopoverComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-popover',
        template: _popover_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_popover_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], PopoverComponent);



/***/ }),

/***/ 14058:
/*!*****************************************************************!*\
  !*** ./src/app/profile/privilege-modal/privilege-modal.page.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivilegeModalPage": () => (/* binding */ PrivilegeModalPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _privilege_modal_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./privilege-modal.page.html?ngResource */ 28544);
/* harmony import */ var _privilege_modal_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./privilege-modal.page.scss?ngResource */ 2083);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 93819);






let PrivilegeModalPage = class PrivilegeModalPage {
    constructor(modalController, router) {
        this.modalController = modalController;
        this.router = router;
    }
    ngOnInit() { }
    //TODO: closes the modal, #183, Maryam Mohamad Al Mahdi
    close() {
        this.modalController.dismiss();
    }
    //TODO: get event from change in radio group, #183, Maryam Mohamad Al Mahdi
    radioGroupChange($event) {
        this.selectedRole = $event.target.value;
    }
    //TODO: update the privileges of current user, #183, Maryam Mohamad Al Mahdi
    updatePrivileges() {
        console.log(this.selectedRole + ' from origin');
        if (this.selectedRole !== undefined) {
            this.modalController.dismiss({ data: this.selectedRole });
        }
        else {
            this.modalController.dismiss();
        }
    }
};
PrivilegeModalPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router }
];
PrivilegeModalPage.propDecorators = {
    role: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }]
};
PrivilegeModalPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-privilege-modal',
        template: _privilege_modal_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_privilege_modal_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], PrivilegeModalPage);



/***/ }),

/***/ 36620:
/*!******************************************************************!*\
  !*** ./src/app/profile/profile-block/profile-block.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileBlockComponent": () => (/* binding */ ProfileBlockComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_block_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-block.component.html?ngResource */ 70129);
/* harmony import */ var _profile_block_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-block.component.scss?ngResource */ 55766);
/* harmony import */ var _popover_popover_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../popover/popover.component */ 16002);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 93819);








let ProfileBlockComponent = class ProfileBlockComponent {
    constructor(popCtrl, cd) {
        this.popCtrl = popCtrl;
        this.cd = cd;
        this.changeRoleEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    }
    ngOnInit() { }
    //TODO: Sending to profile page the changed roles of the specific user/admin, #203, Maryam
    roleEvent() {
        this.changeRoleEvent.emit([this.selectedRole, this.name]);
    }
    //TODO: Opens the popover, #203, Maryam
    openPopover(ev) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const popover = yield this.popCtrl.create({
                component: _popover_popover_component__WEBPACK_IMPORTED_MODULE_2__.PopoverComponent,
                componentProps: { role: this.role },
                event: ev,
            });
            yield popover.present();
            return popover.onDidDismiss().then((data) => {
                if (data) {
                    if (data.data !== undefined) {
                        this.selectedRole = data.data.data;
                        console.log(this.selectedRole + ' from component');
                        this.roleEvent();
                    }
                    else {
                        this.selectedRole = undefined;
                        console.log(this.selectedRole + ' from component');
                        this.roleEvent();
                    }
                }
            });
        });
    }
};
ProfileBlockComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.PopoverController },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef }
];
ProfileBlockComponent.propDecorators = {
    changeRoleEvent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output }],
    name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }],
    role: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }]
};
ProfileBlockComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-profile-block',
        template: _profile_block_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_profile_block_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProfileBlockComponent);



/***/ }),

/***/ 86829:
/*!***************************************************!*\
  !*** ./src/app/profile/profile-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfilePageRoutingModule": () => (/* binding */ ProfilePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile.page */ 72919);




const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_0__.ProfilePage
    },
    {
        path: 'privilege-modal',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_profile_privilege-modal_privilege-modal_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./privilege-modal/privilege-modal.module */ 84000)).then(m => m.PrivilegeModalPageModule)
    }
];
let ProfilePageRoutingModule = class ProfilePageRoutingModule {
};
ProfilePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProfilePageRoutingModule);



/***/ }),

/***/ 84523:
/*!*******************************************!*\
  !*** ./src/app/profile/profile.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfilePageModule": () => (/* binding */ ProfilePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-routing.module */ 86829);
/* harmony import */ var _shared_components_admin_nav_bar_admin_nav_bar_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/components/admin-nav-bar/admin-nav-bar.module */ 68603);
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.page */ 72919);
/* harmony import */ var _profile_block_profile_block_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile-block/profile-block.component */ 36620);
/* harmony import */ var _popover_popover_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popover/popover.component */ 16002);
/* harmony import */ var _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/components/logout/logout.module */ 98192);











let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicModule,
            _profile_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProfilePageRoutingModule,
            _shared_components_admin_nav_bar_admin_nav_bar_module__WEBPACK_IMPORTED_MODULE_1__.AdminNavBarModule,
            _shared_components_logout_logout_module__WEBPACK_IMPORTED_MODULE_5__.LogoutModule
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_2__.ProfilePage, _profile_block_profile_block_component__WEBPACK_IMPORTED_MODULE_3__.ProfileBlockComponent, _popover_popover_component__WEBPACK_IMPORTED_MODULE_4__.PopoverComponent]
    })
], ProfilePageModule);



/***/ }),

/***/ 72919:
/*!*****************************************!*\
  !*** ./src/app/profile/profile.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfilePage": () => (/* binding */ ProfilePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _profile_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile.page.html?ngResource */ 8907);
/* harmony import */ var _profile_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.page.scss?ngResource */ 36611);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 52816);





let ProfilePage = class ProfilePage {
    constructor(router) {
        this.router = router;
        this.users = [
            { name: 'Maryam', role: 'admin' },
            { name: 'Sihle', role: 'admin' },
            { name: 'Phumu', role: 'admin' },
            { name: 'Raymond', role: 'user' },
            { name: 'Phil', role: 'user' },
        ];
        this.selectedView = 'admin';
    }
    ngOnInit() {
    }
    //TODO: View admins only, #203, Maryam
    getAdmins() {
        this.selectedView = 'admin';
    }
    //TODO: View users only, #203, Maryam
    getUsers() {
        this.selectedView = 'user';
    }
    //TODO: Sending to profile page the changed roles of the specific user/admin, #203, Maryam
    roleEvent(details) {
        console.log(details);
        if (details[0] !== undefined) {
            this.users.forEach(element => {
                if (element.name === details[1]) {
                    element.role = details[0];
                }
            });
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
};
ProfilePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router }
];
ProfilePage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-profile',
        template: _profile_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_profile_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProfilePage);



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

/***/ 27449:
/*!*******************************************************************!*\
  !*** ./src/app/profile/popover/popover.component.scss?ngResource ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "button {\n  background-color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvcG92ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1QkFBQTtBQUNGIiwiZmlsZSI6InBvcG92ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b257XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuIl19 */";

/***/ }),

/***/ 2083:
/*!******************************************************************************!*\
  !*** ./src/app/profile/privilege-modal/privilege-modal.page.scss?ngResource ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = ".popOver {\n  align-items: center;\n  align-content: center;\n  text-align: center;\n}\n\np {\n  margin-top: 25px;\n}\n\n.closeBtn {\n  position: absolute;\n  top: 0px;\n  right: 12px;\n  width: 20px;\n  height: 20px;\n}\n\n.change {\n  width: 100px;\n  height: 30px;\n  position: absolute;\n  top: 80%;\n  transform: translateX(50px);\n  right: 50%;\n  margin-top: 5px;\n  --background: #6576db;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZpbGVnZS1tb2RhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0FBQ0YiLCJmaWxlIjoicHJpdmlsZWdlLW1vZGFsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb3BPdmVye1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucHtcbiAgbWFyZ2luLXRvcDogMjVweDtcbn1cblxuLmNsb3NlQnRue1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMHB4O1xuICByaWdodDogMTJweDtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbn1cblxuLmNoYW5nZXtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA4MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MHB4KTtcbiAgcmlnaHQ6IDUwJTtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICAtLWJhY2tncm91bmQ6ICM2NTc2ZGI7XG59XG4iXX0= */";

/***/ }),

/***/ 55766:
/*!*******************************************************************************!*\
  !*** ./src/app/profile/profile-block/profile-block.component.scss?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = "ion-content {\n  position: relative;\n  height: 235px;\n  width: 235px;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.privilege {\n  color: white;\n  border-radius: 5px;\n}\n\na {\n  color: blue;\n  background-color: transparent;\n}\n\nion-avatar {\n  position: relative;\n  top: 40px;\n  margin: 0 auto;\n}\n\np {\n  position: relative;\n  margin: 0 auto;\n  top: 45px;\n}\n\ndiv {\n  border: 5px solid #960722;\n  height: 200px;\n  width: 200px;\n  border-radius: 25px;\n  padding: auto;\n}\n\nion-icon {\n  background-color: white;\n}\n\n#icon {\n  position: absolute;\n  background-color: white;\n  left: 170px;\n  top: 22px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUtYmxvY2suY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsNkJBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFNBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFDRjs7QUFFQTtFQUNFLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7QUFDRiIsImZpbGUiOiJwcm9maWxlLWJsb2NrLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnR7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiAyMzVweDtcbiAgd2lkdGg6IDIzNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucHJpdmlsZWdle1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuYSB7XG4gIGNvbG9yOiBibHVlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuaW9uLWF2YXRhcntcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG5we1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB0b3A6IDQ1cHg7XG59XG5cbmRpdntcbiAgYm9yZGVyOiA1cHggc29saWQgIzk2MDcyMjtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICBwYWRkaW5nOiBhdXRvO1xufVxuXG5pb24taWNvbntcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbiNpY29ue1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBsZWZ0OiAxNzBweDtcbiAgdG9wOiAyMnB4O1xufVxuIl19 */";

/***/ }),

/***/ 36611:
/*!******************************************************!*\
  !*** ./src/app/profile/profile.page.scss?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "ion-content {\n  font-family: \"sans-serif\", \"Helvetica\", \"Arial\", \"Verdana\", \"Tahoma\", Sans-serif;\n}\n\nion-img {\n  position: absolute;\n  left: 5px;\n  top: 5px;\n  width: 100px;\n  height: 100px;\n  margin-top: -10px;\n}\n\n.head {\n  background-color: #960722;\n  width: 100%;\n  height: 40%;\n  margin-top: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  color: white;\n  margin-bottom: 30px;\n}\n\n.head strong {\n  font-size: 200%;\n}\n\n.head span {\n  font-size: 100%;\n}\n\n.my-grid {\n  height: 100% !important;\n}\n\n.parent-row {\n  height: 100% !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n\n.topnav {\n  background-color: #333;\n  overflow: hidden;\n  display: flex;\n  justify-content: center;\n}\n\n.navCol {\n  font-size: 17px;\n  color: #f2f2f2;\n}\n\n.navCol:hover {\n  color: black;\n  background-color: #ddd;\n}\n\n.user {\n  display: flex;\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0ZBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBSUE7RUFDRSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBREY7O0FBR0E7RUFDRSxlQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0FBQUY7O0FBR0E7RUFDRSx1QkFBQTtBQUFGOztBQUVBO0VBQ0UsdUJBQUE7RUFDQSw4QkFBQTtFQUNBLGtDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUFDRiIsImZpbGUiOiJwcm9maWxlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcbiAgZm9udC1mYW1pbHk6ICdzYW5zLXNlcmlmJywgJ0hlbHZldGljYScsICdBcmlhbCcsICdWZXJkYW5hJywgJ1RhaG9tYScsIFNhbnMtc2VyaWY7XG59XG5cbmlvbi1pbWd7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNXB4O1xuICB0b3A6IDVweDtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBtYXJnaW4tdG9wOiAtMTBweDtcbn1cblxuXG5cbi5oZWFke1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTYwNzIyO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MCU7XG4gIG1hcmdpbi10b3A6IDEwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogd2hpdGU7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG59XG4uaGVhZCBzdHJvbmd7XG4gIGZvbnQtc2l6ZTogMjAwJTtcbn1cblxuLmhlYWQgc3BhbntcbiAgZm9udC1zaXplOiAxMDAlO1xufVxuXG4ubXktZ3JpZCB7XG4gIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xufVxuLnBhcmVudC1yb3cge1xuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlciAhaW1wb3J0YW50O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlciAhaW1wb3J0YW50O1xufVxuXG4udG9wbmF2IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXJcbn1cblxuLm5hdkNvbHtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBjb2xvcjogI2YyZjJmMjtcbn1cblxuLm5hdkNvbDpob3ZlciB7XG4gIGNvbG9yOiBibGFjaztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcbn1cblxuLnVzZXJ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyXG59XG4iXX0= */";

/***/ }),

/***/ 42131:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.scss?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "ion-button {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ291dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7QUFDRiIsImZpbGUiOiJsb2dvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tYnV0dG9ue1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1cHg7XG4gIHRvcDogNXB4O1xufVxuIl19 */";

/***/ }),

/***/ 3225:
/*!*******************************************************************!*\
  !*** ./src/app/profile/popover/popover.component.html?ngResource ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<ion-list>\n  <ion-item lines=\"none\" button *ngFor=\"let item of list\" (click)=\"popoverOption(item)\">\n      {{item}}\n  </ion-item>\n</ion-list>\n";

/***/ }),

/***/ 28544:
/*!******************************************************************************!*\
  !*** ./src/app/profile/privilege-modal/privilege-modal.page.html?ngResource ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"popOver\">\n\n    <p>Update the current user's permissions:</p>\n  <ion-list>\n    <ion-radio-group value={{role}} (ionChange)= \"radioGroupChange($event)\">\n      <ion-item>\n        <ion-label>admin</ion-label>\n        <ion-radio slot=\"start\" value=\"admin\"></ion-radio>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>user</ion-label>\n        <ion-radio slot=\"start\" value=\"user\"></ion-radio>\n      </ion-item>\n\n    </ion-radio-group>\n  </ion-list>\n</div>\n<ion-button class=\"change\" (click)=\"updatePrivileges()\">Save</ion-button>\n\n<ion-button color=\"primary\" (click)=\"close()\" class=\"closeBtn\">X</ion-button>\n\n";

/***/ }),

/***/ 70129:
/*!*******************************************************************************!*\
  !*** ./src/app/profile/profile-block/profile-block.component.html?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"ion-padding\">\n  <div>\n    <button ion-button (click)=\"openPopover($event)\" id=\"icon\">\n      <ion-icon name=\"ellipsis-horizontal-outline\"></ion-icon>\n    </button>\n    <ion-avatar>\n      <img src=\"assets/icon/user.png\" alt=\"Image of user profile\" />\n    </ion-avatar>\n\n    <p>\n      <strong>{{name}}</strong><br>\n    </p>\n  </div>\n</ion-content>\n\n\n\n";

/***/ }),

/***/ 8907:
/*!******************************************************!*\
  !*** ./src/app/profile/profile.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "<ion-content>\n  <div class=\"head\" >\n    <ion-img src=\"assets/images/JWE-logos_black.png\"></ion-img>\n    <app-logout></app-logout>\n\n    <p>\n      <strong>Profile</strong><br>\n      View profiles of users/admin below.\n    </p>\n  </div>\n\n  <div class=\"topnav\">\n    <ion-grid class=\"my-grid\">\n      <ion-row class=\"parent-row\">\n        <ion-col class=\"navCol\"><div class=\"user\" (click)=\"getAdmins()\">Admin</div></ion-col>\n        <ion-col class=\"navCol\"><div class=\"user\" (click)=\"getUsers()\">User</div></ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n\n  <div class>\n    <ion-grid class=\"my-grid\">\n      <ion-row class=\"parent-row\">\n      <ng-container *ngFor=\"let item of users\">\n        <ion-col *ngIf=\"item.role === selectedView\" size=\"col-auto\">\n            <app-profile-block (changeRoleEvent) ='roleEvent($event)'  [name]='item.name' [role]='item.role' ></app-profile-block>\n        </ion-col>\n      </ng-container>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n\n<app-admin-nav-bar></app-admin-nav-bar>\n";

/***/ }),

/***/ 62182:
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/logout/logout.component.html?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "<ion-button slot=\"end\" (click)=\"onLogout()\" color=\"dark\">Logout</ion-button>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_profile_profile_module_ts.js.map