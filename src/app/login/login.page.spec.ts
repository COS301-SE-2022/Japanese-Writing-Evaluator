import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(),RouterTestingModule,
        ReactiveFormsModule,
        FormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('check guest user login details',() =>{
    const loginform = component.login;
    const username = '';
    expect(loginform.controls.username.value).toEqual(username);
  });

  //check what happens when guest function is called
  it('check guest user login function',() =>{
    component.onGuestLogin();
    expect(localStorage.getItem('id')).toEqual('guest');
  });

  //check if it router routes to home

  //check if form inputs are rendered
  it('check if form inputs are rendered',async () => {
    const htmlElements = fixture.debugElement.nativeElement;// gets html tags, like a query selector
    expect(htmlElements.querySelector('.input')).not.toBeNull();
  });

  //check if buttons are rendered
  it('check if form button is rendered',async () => {
    const htmlElements = fixture.debugElement.nativeElement;// gets html tags, like a query selector
    expect(htmlElements.querySelector('.ion-button')).not.toBeNull();
  });

  //check if error message shows when there is no input when login button is clicked

  //check if form builds?

  //test if form has submitted
  it('check if form has submitted when button is clicked is valid',async () => {
    const loginButton = fixture.debugElement.nativeElement.querySelector('.ion-button');// gets html tags, like a query selector
    loginButton.click();
    expect(component.login.valid).not.toBeTruthy();
  });

  it('check for valid form when submitted',async () => {
    component.login.controls.username.setValue('sechaba836@gmail.com');
    component.login.controls.password.setValue('admin');
    const loginButton = fixture.debugElement.nativeElement.querySelector('.ion-button');// gets html tags, like a query selector
    loginButton.click();
    expect(component.login.valid).toBeTruthy();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
