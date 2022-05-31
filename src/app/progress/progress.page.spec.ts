import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressPage } from './progress.page';

describe('ProgressPage', () => {
  let component: ProgressPage;
  let fixture: ComponentFixture<ProgressPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPage ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Check values are set by uploadingImage', () => {
    const spySubscribable = spyOn(component, 'setValue');
    component.setValue();
    expect(spySubscribable).toHaveBeenCalled();
  });
});
