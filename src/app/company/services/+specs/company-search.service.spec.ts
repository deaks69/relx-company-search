import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { CompanySearchService } from '../company-search.service';
import { CompanySearch } from '../../models/company-search';

describe('CompanySearchService', () => {
  let service: CompanySearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanySearchService],
    });

    service = TestBed.inject(CompanySearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch company search results', () => {
    const mockQuery = 'testCompany';
    const mockResponse: CompanySearch = {
      pageNumber: 1,
      kind: 'search#companies',
      totalResults: 4,
      items: [
        {
          companyStatus: 'dissolved',
          addressSnippet: '9a Calne Avenue, Ilford, England, IG5 0XB',
          dateOfCreation: '2020-08-24',
          matches: {
            title: [1, 10],
          },
          description: '12833638 - Dissolved on 13 September 2022',
          links: {
            self: '/company/12833638',
          },
          companyNumber: '12833638',
          title: 'BANANARAMA LTD',
          companyType: 'ltd',
          address: {
            premises: '9a',
            postalCode: 'IG5 0XB',
            country: 'England',
            locality: 'Ilford',
            addressLine1: 'Calne Avenue',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['dissolved-on'],
          dateOfCessation: '2022-09-13',
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Old Shoyswell Manor Farm,, Sheepstreet Lane, Etchingham,, East Sussex., TN19 7AZ',
          dateOfCreation: '1989-05-03',
          matches: {
            snippet: [1, 10],
          },
          snippet: 'BANANARAMA ',
          description: '02379318 - Incorporated on  3 May 1989',
          links: {
            self: '/company/02379318',
          },
          companyNumber: '02379318',
          title: 'MILLENNIUM HOMES LIMITED',
          companyType: 'ltd',
          address: {
            premises: 'Old Shoyswell Manor Farm,',
            postalCode: 'TN19 7AZ',
            locality: 'Etchingham,',
            region: 'East Sussex.',
            addressLine1: 'Sheepstreet Lane',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'dissolved',
          addressSnippet: '72   Lairgate, Beverley, East Yorkshire, HU17 8EU',
          dateOfCreation: '2005-02-08',
          matches: {
            title: [1, 10],
          },
          description: '05357402 - Dissolved on  5 April 2011',
          links: {
            self: '/company/05357402',
          },
          companyNumber: '05357402',
          title: 'BANANARAMA (HULL) LIMITED',
          companyType: 'ltd',
          address: {
            premises: '72  ',
            postalCode: 'HU17 8EU',
            locality: 'East Yorkshire',
            addressLine1: 'Lairgate',
            addressLine2: 'Beverley',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['dissolved-on'],
          dateOfCessation: '2011-04-05',
        },
        {
          companyStatus: 'dissolved',
          addressSnippet:
            '25  Galleywood Road, Great Baddow, Chelmsford, Essex, England, CM2 8DH',
          dateOfCreation: '2017-06-13',
          matches: {
            title: [1, 13],
          },
          description: '10816776 - Dissolved on 20 August 2019',
          links: {
            self: '/company/10816776',
          },
          companyNumber: '10816776',
          title: 'BANANARAMAHUT LTD',
          companyType: 'ltd',
          address: {
            premises: '25 ',
            postalCode: 'CM2 8DH',
            country: 'England',
            locality: 'Chelmsford',
            region: 'Essex',
            addressLine1: 'Galleywood Road',
            addressLine2: 'Great Baddow',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['dissolved-on'],
          dateOfCessation: '2019-08-20',
        },
      ],
    };

    service.searchCompanies(mockQuery).subscribe((companySearch) => {
      expect(companySearch).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service['searchUrl']}?Query=${mockQuery}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  test('should handle empty response', () => {
    const mockQuery = 'unknownCompany';
    const mockResponse: CompanySearch = {
      pageNumber: 1,
      kind: 'search#companies',
      totalResults: 4,
      items: [],
    };

    service.searchCompanies(mockQuery).subscribe((companySearch) => {
      expect(companySearch).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service['searchUrl']}?Query=${mockQuery}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
