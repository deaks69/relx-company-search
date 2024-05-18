import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { convertToCamelInterceptor } from './convert-to-camel.interceptor';
import { beforeEach, describe, expect, test } from 'vitest';

describe('convertToCamelInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptors([convertToCamelInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should convert snake_case to camelCase in request body', () => {
    const requestBody = {
      snake_case: 'value',
      nested_key: { another_key: 'another_value' },
    };
    const expectedRequestBody = {
      snakeCase: 'value',
      nestedKey: { anotherKey: 'another_value' },
    };

    httpClient.post('/test', requestBody).subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.body).toEqual(expectedRequestBody);
    req.flush({});
  });

  test('should convert snake_case to camelCase in response body', () => {
    const responseBody = {
      snake_case: 'value',
      nested_key: { another_key: 'another_value' },
    };
    const expectedResponseBody = {
      snakeCase: 'value',
      nestedKey: { anotherKey: 'another_value' },
    };

    httpClient.post('/test', {}).subscribe((response) => {
      expect(response).toEqual(expectedResponseBody);
    });

    const req = httpMock.expectOne('/test');
    req.flush(responseBody);
  });

  test('should handle arrays and nested objects', () => {
    const requestBody = {
      array: [{ snake_case: 'value' }, { nested_key: 'value' }],
    };
    const expectedRequestBody = {
      array: [{ snakeCase: 'value' }, { nestedKey: 'value' }],
    };

    const responseBody = {
      array: [{ snake_case: 'value' }, { nested_key: 'value' }],
    };
    const expectedResponseBody = {
      array: [{ snakeCase: 'value' }, { nestedKey: 'value' }],
    };

    httpClient.post('/test', requestBody).subscribe((response) => {
      expect(response).toEqual(expectedResponseBody);
    });

    const req = httpMock.expectOne('/test');
    expect(req.request.body).toEqual(expectedRequestBody);
    req.flush(responseBody);
  });

  test('should not modify request body if it is not an object', () => {
    const requestBody = 'string_body';

    httpClient.post('/test', requestBody).subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.body).toEqual(requestBody);
    req.flush({});
  });
});
