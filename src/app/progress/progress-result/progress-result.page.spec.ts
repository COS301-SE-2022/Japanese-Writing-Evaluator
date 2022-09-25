import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ProgressResultPage } from './progress-result.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProgressResultPage', () => {
  let component: ProgressResultPage;
  let fixture: ComponentFixture<ProgressResultPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressResultPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
