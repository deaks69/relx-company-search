import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { DirectorSearchService } from '../director-search.service';
import { Director } from '../../models/director';

describe('DirectorSearchService', () => {
  let service: DirectorSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DirectorSearchService],
    });

    service = TestBed.inject(DirectorSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch directors', () => {
    const mockQuery = '12345';
    const mockResponse: Director = {
      etag: '9cf8df4ba00fb819d1ca206384b0a2c329b93ffa',
      links: {
        self: '/company/13789777/officers',
      },
      kind: 'officer-list',
      itemsPerPage: 35,
      items: [
        {
          address: {
            premises: '71-75',
            postalCode: 'WC2H 9JQ',
            country: 'United Kingdom',
            locality: 'London',
            addressLine1: 'Shelton Street',
            addressLine2: 'Covent Garden',
          },
          name: 'LIU, Guangyao',
          appointedOn: '2021-12-08',
          officerRole: 'director',
          dateOfBirth: {
            month: 10,
            year: 1977,
          },
          occupation: 'Manager',
          countryOfResidence: 'Hong Kong',
          nationality: 'Chinese',
        },
      ],
      activeCount: 1,
      totalResults: 1,
    };

    service.searchDirectors(mockQuery).subscribe((director) => {
      expect(director).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service['searchUrl']}?CompanyNumber=${mockQuery}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  test('should handle empty response', () => {
    const mockQuery = '67890';
    const mockResponse: Director = {} as Director; // Assuming an empty response returns an empty object

    service.searchDirectors(mockQuery).subscribe((director) => {
      expect(director).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service['searchUrl']}?CompanyNumber=${mockQuery}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
