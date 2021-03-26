import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpApiService } from './http-api.service';

describe('HttpApiService', () => {
  let service: HttpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]
    });
    service = TestBed.inject(HttpApiService);
  });

  it('should be created', () => {
    service.login({});
    expect(service).toBeTruthy();
  });
});
