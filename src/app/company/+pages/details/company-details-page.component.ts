import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCompanyDetails } from './+store/company-details/company-details.selectors';
import { PushPipe } from '@ngrx/component';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import {
  clearCompanyDetails,
  viewCompanyDetails,
} from './+store/company-details/company-details.actions';
import { CompanyDetailsHeaderComponent } from './components/company-details-header/company-details-header.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanySearchBarComponent } from '../search/components/company-search-bar/company-search-bar.component';
import { tap } from 'rxjs';
import { getCompanyDirectors } from './+store/company-directors/company-directors.actions';

@Component({
  selector: 'app-company-details-page',
  standalone: true,
  imports: [
    PushPipe,
    CompanyDetailsHeaderComponent,
    CompanyDetailsComponent,
    CompanySearchBarComponent,
  ],
  templateUrl: './company-details-page.component.html',
  styleUrl: './company-details-page.component.scss',
})
export class CompanyDetailsPageComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);
  selectedCompany$ = this.store.select(selectCompanyDetails);
  companyId$ = this.activatedRoute.params.pipe(
    take(1),
    tap(({ id }) => this.viewCompanyDetailsAndDirectors(id)),
  );

  ngOnInit() {
    this.companyId$.subscribe();
  }

  viewCompanyDetailsAndDirectors(companyNumber: string | null | undefined) {
    if (!companyNumber) {
      return;
    }

    this.store.dispatch(viewCompanyDetails({ companyNumber }));
    this.store.dispatch(getCompanyDirectors({ companyNumber }));
  }

  ngOnDestroy() {
    this.store.dispatch(clearCompanyDetails());
  }
}
