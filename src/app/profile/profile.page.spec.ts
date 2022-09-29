import { AppServiceService } from './../services/appService/app-service.service';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfilePage } from './profile.page';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment as env } from 'src/environments/environment';
import { Person, UserRoles } from '../shared/interfaces/role';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let service: AppServiceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    service = TestBed.inject(AppServiceService);
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
  it('test getBoolOfRole ', () => {
    let role = 'admin';
    let call = component.getBoolOfRole(role);
    expect(call).toBeTrue();

    role = 'user';
    fixture.detectChanges();
    call = component.getBoolOfRole(role);
    expect(call).toBeFalse();

  });
  it('test ifNormalNavbar ', () => {
    localStorage.setItem('id', ' admin');
    env.admin = true;
    env.superAdmin = false;
    fixture.detectChanges();
    const call = component.ifNormalNavbar();
    expect(call).toBeFalse();
  });
  it('test isAdmin ', () => {
    let roleOne = new Object() as Person;
    let roleTwo = new Object() as Person;

    roleOne = {
      id: '123',
      username: 'Johnny',
      admin: true
    };
    let call = component.isAdmin(roleOne);
    expect(call).toBe('admin');

    roleTwo = {
      id: '123',
      username: 'Johnny',
      admin: false
    };

    call = component.isAdmin(roleTwo);
    expect(call).toBe('user');
  });
  it('should call getUsers and return list of users', fakeAsync(() => {
    const resp: Person[] = [];

    let response = new Object() as UserRoles;
    response = {
      response: resp
    };

    spyOn(service, 'getRoles').and.returnValue(of(new HttpResponse({status: 200, body: response})));
    component.ngOnInit();
    tick();
    expect(component.userRoles).toEqual(response.response);
  }));
});
