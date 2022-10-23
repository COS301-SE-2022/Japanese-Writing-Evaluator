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
  it('should get the correct letter translation', () => {
    const letter = component.getLetter('Ka_Hiragana');
    expect(letter).toBe('Ka');
  });
  it('should get the correct writing style', () => {
    component.category = 'Hiragana';
    const style = component.getStyle();
    expect(style).toBe('hiragana');
  });
  it('should get the correct percentage', () => {
    const objArray = [
      {
        score: 88,
        date: '2022/09/22'
      },
      {
        score: 53,
        date: '2022/09/23'
      },
      {
        score: 38,
        date: '2022/09/22'
      }
    ];
    const percent = component.getPercent(objArray);
    const percentExpect = Math.round((88 + 53 +38) / 3);
    expect(percent).toEqual(percentExpect);

  });
});
