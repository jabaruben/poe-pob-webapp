import { TestBed } from '@angular/core/testing';

import { HeadersInterceptorService } from './headers-interceptor.service';

describe('HeadersInterceptorService', () => {
  let service: HeadersInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadersInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
