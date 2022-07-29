import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AppServiceService } from './app-service.service';
import { UploadedImage } from '../shared/interfaces/image';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Score } from '../shared/interfaces/score';

describe('AppServiceService', () => {
  let service: AppServiceService;
  let mockhttpRequest: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppServiceService],
      imports: [HttpClientTestingModule],//, HttpTestingController
    });
    service = TestBed.inject(AppServiceService);
    mockhttpRequest = TestBed.inject(HttpTestingController);
  });

  it('check for invalid image', inject(
    [HttpTestingController, AppServiceService],
    () => {
      let mockScore = new HttpResponse<Score>();
      const mockHeader = new HttpHeaders();
      mockHeader.set('content-type', 'application/json');
      mockScore = {
        body: {
          data:{
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
        expect(data.body.data.score).toBeUndefined();
      });

      const mockuploadrequest = mockhttpRequest.expectOne(service.baseURL+'upload');
      expect(mockuploadrequest.request.method).toEqual('POST');
      expect(mockuploadrequest.request.body).toEqual(mockimage);
      mockuploadrequest.flush(mockScore);
    })
    );

  //   it('check for valid image', inject(
  //     [HttpTestingController, AppServiceService],
  //     () => {
  //       let mockScore = new HttpResponse<Score>();//
  //       const mockHeader = new HttpHeaders();
  //       mockHeader.set('content-type', 'application/json');
  //       mockScore = {
  //         body: {
  //           data:{
  //             stroke1: 0,
  //             stroke2: 0,
  //             stroke3: 0,
  //             score: null,
  //           }
  //         },
  //         type: 2,
  //         headers: mockHeader,
  //         status: 200,
  //         statusText: 'OK',
  //         url: 'https/localhost:5000/upload',
  //         ok: true,
  //         clone: null,
  //       };
  //       let mockimage = new Object() as UploadedImage;
  //       mockimage = {
  //         id: '82',
            //eslint-disable-next-line max-len
  //         image: 'data:image/jpeg;base64,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',
  //         imagechar: 'a',
  //         file: 'a.png',
  //         style: 'hiragana',
  //       };

  //       service.uploadImage(mockimage).subscribe(data => {
  //         console.log(data.body);
  //         expect(data.body).toBeDefined();
  //       });

  //       const mockuploadrequest = mockhttpRequest.expectOne(service.baseURL+'upload');
  //       expect(mockuploadrequest.request.method).toEqual('POST');
  //       expect(mockuploadrequest.request.body).toEqual(mockimage);
  //       mockuploadrequest.flush(mockScore);
  //     })
  //     );

  //   afterEach(() => {
  //     mockhttpRequest.verify();
  //   });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
