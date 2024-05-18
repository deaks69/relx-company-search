import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDetailsComponent } from './company-details.component';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from 'vitest';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ViewDirectorsComponent } from '../directors/view-directors.component';
import { CompanySearchItem } from '../../../../models/company-search';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        DatePipe,
        TitleCasePipe,
        ViewDirectorsComponent,
        CompanyDetailsComponent,
        NoopAnimationsModule,
      ],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  test('should display company details in Overview tab', () => {
    component.company = {
      addressSnippet: '123 Main St, Anytown, USA',
      companyStatus: 'active',
      companyType: 'private limited company',
      dateOfCreation: new Date('2000-01-01'),
      dateOfCessation: null,
    } as unknown as CompanySearchItem;
    fixture.detectChanges();

    const address = fixture.debugElement.query(
      By.css('#address-snippet'),
    ).nativeElement;
    const status = fixture.debugElement.query(
      By.css('#company-status'),
    ).nativeElement;
    const type = fixture.debugElement.query(
      By.css('#company-type'),
    ).nativeElement;
    const dateOfCreation = fixture.debugElement.query(
      By.css('#date-of-creation'),
    ).nativeElement;

    expect(address.textContent).toContain('123 Main St, Anytown, USA');
    expect(status.textContent).toContain('Active');
    expect(type.textContent).toContain('Private Limited Company');
    expect(dateOfCreation.textContent).toContain('1 January 2000');
  });

  test('should display date of cessation if available', () => {
    component.company = {
      addressSnippet: '123 Main St, Anytown, USA',
      companyStatus: 'active',
      companyType: 'private limited company',
      dateOfCreation: '2000-01-01',
      dateOfCessation: '2022-01-01',
    } as unknown as CompanySearchItem;
    fixture.detectChanges();

    const dateOfCessation = fixture.debugElement.query(
      By.css('#date-of-cessation'),
    ).nativeElement;
    expect(dateOfCessation.textContent).toContain('1 January 2022');
  });

  test('should not display date of cessation if not available', () => {
    component.company = {
      addressSnippet: '123 Main St, Anytown, USA',
      companyStatus: 'active',
      companyType: 'private limited company',
      dateOfCreation: '2000-01-01',
      dateOfCessation: undefined,
    } as unknown as CompanySearchItem;
    fixture.detectChanges();

    const dateOfCessation = fixture.debugElement.query(
      By.css('#date-of-cessation'),
    );
    expect(dateOfCessation).toBeNull();
  });
});
