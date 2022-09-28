import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfilePage } from './profile.page';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set selectedView to admin', () => {
      component.getAdmins();
      expect(component.selectedView).toBe('admin');
  });
  it('should set selectedView to user', () => {
    component.getUsers();
    expect(component.selectedView).toBe('user');
  });
  it('should have the correct title ', () => {
    const title = fixture.debugElement.query(By.css('strong')).nativeElement;
    expect(title.innerHTML).toBe('Profile');
  });
});
