import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if it suggests two different characters', () => {
    const img1 = fixture.debugElement.nativeElement.querySelector('#suggest1');
    const img1Source = img1.src;
    const img2 = fixture.debugElement.nativeElement.querySelector('#suggest2');
    const img2Source = img2.src;
    expect(img1Source).not.toEqual(img2Source);
  });
});
