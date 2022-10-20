import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ForgotPasswordPasswordPage } from './forgot-password-password.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastModule } from '../shared/components/toast/toast.module';
import { ToastComponent } from '../shared/components/toast/toast.component';

describe('ForgotPasswordPasswordPage', () => {
  let component: ForgotPasswordPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPasswordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPasswordPage, ToastComponent ],
      imports: [IonicModule.forRoot(),FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      providers:[ToastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('check guest user details',() =>{
    const forgotPasswordform = component.forgotpassword;
    const newPassword = '';
    expect(forgotPasswordform.controls.newPassword.value).toEqual(newPassword);
  });
});
