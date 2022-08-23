import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {  FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpPage } from './sign-up.page';
import { ToastModule } from '../shared/components/toast/toast.module';
import { ToastComponent } from '../shared/components/toast/toast.component';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpPage ],
      imports: [IonicModule.forRoot(),RouterTestingModule, FormsModule, HttpClientTestingModule, ToastModule ],
      providers:[ToastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
