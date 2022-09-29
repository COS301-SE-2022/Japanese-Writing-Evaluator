import { AppServiceService } from './../../services/appService/app-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { BlockTryCharComponent } from './block-try-char.component';
import { CharacterImage } from 'src/app/shared/interfaces/image';

describe('BlockTryCharComponent', () => {
  let component: BlockTryCharComponent;
  let fixture: ComponentFixture<BlockTryCharComponent>;
  let service: AppServiceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTryCharComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockTryCharComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AppServiceService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test showUploadPage', () => {
    spyOn(service, 'setTryImage');
    component.showUploadPage();
    expect(service.setTryImage).toHaveBeenCalled();

  });
});
