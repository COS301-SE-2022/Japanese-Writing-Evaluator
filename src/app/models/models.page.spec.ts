import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ModelsPage } from './models.page';
import { AppServiceService } from '../services/appService/app-service.service';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ModelsArray } from 'src/app/shared/interfaces/models';


describe('ModelsPage', () => {
  let component: ModelsPage;
  let fixture: ComponentFixture<ModelsPage>;

  //creating a fake app service variable
  const currentDate = new Date();
  const data = {
                  hiragana: {
                  characterRecognition: [
                    {
                      accuracy: '98',
                      date: currentDate,
                      loss: '20',
                      version: 'beta'
                    }
                  ],
                  strokes: [
                    {
                      accuracy: '89',
                      date: currentDate,
                      loss: '43',
                      version: 'beta model'
                    }
                  ]
                  },

                  kanji: {
                      characterRecognition: [
                        {
                          accuracy: '97',
                          date: currentDate,
                          loss: '15',
                          version: 'beta'
                        }
                      ],
                      strokes: [
                        {
                          accuracy: '78',
                          date: currentDate,
                          loss: '5',
                          version: 'beta'
                        }
                      ]
                  },

                  katakana: {
                      characterRecognition: [
                        {
                          accuracy: '96',
                          date: currentDate,
                          loss: '13',
                          version: 'beta'
                        }
                      ],
                      strokes: [
                        {
                          accuracy: '89',
                          date: currentDate,
                          loss: '17',
                          version: 'beta'
                        }
                      ]
                  },
              };
  const mockHeader = new HttpHeaders();
  mockHeader.set('content-type', 'application/json');
  const mockHttpResponse = {
    body: {
      data
    },
    type: 2,
    headers: mockHeader,
    status: 200,
    statusText: 'OK',
    url: 'https/localhost:5000/upload',
    ok: true,
    clone: null,
  };
  let fakeAppService: Pick<AppServiceService, 'adminModelData'>;

  beforeEach(waitForAsync(() => {
    //Instantiate fake app service
    //jasmine.createSpyObj<Pick<AppServiceService, 'adminModelData'>>('AppServiceService',
    fakeAppService = {
        adminModelData: (): Observable<HttpResponse<ModelsArray>> => of(mockHttpResponse),
    };

    TestBed.configureTestingModule({
      declarations: [ ModelsPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule,HttpClientTestingModule],
      providers: [{provide: AppServiceService, useValue: fakeAppService}]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //test if the bar graph is actually created
  it('created bar graph', () => {
    component.ngOnInit();
    expect(component.characterModel).not.toBeNull();
  });
});
