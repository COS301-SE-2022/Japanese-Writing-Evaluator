import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverComponent ],

      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when app initiates list is set', () => {
    component.ngOnInit();
    expect(component.list).toEqual(['edit privileges']);
  });
  it('does popover modal is presented once popoverOption is called', () => {
    spyOn(component,'presentModal');
    component.popoverOption('edit privileges');
    expect(component.presentModal).toHaveBeenCalled();

  });
  it('presentModal creates modal', () => {
    spyOn(component.modalController, 'create');
    component.presentModal();
    expect(component.modalController.create).toHaveBeenCalled();
  });
  it('test close function', () => {
    component.selectedRole = undefined;
    spyOn(component.popOverCtrl, 'dismiss');
    component.close();
    expect(component.popOverCtrl.dismiss).toHaveBeenCalled();

    component.selectedRole = 'admin';
    fixture.detectChanges();
    component.close();
    expect(component.popOverCtrl.dismiss).toHaveBeenCalled();
  });

});
