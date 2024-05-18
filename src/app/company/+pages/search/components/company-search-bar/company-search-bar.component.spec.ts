import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanySearchBarComponent } from './company-search-bar.component';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { search } from '../../+store/company-search.actions';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CompanySearchBarComponent', () => {
  let component: CompanySearchBarComponent;
  let fixture: ComponentFixture<CompanySearchBarComponent>;
  let store: MockStore;
  let toastrService: ToastrService;
  const initialState = { companySearch: { results: null } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        CompanySearchBarComponent,
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

    fixture = TestBed.createComponent(CompanySearchBarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should display search input field', () => {
    const inputElement = fixture.debugElement.query(
      By.css('input[matInput]'),
    ).nativeElement;
    expect(inputElement).toBeTruthy();
  });

  test('should display search button', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('button[mat-icon-button]'),
    ).nativeElement;
    expect(buttonElement).toBeTruthy();
  });

  test('should dispatch search action on enter key press', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const inputElement = fixture.debugElement.query(
      By.css('input[matInput]'),
    ).nativeElement;
    inputElement.value = 'test company';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    expect(dispatchSpy).toHaveBeenCalledWith(
      search({ search: 'test company' }),
    );
  });

  test('should display error message if search term is empty', () => {
    const toastrSpy = vi.spyOn(toastrService, 'error');
    const buttonElement = fixture.debugElement.query(
      By.css('button[mat-icon-button]'),
    ).nativeElement;
    buttonElement.click();
    expect(toastrSpy).toHaveBeenCalledWith('Please enter a search term');
  });
});

//   test('should clear search input after searching', () => {
//     const dispatchSpy = vi.spyOn(store, 'dispatch');
//     const inputElement = fixture.debugElement.query(
//       By.css('input[matInput]'),
//     ).nativeElement;
//     inputElement.value = 'test company';
//     inputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();
//
//     const buttonElement = fixture.debugElement.query(
//       By.css('button[mat-icon-button]'),
//     ).nativeElement;
//     buttonElement.click();
//     expect(dispatchSpy).toHaveBeenCalledWith(
//       search({ search: 'test company' }),
//     );
//     expect(component.search.value).toBe('');
//   });
// });
