import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanySearchComponent } from './company-search.component';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CompanySearchBarComponent } from '../company-search-bar/company-search-bar.component';
import { provideToastr } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CompanySearchComponent', () => {
  let component: CompanySearchComponent;
  let fixture: ComponentFixture<CompanySearchComponent>;
  let store: MockStore;
  const initialState = { companySearch: { results: null } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        CompanySearchBarComponent,
        CompanySearchComponent,
        NoopAnimationsModule,
      ],
      providers: [
        provideToastr(),
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ q: 'test' }),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CompanySearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize query$ and subscribe on AfterViewInit', () => {
    const spy = vi.spyOn(component.query$, 'subscribe');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });

  test('should render the company search bar component', () => {
    const searchBar = fixture.debugElement.query(
      By.css('app-company-search-bar'),
    ).nativeElement;
    expect(searchBar).toBeTruthy();
  });
});
