import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDetailsHeaderComponent } from './company-details-header.component';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from 'vitest';
import { CompanySearchItem } from '../../../../models/company-search';

describe('CompanyDetailsHeaderComponent', () => {
  let component: CompanyDetailsHeaderComponent;
  let fixture: ComponentFixture<CompanyDetailsHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, CompanyDetailsHeaderComponent],
    });

    fixture = TestBed.createComponent(CompanyDetailsHeaderComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  test('should display the company title and number', () => {
    component.company = {
      title: 'Test Company',
      companyNumber: '12345678',
    } as unknown as CompanySearchItem;
    fixture.detectChanges();

    const title = fixture.debugElement.query(
      By.css('#company-title'),
    ).nativeElement;
    const companyNumber = fixture.debugElement.query(
      By.css('#company-number'),
    ).nativeElement;

    expect(title.textContent).toContain('Test Company');
    expect(companyNumber.textContent).toContain('12345678');
  });

  test('should handle undefined company input', () => {
    component.company = undefined;
    fixture.detectChanges();

    const title = fixture.debugElement.query(
      By.css('#company-title'),
    ).nativeElement;
    const companyNumber = fixture.debugElement.query(
      By.css('#company-number'),
    ).nativeElement;

    expect(title.textContent).toBe('');
    expect(companyNumber.textContent).toBe('');
  });
});
