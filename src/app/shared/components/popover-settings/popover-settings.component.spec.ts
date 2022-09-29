import { ToastComponent } from '../toast/toast.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { PopoverSettingsComponent } from './popover-settings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PopoverSettingsComponent', () => {
  let component: PopoverSettingsComponent;
  let fixture: ComponentFixture<PopoverSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverSettingsComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule,HttpClientTestingModule],
      providers: [ ToastComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test popoverOption delete profile', () => {
    const item = 'delete profile';
    fixture.detectChanges();
    spyOn(component, 'deleteProfile');
    component.popoverOption(item);
    expect(component.deleteProfile).toHaveBeenCalled();

  });
  it('test popoverOption logout', () => {
    localStorage.setItem('id', '12345');
    localStorage.setItem('token', 'user');

    const item = 'logout';
    spyOn(component, 'logout');
    component.popoverOption(item);
    expect(component.logout).toHaveBeenCalled();
  });
  it('test logout', () => {
    localStorage.setItem('id', '12345');
    localStorage.setItem('token', 'user');

    spyOn(localStorage, 'removeItem');
    spyOn(component.router, 'navigate');
    spyOn(component, 'close');

    component.logout();

    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalled();
    expect(component.close).toHaveBeenCalled();
  });
  it('test deleteProfile', () => {
    spyOn(component.router, 'navigate');
    spyOn(component, 'close');
    spyOn(component.toast, 'showToast');

    component.deleteProfile();

    expect(component.router.navigate).toHaveBeenCalled();
    expect(component.close).toHaveBeenCalled();
    expect(component.toast.showToast).toHaveBeenCalled();
  });
  it('test close', () => {
    spyOn(component.popOverCtrl, 'dismiss');
    component.deleteProfile();
    expect(component.popOverCtrl.dismiss).toHaveBeenCalled();
  });
});
