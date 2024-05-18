import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanySearchResultsComponent } from './company-search-results.component';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HighlightMatchesPipe } from '../../../../pipes/highlight-matches.pipe';
import { AddressPipe } from '../../../../pipes/address.pipe';
import { CompanySearchBarComponent } from '../company-search-bar/company-search-bar.component';
import { CompanySearchComponent } from '../company-search/company-search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { provideToastr } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { setSelectedPage } from '../../+store/company-search.actions';

describe('CompanySearchResultsComponent', () => {
  let component: CompanySearchResultsComponent;
  let fixture: ComponentFixture<CompanySearchResultsComponent>;
  let store: MockStore;
  let router: Router;

  const mockVm = {
    allResults: {
      pageNumber: 1,
      kind: 'search#companies',
      totalResults: 20,
      items: [
        {
          companyStatus: 'dissolved',
          addressSnippet: '7 Argyle Place, Edinburgh, Midlothian, EH9 1JU',
          dateOfCreation: '2010-03-02',
          matches: { title: [1, 3] },
          description: 'SC373997 - Dissolved on 30 March 2012',
          links: { self: '/company/SC373997' },
          companyNumber: 'SC373997',
          title: 'BOO LIMITED',
          companyType: 'ltd',
          address: {
            premises: '7 ',
            postalCode: 'EH9 1JU',
            locality: 'Edinburgh',
            region: 'Midlothian',
            addressLine1: 'Argyle Place',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['dissolved-on'],
          dateOfCessation: '2012-03-30',
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Dashwood House, 69 Old Broad Street, London, England, EC2M 1QS',
          dateOfCreation: '2021-03-11',
          matches: { title: [1, 3] },
          description: '13259956 - Incorporated on 11 March 2021',
          links: { self: '/company/13259956' },
          companyNumber: '13259956',
          title: 'BOO A LA MODE LIMITED',
          companyType: 'ltd',
          address: {
            premises: 'Dashwood House',
            postalCode: 'EC2M 1QS',
            country: 'England',
            locality: 'London',
            addressLine1: '69 Old Broad Street',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            '1 The Crossways, Wembley Park, Middlesex, United Kingdom, HA9 9LB',
          dateOfCreation: '2019-09-25',
          matches: { title: [1, 3] },
          description: '12226115 - Incorporated on 25 September 2019',
          links: { self: '/company/12226115' },
          companyNumber: '12226115',
          title: 'BOO & BIMBA LTD',
          companyType: 'ltd',
          address: {
            premises: '1',
            postalCode: 'HA9 9LB',
            country: 'United Kingdom',
            locality: 'Wembley Park',
            region: 'Middlesex',
            addressLine1: 'The Crossways',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Unit 14 The Foot Centre, Unit 14, Pondworld Retail Park, Lynn Road, Wisbech, England, PE14 7DB',
          dateOfCreation: '2017-11-17',
          matches: { title: [1, 3] },
          description: '11070528 - Incorporated on 17 November 2017',
          links: { self: '/company/11070528' },
          companyNumber: '11070528',
          title: 'BOO & HARVEY LTD',
          companyType: 'ltd',
          address: {
            premises: 'Unit 14',
            postalCode: 'PE14 7DB',
            country: 'England',
            locality: 'Wisbech',
            addressLine1: 'The Foot Centre, Unit 14, Pondworld Retail Park',
            addressLine2: 'Lynn Road',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            '21 Navigation Business Village Navigation Way, Ashton-On-Ribble, Preston, England, PR2 2YP',
          dateOfCreation: '2021-09-29',
          matches: { title: [1, 3] },
          description: '13650673 - Incorporated on 29 September 2021',
          links: { self: '/company/13650673' },
          companyNumber: '13650673',
          title: 'BOO & HIPPS LIMITED',
          companyType: 'ltd',
          address: {
            premises: '21',
            postalCode: 'PR2 2YP',
            country: 'England',
            locality: 'Preston',
            addressLine1: 'Navigation Business Village Navigation Way',
            addressLine2: 'Ashton-On-Ribble',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'dissolved',
          addressSnippet: '106 Kenwyn Street, Truro, England, TR1 3BX',
          dateOfCreation: '2020-10-09',
          matches: { title: [1, 3] },
          description: '12942051 - Dissolved on 27 June 2023',
          links: { self: '/company/12942051' },
          companyNumber: '12942051',
          title: 'BOO & LIVI LTD',
          companyType: 'ltd',
          address: {
            premises: '106',
            postalCode: 'TR1 3BX',
            country: 'England',
            locality: 'Truro',
            addressLine1: 'Kenwyn Street',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['dissolved-on'],
          dateOfCessation: '2023-06-27',
        },
        {
          companyStatus: 'active',
          addressSnippet: '23 St. Johns Road, Richmond, England, TW9 2PE',
          dateOfCreation: '2022-05-12',
          matches: { snippet: [1, 3], title: [1, 3] },
          snippet: 'BOO & MOO ',
          description: '14102205 - Incorporated on 12 May 2022',
          links: { self: '/company/14102205' },
          companyNumber: '14102205',
          title: 'BOO & MOO JOOCE LTD',
          companyType: 'ltd',
          address: {
            premises: '23',
            postalCode: 'TW9 2PE',
            country: 'England',
            locality: 'Richmond',
            addressLine1: 'St. Johns Road',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            '48 Valerian Close, Chatham, Kent, United Kingdom, ME5 0PR',
          dateOfCreation: '2023-10-05',
          matches: { title: [1, 3] },
          description: '15191054 - Incorporated on 5 October 2023',
          links: { self: '/company/15191054' },
          companyNumber: '15191054',
          title: 'BOO AND THE BEAR LTD',
          companyType: 'ltd',
          address: {
            premises: '48',
            postalCode: 'ME5 0PR',
            country: 'United Kingdom',
            locality: 'Chatham',
            region: 'Kent',
            addressLine1: 'Valerian Close',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Boo Avenue, 1 Carriers Fold, Wolverhampton, England, WV5 9DH',
          dateOfCreation: '2023-06-19',
          matches: { title: [1, 3] },
          description: '14944266 - Incorporated on 19 June 2023',
          links: { self: '/company/14944266' },
          companyNumber: '14944266',
          title: 'BOO AVENUE LIMITED',
          companyType: 'ltd',
          address: {
            premises: 'Boo Avenue',
            postalCode: 'WV5 9DH',
            country: 'England',
            locality: 'Wolverhampton',
            addressLine1: '1 Carriers Fold',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'dissolved',
          addressSnippet:
            '20 Lowfield Road, Caversham, Reading, England, RG4 6PA',
          dateOfCreation: '2021-09-06',
          matches: { title: [1, 3] },
          description: '13604163 - Dissolved on 19 December 2023',
          links: { self: '/company/13604163' },
          companyNumber: '13604163',
          title: 'BOO BACK OFFICE OPS LTD',
          companyType: 'ltd',
          address: {
            premises: '20',
            postalCode: 'RG4 6PA',
            country: 'England',
            locality: 'Reading',
            addressLine1: 'Lowfield Road',
            addressLine2: 'Caversham',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['dissolved-on'],
          dateOfCessation: '2023-12-19',
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Glebe Farm Rectory Lane, Nailstone, Nuneaton, Warwickshire, England, CV13 0QQ',
          dateOfCreation: '2024-04-14',
          matches: { title: [1, 3] },
          description: '15644619 - Incorporated on 14 April 2024',
          links: { self: '/company/15644619' },
          companyNumber: '15644619',
          title: 'BOO BADGER LIMITED',
          companyType: 'ltd',
          address: {
            premises: 'Glebe Farm Rectory Lane',
            postalCode: 'CV13 0QQ',
            country: 'England',
            locality: 'Nuneaton',
            region: 'Warwickshire',
            addressLine1: 'Nailstone',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet: '64 Kyle Street, Ayr, Scotland, KA7 1RZ',
          dateOfCreation: '2016-05-11',
          matches: { title: [1, 3] },
          description: 'SC535110 - Incorporated on 11 May 2016',
          links: { self: '/company/SC535110' },
          companyNumber: 'SC535110',
          title: 'BOO BAH LTD.',
          companyType: 'ltd',
          address: {
            premises: '64',
            postalCode: 'KA7 1RZ',
            country: 'Scotland',
            locality: 'Ayr',
            addressLine1: 'Kyle Street',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'dissolved',
          addressSnippet:
            'Lawrence House 5, St Andrews Hill, Norwich, Norfolk, NR2 1AD',
          dateOfCreation: '2016-07-20',
          matches: { title: [1, 3] },
          description: '10287610 - Dissolved on 21 September 2023',
          links: { self: '/company/10287610' },
          companyNumber: '10287610',
          title: 'BOO BAIRD LTD',
          companyType: 'ltd',
          address: {
            premises: 'Lawrence House 5',
            postalCode: 'NR2 1AD',
            locality: 'Norwich',
            region: 'Norfolk',
            addressLine1: 'St Andrews Hill',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['dissolved-on'],
          dateOfCessation: '2023-09-21',
        },
        {
          companyStatus: 'dissolved',
          addressSnippet:
            '47 Waterford Park, Westfield, Radstock, England, BA3 3TS',
          dateOfCreation: '2022-07-15',
          matches: { title: [1, 3] },
          description: '14236019 - Dissolved on 24 October 2023',
          links: { self: '/company/14236019' },
          companyNumber: '14236019',
          title: 'BOO BAZAAR LTD',
          companyType: 'ltd',
          address: {
            premises: '47',
            postalCode: 'BA3 3TS',
            country: 'England',
            locality: 'Radstock',
            addressLine1: 'Waterford Park',
            addressLine2: 'Westfield',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['dissolved-on'],
          dateOfCessation: '2023-10-24',
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Marine House, 151 Western Road, Haywards Heath, England, RH16 3LH',
          dateOfCreation: '2003-01-08',
          matches: { title: [1, 3] },
          description: '04631576 - Incorporated on 8 January 2003',
          links: { self: '/company/04631576' },
          companyNumber: '04631576',
          title: 'BOO BLG LIMITED',
          companyType: 'ltd',
          address: {
            premises: 'Marine House',
            postalCode: 'RH16 3LH',
            country: 'England',
            locality: 'Haywards Heath',
            addressLine1: '151 Western Road',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            '1a Knowland Drive, Milford On Sea, Lymington, England, SO41 0RH',
          dateOfCreation: '2006-10-12',
          matches: { title: [1, 3, 5, 7] },
          description: '05964467 - Incorporated on 12 October 2006',
          links: { self: '/company/05964467' },
          companyNumber: '05964467',
          title: 'BOO BOO LIMITED',
          companyType: 'ltd',
          address: {
            premises: '1a',
            postalCode: 'SO41 0RH',
            country: 'England',
            locality: 'Lymington',
            addressLine1: 'Knowland Drive',
            addressLine2: 'Milford On Sea',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            '266-268 Stratford Road, Shirley, Solihull, England, B90 3AD',
          dateOfCreation: '2020-01-31',
          matches: { title: [1, 3, 5, 7] },
          description: '12435683 - Incorporated on 31 January 2020',
          links: { self: '/company/12435683' },
          companyNumber: '12435683',
          title: 'BOO BOO BARS LIMITED',
          companyType: 'ltd',
          address: {
            premises: '266-268',
            postalCode: 'B90 3AD',
            country: 'England',
            locality: 'Solihull',
            addressLine1: 'Stratford Road',
            addressLine2: 'Shirley',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Flat 8 Mayflower Court, Emerald Quay, Shoreham-By-Sea, England, BN43 5JJ',
          dateOfCreation: '2023-05-25',
          matches: { title: [1, 3, 5, 7] },
          description: '14894421 - Incorporated on 25 May 2023',
          links: { self: '/company/14894421' },
          companyNumber: '14894421',
          title: 'BOO BOO BEAR CATERING LTD',
          companyType: 'ltd',
          address: {
            premises: 'Flat 8',
            postalCode: 'BN43 5JJ',
            country: 'England',
            locality: 'Shoreham-By-Sea',
            addressLine1: 'Mayflower Court',
            addressLine2: 'Emerald Quay',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Take Me, Rutland Lodge, Ashby Road, Loughborough, Leicestershire, England, LE11 3TR',
          dateOfCreation: '2022-02-08',
          matches: { title: [1, 3, 5, 7] },
          description: '13900069 - Incorporated on 8 February 2022',
          links: { self: '/company/13900069' },
          companyNumber: '13900069',
          title: 'BOO BOO HUNTER LTD',
          companyType: 'ltd',
          address: {
            premises: 'Take Me, Rutland Lodge',
            postalCode: 'LE11 3TR',
            country: 'England',
            locality: 'Loughborough',
            region: 'Leicestershire',
            addressLine1: 'Ashby Road',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
        {
          companyStatus: 'active',
          addressSnippet:
            'Brookwood House, 84 Brookwood Road, London, United Kingdom, SW18 5BY',
          dateOfCreation: '2018-10-11',
          matches: { title: [1, 3, 5, 7] },
          description: '11616725 - Incorporated on 11 October 2018',
          links: { self: '/company/11616725' },
          companyNumber: '11616725',
          title: 'BOO BOO LONDON LTD',
          companyType: 'ltd',
          address: {
            premises: 'Brookwood House',
            postalCode: 'SW18 5BY',
            country: 'United Kingdom',
            locality: 'London',
            addressLine1: '84 Brookwood Road',
          },
          kind: 'searchresults#company',
          descriptionIdentifier: ['incorporated-on'],
        },
      ],
    },
    pagedResults: [
      {
        companyStatus: 'dissolved',
        addressSnippet: '7 Argyle Place, Edinburgh, Midlothian, EH9 1JU',
        dateOfCreation: '2010-03-02',
        matches: { title: [1, 3] },
        description: 'SC373997 - Dissolved on 30 March 2012',
        links: { self: '/company/SC373997' },
        companyNumber: 'SC373997',
        title: 'BOO LIMITED',
        companyType: 'ltd',
        address: {
          premises: '7 ',
          postalCode: 'EH9 1JU',
          locality: 'Edinburgh',
          region: 'Midlothian',
          addressLine1: 'Argyle Place',
        },
        kind: 'searchresults#company',
        descriptionIdentifier: ['dissolved-on'],
        dateOfCessation: '2012-03-30',
      },
      {
        companyStatus: 'active',
        addressSnippet:
          'Dashwood House, 69 Old Broad Street, London, England, EC2M 1QS',
        dateOfCreation: '2021-03-11',
        matches: { title: [1, 3] },
        description: '13259956 - Incorporated on 11 March 2021',
        links: { self: '/company/13259956' },
        companyNumber: '13259956',
        title: 'BOO A LA MODE LIMITED',
        companyType: 'ltd',
        address: {
          premises: 'Dashwood House',
          postalCode: 'EC2M 1QS',
          country: 'England',
          locality: 'London',
          addressLine1: '69 Old Broad Street',
        },
        kind: 'searchresults#company',
        descriptionIdentifier: ['incorporated-on'],
      },
      {
        companyStatus: 'active',
        addressSnippet:
          '1 The Crossways, Wembley Park, Middlesex, United Kingdom, HA9 9LB',
        dateOfCreation: '2019-09-25',
        matches: { title: [1, 3] },
        description: '12226115 - Incorporated on 25 September 2019',
        links: { self: '/company/12226115' },
        companyNumber: '12226115',
        title: 'BOO & BIMBA LTD',
        companyType: 'ltd',
        address: {
          premises: '1',
          postalCode: 'HA9 9LB',
          country: 'United Kingdom',
          locality: 'Wembley Park',
          region: 'Middlesex',
          addressLine1: 'The Crossways',
        },
        kind: 'searchresults#company',
        descriptionIdentifier: ['incorporated-on'],
      },
      {
        companyStatus: 'active',
        addressSnippet:
          'Unit 14 The Foot Centre, Unit 14, Pondworld Retail Park, Lynn Road, Wisbech, England, PE14 7DB',
        dateOfCreation: '2017-11-17',
        matches: { title: [1, 3] },
        description: '11070528 - Incorporated on 17 November 2017',
        links: { self: '/company/11070528' },
        companyNumber: '11070528',
        title: 'BOO & HARVEY LTD',
        companyType: 'ltd',
        address: {
          premises: 'Unit 14',
          postalCode: 'PE14 7DB',
          country: 'England',
          locality: 'Wisbech',
          addressLine1: 'The Foot Centre, Unit 14, Pondworld Retail Park',
          addressLine2: 'Lynn Road',
        },
        kind: 'searchresults#company',
        descriptionIdentifier: ['incorporated-on'],
      },
      {
        companyStatus: 'active',
        addressSnippet:
          '21 Navigation Business Village Navigation Way, Ashton-On-Ribble, Preston, England, PR2 2YP',
        dateOfCreation: '2021-09-29',
        matches: { title: [1, 3] },
        description: '13650673 - Incorporated on 29 September 2021',
        links: { self: '/company/13650673' },
        companyNumber: '13650673',
        title: 'BOO & HIPPS LIMITED',
        companyType: 'ltd',
        address: {
          premises: '21',
          postalCode: 'PR2 2YP',
          country: 'England',
          locality: 'Preston',
          addressLine1: 'Navigation Business Village Navigation Way',
          addressLine2: 'Ashton-On-Ribble',
        },
        kind: 'searchresults#company',
        descriptionIdentifier: ['incorporated-on'],
      },
    ],
    page: 1,
    itemsPerPage: 5,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        HighlightMatchesPipe,
        AddressPipe,
        CompanySearchBarComponent,
        CompanySearchComponent,
        PushPipe,
        NoopAnimationsModule,
      ],
      providers: [
        provideToastr(),
        provideMockStore(),
        {
          provide: Router,
          useValue: {
            navigateByUrl: vi.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ q: 'test' }),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CompanySearchResultsComponent);
    component = fixture.componentInstance;
    component.vm$ = of(mockVm);
    window.scrollTo = () => vi.fn();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render paginator', () => {
    const paginator = fixture.debugElement.query(
      By.css('mat-paginator'),
    ).nativeElement;
    expect(paginator).toBeTruthy();
  });

  test('should dispatch setSelectedPage action on page change', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const paginator = fixture.debugElement.query(
      By.directive(MatPaginator),
    ).componentInstance;

    paginator.page.emit({
      pageIndex: 1,
      previousPageIndex: 0,
      pageSize: 5,
      length: 10,
    });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      setSelectedPage({ page: 2, itemsPerPage: 5 }),
    );
  });

  test('should navigate to company details on title click', () => {
    const navigateSpy = vi.spyOn(router, 'navigateByUrl');
    const firstResultTitle = fixture.debugElement.queryAll(
      By.css('.company-title'),
    )[0].nativeElement;

    firstResultTitle.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith('/companies/SC373997');
  });

  test('should scroll to top on page change', () => {
    const scrollSpy = vi.spyOn(component.viewportScroller, 'scrollToPosition');
    const paginator = fixture.debugElement.query(
      By.directive(MatPaginator),
    ).componentInstance;

    paginator.page.emit({
      pageIndex: 1,
      previousPageIndex: 0,
      pageSize: 5,
      length: 10,
    });
    fixture.detectChanges();

    expect(scrollSpy).toHaveBeenCalledWith([0, 0]);
  });
});
