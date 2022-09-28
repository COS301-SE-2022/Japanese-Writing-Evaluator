import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { OptionsComponent } from './options.component';
import { Router } from '@angular/router';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    component.category = 'hiragana';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('navigate to the home', fakeAsync(() =>{
    component.pageReq = 'home';
    fixture.detectChanges();
    console.log(component.pageReq);

    const router = fixture.debugElement.injector.get(Router);
    component.navigateAlphabet();
    tick();

    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).withContext('should nav to alphabet category hiragana').toBe('/home/alphabet-category?category='+ component.category);

    flush();
    fixture.detectChanges();

  }));
});


