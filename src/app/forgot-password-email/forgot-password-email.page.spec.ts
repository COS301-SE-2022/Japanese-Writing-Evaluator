import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ForgotPasswordEmailPage } from './forgot-password-email.page';

describe('ForgotPasswordEmailPage', () => {
  let component: ForgotPasswordEmailPage;
  let fixture: ComponentFixture<ForgotPasswordEmailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordEmailPage ],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
