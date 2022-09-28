import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
//import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;
  // const modalSpy = jasmine.createSpyObj('Modal', ['present']);
  // const modalCtrlSpy = jasmine.createSpyObj('PopoverController', ['create']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverComponent ],
      // providers: [
      //   {
      //     // provide: PopoverController,
      //     // useValue: modalCtrlSpy
      //   }
      // ],

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
});
