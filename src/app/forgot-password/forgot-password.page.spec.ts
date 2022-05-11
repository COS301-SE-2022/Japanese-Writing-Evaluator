import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {RouterTestingModule} from '@angular/router/testing';
// import { Router } from '@angular/router';
import { ForgotPasswordPage } from './forgot-password.page';
import { LoginPage } from '../login/login.page';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  // let router: Router;
  // let location: Location;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPage,
                      // LoginPage,
      ],
      imports: [IonicModule.forRoot(),RouterTestingModule]
    }).compileComponents();

    // router = TestBed.inject(Router);
    // location = TestBed.inject(Location);
    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // router.initialNavigation();
  }));

  // it('Navigation', fakeAsync(() => {
  //   const spy = spyOn(router,'navigate');
  //   component.forgotPasswordPage();
  //   expect(spy).toHaveBeenCalledWith(['/login']);
  // }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
