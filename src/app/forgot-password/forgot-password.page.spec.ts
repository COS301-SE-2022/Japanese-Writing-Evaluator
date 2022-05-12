import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {RouterTestingModule} from '@angular/router/testing';
// import { Router } from '@angular/router';
import { ForgotPasswordPage } from './forgot-password.page';
import { LoginPage } from '../login/login.page';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  // let router: Router;
  // let location: Location;
  let fixture: ComponentFixture<ForgotPasswordPage>;
  const spy = jasmine.createSpyObj('Router',['navigate']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPage,
                      // LoginPage,
      ],
      imports: [IonicModule.forRoot(),RouterTestingModule, FormsModule],
      providers: [
        {
           provide: Router,
           useValue: spy
        }
      ],
    }).compileComponents();

    // router = TestBed.inject(Router);
    // location = TestBed.inject(Location);
    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // router.initialNavigation();
  }));

  it('Navigation', () => {
    component.forgotPasswordPage();
    const navigationArguments = spy.navigate.calls.first().args[0];
    expect(navigationArguments).toEqual(['/login']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
