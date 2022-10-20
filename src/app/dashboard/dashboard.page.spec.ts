import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call lineChartMethod after frequencyOfVisits was called', () => {
    spyOn(component, 'lineChartMethod').and.callThrough();
    component.frequencyOfVisits();
    expect(component.lineChartMethod).toHaveBeenCalled();
  });
  it('should call lineChartMethod after averageHiragana was called', () => {
    spyOn(component, 'lineChartMethod').and.callThrough();
    component.averageHiragana();
    expect(component.lineChartMethod).toHaveBeenCalled();
  });
  it('should call lineChartMethod after averageKatakana was called', () => {
    spyOn(component, 'lineChartMethod').and.callThrough();
    component.averageKatakana();
    expect(component.lineChartMethod).toHaveBeenCalled();
  });
  it('should call lineChartMethod after averageKanji was called', () => {
    spyOn(component, 'lineChartMethod').and.callThrough();
    component.averageKanji();
    expect(component.lineChartMethod).toHaveBeenCalled();
  });
});
