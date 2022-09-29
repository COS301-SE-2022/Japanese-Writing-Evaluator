import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {  FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpPage } from './sign-up.page';
import { ToastModule } from '../shared/components/toast/toast.module';
import { AppServiceService } from '../services/appService/app-service.service';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let service: AppServiceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpPage ],
      imports: [IonicModule.forRoot(),RouterTestingModule, FormsModule, HttpClientTestingModule, ToastModule ],
      providers:[ToastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    service = TestBed.inject(AppServiceService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
