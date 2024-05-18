import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectCompanyDirectorsLatest } from '../../+store/company-directors/company-directors.selectors';
import { ViewDirectorsComponent } from './view-directors.component';
import { CurrentDirectorsPipe } from '../../pipes/current-directors.pipe';
import { AddressPipe } from '../../../../pipes/address.pipe';
import { MonthPipe } from '../../pipes/month.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

describe('ViewDirectorsComponent', () => {
  let component: ViewDirectorsComponent;
  let fixture: ComponentFixture<ViewDirectorsComponent>;
  let store: MockStore;
  const initialState = { companyDirectors: { latest: null } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        PushPipe,
        CurrentDirectorsPipe,
        AddressPipe,
        MonthPipe,
        DatePipe,
        TitleCasePipe,
        ViewDirectorsComponent,
      ],
      providers: [provideMockStore({ initialState })],
    });

    fixture = TestBed.createComponent(ViewDirectorsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    store.overrideSelector(selectCompanyDirectorsLatest, {
      etag: '123',
      links: {
        self: '/company/123/directors',
      },
      itemsPerPage: 1,
      kind: 'search#directors',
      totalResults: 1,
      resignedCount: 1,
      items: [
        {
          name: 'John Doe',
          address: {
            premises: '123',
            addressLine1: 'Main St',
            locality: 'Anytown',
            postalCode: '12345',
            country: 'USA',
          },
          officerRole: 'Director',
          dateOfBirth: {
            month: 1,
            year: 1970,
          },
          appointedOn: '2020-01-01',
          resignedOn: undefined,
          nationality: 'American',
          countryOfResidence: 'USA',
          occupation: 'Engineer',
        },
      ],
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should display the correct number of officers and resignations', () => {
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.textContent).toContain('1 officer / 1 resignation');
  });

  test('should display the director name', () => {
    const directorName = fixture.debugElement.query(
      By.css('#director-name'),
    ).nativeElement;
    expect(directorName.textContent).toContain('John Doe');
  });

  test('should display the correct address', () => {
    const address = fixture.debugElement.query(
      By.css('#director-address'),
    ).nativeElement;
    expect(address.textContent).toContain('123, Main St, Anytown, 12345, USA');
  });

  test('should display the correct date of birth', () => {
    const dob = fixture.debugElement.query(By.css('#dob')).nativeElement;
    expect(dob.textContent).toContain('January 1970');
  });

  test('should display the correct appointment date', () => {
    const appointedOn = fixture.debugElement.query(
      By.css('#appointed'),
    ).nativeElement;
    expect(appointedOn.textContent).toContain('01 January, 2020');
  });

  test('should display the correct nationality', () => {
    const nationality = fixture.debugElement.query(
      By.css('#nationality'),
    ).nativeElement;
    expect(nationality.textContent).toContain('American');
  });

  test('should display the correct country of residence', () => {
    const countryOfResidence = fixture.debugElement.query(
      By.css('#country'),
    ).nativeElement;
    expect(countryOfResidence.textContent).toContain('USA');
  });

  test('should display the correct occupation', () => {
    const occupation = fixture.debugElement.query(
      By.css('#occupation'),
    ).nativeElement;
    expect(occupation.textContent).toContain('Engineer');
  });
});
