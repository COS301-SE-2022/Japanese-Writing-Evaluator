import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ProgressBlockComponent } from './progress-block/progress-block.component';

import { ProgressPage } from './progress.page';

describe('ProgressPage', () => {
  let component: ProgressPage;
  let fixture: ComponentFixture<ProgressPage>;

  beforeEach(waitForAsync(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    TestBed.configureTestingModule({
      declarations: [ ProgressPage, ProgressBlockComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule,
        HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title ', () => {
    const title = fixture.debugElement.query(By.css('strong')).nativeElement;
    expect(title.innerHTML).toBe('Progress');
  });

  it('should have the correct quote ', () => {
    const title = fixture.debugElement.query(By.css('em')).nativeElement;
    expect(title.innerHTML).toBe('\"You don\'t have to be extreme, just consistent\"');
  });
});
