import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ForgotPasswordPasswordPage } from './forgot-password-password.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForgotPasswordPasswordPage', () => {
  let component: ForgotPasswordPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPasswordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPasswordPage ],
      imports: [IonicModule.forRoot(),FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
