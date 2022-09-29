import { inject, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AppServiceService } from './app-service.service';
import { UploadedImage } from '../../shared/interfaces/image';
import { HttpHeaders } from '@angular/common/http';

describe('AppServiceService', () => {
  let service: AppServiceService;
  let mockhttpRequest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppServiceService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AppServiceService);
    mockhttpRequest = TestBed.inject(HttpTestingController);


  });
  it('check for invalid image', inject(
    [HttpTestingController, AppServiceService],
    () => {
      //let mockScore = new HttpResponse<Score>();
      const mockHeader = new HttpHeaders();
      mockHeader.set('content-type', 'application/json');
      const mockScore = {
        body: {
          data: {
            stroke1: 0,
            stroke2: 0,
            stroke3: 0,
            score: null,
          }
        },
        type: 2,
        headers: mockHeader,
        status: 200,
        statusText: 'OK',
        url: 'https/localhost:5000/upload',
        ok: true,
        clone: null,
      };
      let mockimage = new Object() as UploadedImage;
      mockimage = {
        id: '82',
        image: '',
        imagechar: 'U',
        file: 'u.png',
        style: 'hiragana',
      };
      service.uploadImage(mockimage).subscribe(data => {
        //expect(data.body.data.score).toBeNull();

        //expect(data.body.data.score).toBeNull();
        //expect(data).toEqual(mockScore.);
        //console.log('HEREE ' + data.body.data);
        //expect(mockScore.body.data.score).toBeNull();
      });

      const mockuploadrequest = mockhttpRequest.expectOne(service.baseURL+'upload');
      expect(mockuploadrequest.request.method).toEqual('POST');
      expect(mockuploadrequest.request.body).toEqual(mockimage);

      mockuploadrequest.flush(mockScore);

    }));

    afterEach(() => {
      mockhttpRequest.verify();
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
