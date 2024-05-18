import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDetailsPageComponent } from './company-details-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { selectCompanyDetails } from './+store/company-details/company-details.selectors';
import {
  clearCompanyDetails,
  viewCompanyDetails,
} from './+store/company-details/company-details.actions';
import { getCompanyDirectors } from './+store/company-directors/company-directors.actions';
import { PushPipe } from '@ngrx/component';
import { CompanyDetailsHeaderComponent } from './components/company-details-header/company-details-header.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanySearchBarComponent } from '../search/components/company-search-bar/company-search-bar.component';
import { CompanySearchItem } from '../../models/company-search';
import { provideToastr } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CompanyDetailsPageComponent', () => {
  let component: CompanyDetailsPageComponent;
  let fixture: ComponentFixture<CompanyDetailsPageComponent>;
  let store: MockStore;
  let actions$ = of({});
  const initialState = { companyDetails: { selectedCompany: null } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PushPipe,
        CompanyDetailsHeaderComponent,
        CompanyDetailsComponent,
        CompanySearchBarComponent,
        CompanyDetailsPageComponent,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        provideToastr(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CompanyDetailsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    store.overrideSelector(selectCompanyDetails, {
      title: 'Test Company',
      companyNumber: '12345678',
      addressSnippet: '123 Main St, Anytown, USA',
      companyStatus: 'active',
      companyType: 'private limited company',
      dateOfCreation: '2000-01-01',
    } as unknown as CompanySearchItem);

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should dispatch viewCompanyDetails and getCompanyDirectors actions on init', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      viewCompanyDetails({ companyNumber: '123' }),
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      getCompanyDirectors({ companyNumber: '123' }),
    );
  });

  test('should dispatch clearCompanyDetails action on destroy', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.ngOnDestroy();
    expect(dispatchSpy).toHaveBeenCalledWith(clearCompanyDetails());
  });

  test('should render company details', () => {
    fixture.detectChanges();

    const title = fixture.debugElement.query(
      By.css('app-company-details-header'),
    ).nativeElement;
    const address = fixture.debugElement.query(
      By.css('app-company-details'),
    ).nativeElement;

    expect(title.textContent).toContain('Test Company');
    expect(address.textContent).toContain('123 Main St, Anytown, USA');
  });
});
