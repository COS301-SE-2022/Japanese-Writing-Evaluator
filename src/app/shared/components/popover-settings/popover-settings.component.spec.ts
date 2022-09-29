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
});
