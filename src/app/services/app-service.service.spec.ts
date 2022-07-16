import { inject, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AppServiceService } from './app-service.service';
import { UploadedImage } from '../shared/interfaces/image';

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

  // it('check for invalid image', inject(
  //   [HttpTestingController, AppServiceService],
  //   () => {
  //     const mockScore = 0;
  //     let mockimage = new Object() as UploadedImage;
  //     mockimage = {
  //       id: '82',
  //       image: '',
  //       imagechar: 'U',
  //       file: 'u.png',
  //     };
  //     service.uploadImage(mockimage).subscribe(data => {
  //       expect(data).toEqual(mockScore);
  //     });

  //     const mockuploadrequest = mockhttpRequest.expectOne(service.baseURL+'/upload');
  //     expect(mockuploadrequest.request.method).toEqual('POST');
  //     expect(mockuploadrequest.request.body).toEqual(mockimage);
  //     mockuploadrequest.flush(mockScore);
  //   })
  //   );

  //   it('check for valid image', inject(
  //     [HttpTestingController, AppServiceService],
  //     () => {
  //       const mockScore = 0;
  //       let mockimage = new Object() as UploadedImage;
  //       mockimage = {
  //         id: '82',
  //         image: '',
  //         imagechar: 'U',
  //         file: 'u.png',
  //       };

  //       service.uploadImage(mockimage).subscribe(data => {
  //         expect(data.body.score).toBeDefined();
  //       });

  //       const mockuploadrequest = mockhttpRequest.expectOne(service.baseURL+'/upload');
  //       expect(mockuploadrequest.request.method).toEqual('POST');
  //       expect(mockuploadrequest.request.body).toEqual(mockimage);
  //       mockuploadrequest.flush(mockScore);
  //     })
  //     );

  //   afterEach(() => {
  //     mockhttpRequest.verify();
  //   });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
