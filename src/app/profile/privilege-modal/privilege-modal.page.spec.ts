import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { PrivilegeModalPage } from './privilege-modal.page';

describe('PrivilegeModalPage', () => {
  let component: PrivilegeModalPage;
  let fixture: ComponentFixture<PrivilegeModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegeModalPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivilegeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test close', () => {
    spyOn(component.modalController, 'dismiss');
    component.close();
    expect(component.modalController.dismiss).toHaveBeenCalled();
  });
  it('test updatePrivileges', () => {
    component.selectedRole = undefined;
    spyOn(component.modalController, 'dismiss');
    component.updatePrivileges();
    expect(component.modalController.dismiss).toHaveBeenCalled();
  });
});
