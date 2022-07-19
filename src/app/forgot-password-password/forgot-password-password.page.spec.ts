import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ForgotPasswordPasswordPage } from './forgot-password-password.page';

describe('ForgotPasswordPasswordPage', () => {
  let component: ForgotPasswordPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPasswordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPasswordPage ],
      imports: [IonicModule.forRoot(),FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
