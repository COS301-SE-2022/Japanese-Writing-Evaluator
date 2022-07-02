import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed,  tick,  waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { ProgressPage } from '../progress/progress.page';
import { BlockTryCharComponent } from './block-try-char/block-try-char.component';
import { HomePage } from './home.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let timeout;

  beforeEach(waitForAsync((done) => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    TestBed.configureTestingModule({
      declarations: [ HomePage, BlockTryCharComponent],
      imports: [IonicModule.forRoot(),RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule],
        providers: [ProgressPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const data = {};
    const testLocalStorage = {
      getItem: (key: string): string=> key in data ? data[key] : null,
      setItem: (key: string, val: string) => data[key] = val,
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(testLocalStorage .getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(testLocalStorage .setItem);

    localStorage.setItem('id','guest');
  }));

  it('check guest id is set to guest',() =>{
    if (!localStorage.getItem('token')) {
      expect(localStorage.getItem('id')).toEqual('guest');
    }
    else{
      expect(localStorage.getItem('id')).not.toEqual('guest');
    }
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Correct variable assignment based on dropdown select, Hiragana',fakeAsync(() => {
    // eslint-disable-next-line max-len
    const select = fixture.debugElement.query(By.css('ion-select-option'));
    spyOn(component, 'writingStyle').and.callThrough();
    select.nativeElement.value = 'Hiragana';
    dispatchEvent(new Event('ionChange'));

    fixture.detectChanges();
    tick();

    expect(component.vowelOne).toBe('あ');
    expect(component.translateOne).toBe('A');
    expect(component.vowelTwo).toBe('い');
    expect(component.translateTwo).toBe('I');
    expect(component.vowelThree).toBe('う');
    expect(component.translateThree).toBe('U');
    expect(component.vowelFour).toBe('え');
    expect(component.translateFour).toBe('E');
  }));

});

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let timeout;

  beforeEach(waitForAsync((done) => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    TestBed.configureTestingModule({
      declarations: [ HomePage, BlockTryCharComponent],
      imports: [IonicModule.forRoot(),RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule],
        providers: [ProgressPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    it('Correct variable assignment based on dropdown select, Katakana',fakeAsync(() => {
      // eslint-disable-next-line max-len
      const select = fixture.debugElement.query(By.css('ion-select-option'));
      spyOn(component, 'writingStyle').and.callThrough();
      select.nativeElement.value = 'Katakana';
      dispatchEvent(new Event('ionChange'));

      fixture.detectChanges();
      tick();

      expect(component.vowelOne).toBe('ア');
      expect(component.translateOne).toBe('A');
      expect(component.vowelTwo).toBe('イ');
      expect(component.translateTwo).toBe('I');
      expect(component.vowelThree).toBe('ウ');
      expect(component.translateThree).toBe('U');
      expect(component.vowelFour).toBe('エ');
      expect(component.translateFour).toBe('E');
    }));

  }));
});


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let timeout;

  beforeEach(waitForAsync((done) => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    TestBed.configureTestingModule({
      declarations: [ HomePage, BlockTryCharComponent],
      imports: [IonicModule.forRoot(),RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule],
        providers: [ProgressPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    it('Correct variable assignment based on dropdown select, Kanji',fakeAsync(() => {
      // eslint-disable-next-line max-len
      const select = fixture.debugElement.query(By.css('ion-select-option'));
      spyOn(component, 'writingStyle').and.callThrough();
      select.nativeElement.value = 'Kanji';
      dispatchEvent(new Event('ionChange'));

      fixture.detectChanges();
      tick();

      expect(component.vowelOne).toBe('黒');
      expect(component.translateOne).toBe('black');
      expect(component.vowelTwo).toBe('青');
      expect(component.translateTwo).toBe('blue');
      expect(component.vowelThree).toBe('緑');
      expect(component.translateThree).toBe('green');
      expect(component.vowelFour).toBe('橙');
      expect(component.translateFour).toBe('orange');
    }));

  }));
});
