import { Score } from './../shared/interfaces/score';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ProgressBlockComponent } from './progress-block/progress-block.component';
import { ProgressPage } from './progress.page';
import { AppServiceService } from './../services/appService/app-service.service';
import { environment as env } from 'src/environments/environment';

describe('ProgressPage', () => {
  let component: ProgressPage;
  let fixture: ComponentFixture<ProgressPage>;
  let service: AppServiceService;

  beforeEach(waitForAsync(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    TestBed.configureTestingModule({
      declarations: [ ProgressPage, ProgressBlockComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule,
        HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressPage);
    component = fixture.componentInstance;
    service = TestBed.inject(AppServiceService);
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
  it('test ngOnInit', () => {
    component.progressArray = [];
    spyOn(service, 'setProgressHiragana');
    spyOn(service, 'setProgressKatakana');
    spyOn(service, 'setProgressKanji');
    component.manipulateScores();
    expect(service.setProgressHiragana).toHaveBeenCalled();
    expect(service.setProgressKatakana).toHaveBeenCalled();
    expect(service.setProgressKanji).toHaveBeenCalled();
  });
  it('test setHome()', () => {
    spyOn(component.router, 'navigate');
    component.setHome();
    expect(component.router.navigate).toHaveBeenCalled();
  });
  it('test getLetter()', () => {
    const letter = 'A_Hiragana';
    const gotLetter = component.getLetter(letter);
    expect(gotLetter).toBe('A');
  });
  it('test getStyle()', () => {
    let style = 'hiragana';
    let gotStyle = component.getStyle(style);
    expect(gotStyle).toBe('hiragana');

    style = 'katakana';
    fixture.detectChanges();
     gotStyle = component.getStyle(style);
    expect(gotStyle).toBe('katakana');

    style = 'kanji';
    fixture.detectChanges();
     gotStyle = component.getStyle(style);
    expect(gotStyle).toBe('kanji');
  });
  it('test getPercent()', () => {
    const obj = [
      {
          score: '83',
          date: '2022/10/08'
      },
      {
        score: '51',
        date: '2022/10/18'
    }
    ];

    const total = component.getPercent(obj);
    expect(total).toEqual(67);
  });
  it('test ifNormalNavbar()', () => {
    localStorage.setItem('id', 'guest');
    let value = component.ifNormalNavbar();
    expect(value).toBeFalse();

    localStorage.setItem('id', 'user');
    fixture.detectChanges();
    env.admin = true;
    value = component.ifNormalNavbar();
    expect(value).toBeFalse();
  });
});
