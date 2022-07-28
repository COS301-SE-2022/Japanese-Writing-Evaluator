import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ProgressPage } from '../progress/progress.page';
import { BlockTryCharComponent } from './block-try-char/block-try-char.component';
import { OptionsComponent } from './options/options.component';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let timeout;

  beforeEach(waitForAsync((done) => {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    TestBed.configureTestingModule({
      declarations: [ HomePage, BlockTryCharComponent, OptionsComponent],
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

});
