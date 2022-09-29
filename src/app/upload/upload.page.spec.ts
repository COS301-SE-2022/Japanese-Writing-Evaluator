import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UrlSerializer } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { UploadPage } from './upload.page';

describe('UploadPage', () => {
  let component: UploadPage;
  let fixture: ComponentFixture<UploadPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule,RouterTestingModule]//, UrlSerializer
    }).compileComponents();

    fixture = TestBed.createComponent(UploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test ngOnInit', () => {
    spyOn(component.service, 'getTryImage');
    component.ngOnInit();
    expect(component.service.getTryImage).toHaveBeenCalled();
  });
});
