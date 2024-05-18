import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { ViewCompanyDetailsService } from '../view-company-details.service';
import { CompanySearchItem } from '../../models/company-search';

describe('ViewCompanyDetailsService', () => {
  let service: ViewCompanyDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewCompanyDetailsService],
    });

    service = TestBed.inject(ViewCompanyDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch company details', () => {
    const mockQuery = 'testCompany';
    const mockResponse = {
      items: [
        { name: 'Test Company', id: '1' } as unknown as CompanySearchItem,
      ],
    };

    service.viewCompanyDetails(mockQuery).subscribe((company) => {
      expect(company).toEqual(mockResponse.items[0]);
    });

    const req = httpMock.expectOne(
      `${service['searchUrl']}?Query=${mockQuery}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  test('should return undefined if no items are found', () => {
    const mockQuery = 'unknownCompany';
    const mockResponse = {
      items: [],
    };

    service.viewCompanyDetails(mockQuery).subscribe((company: any) => {
      expect(company).toBeUndefined();
    });

    const req = httpMock.expectOne(
      `${service['searchUrl']}?Query=${mockQuery}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
