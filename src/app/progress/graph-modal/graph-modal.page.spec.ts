import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { GraphModalPage } from './graph-modal.page';

describe('GraphModalPage', () => {
  let component: GraphModalPage;
  let fixture: ComponentFixture<GraphModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GraphModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< HEAD
=======
  it('should created right date format', () => {
    const date = component.fixDateForma('Tues, 26 August 2022  00:00:00 GMT');
    expect(date).toBe(' 26 August 2022 ');
  });
  it('should call lineChartMethod after ngAfterInit was called', () => {
      spyOn(component, 'lineChartMethod').and.callThrough();
      component.ngAfterViewInit();
      expect(component.lineChartMethod).toHaveBeenCalled();
  });
>>>>>>> develop
});
