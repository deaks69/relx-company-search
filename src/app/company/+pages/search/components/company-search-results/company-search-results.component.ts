import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';
import { CompanySearchComponent } from '../company-search/company-search.component';
import { CompanySearchBarComponent } from '../company-search-bar/company-search-bar.component';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HighlightMatchesPipe } from '../../../../pipes/highlight-matches.pipe';
import { AddressPipe } from '../../../../pipes/address.pipe';
import {
  companySearchVm,
  selectLatestCompanySearchResults,
} from '../../+store/company-search.selectors';
import { search, setSelectedPage } from '../../+store/company-search.actions';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-results',
  standalone: true,
  imports: [
    PushPipe,
    HighlightMatchesPipe,
    AddressPipe,
    MatCardModule,
    CompanySearchComponent,
    CompanySearchBarComponent,
    MatIcon,
    MatPaginator,
    RouterLink,
  ],
  templateUrl: './company-search-results.component.html',
  styleUrl: './company-search-results.component.scss',
})
export class CompanySearchResultsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator:
    | MatPaginator
    | undefined;
  toastr = inject(ToastrService);
  destroy$ = new Subject<boolean>();
  activatedRoute = inject(ActivatedRoute);
  viewportScroller = inject(ViewportScroller);
  store = inject(Store);
  router = inject(Router);
  vm$ = this.store.select(companySearchVm);
  results$ = this.store.select(selectLatestCompanySearchResults);
  query$ = this.activatedRoute.queryParams.pipe(
    takeUntil(this.destroy$),
    withLatestFrom(this.results$),
    map(([{ q }, results]) => ({ q, results })),
    filter(({ q, results }) => q && !results?.items?.length),
    map(({ q }) => this.searchCompanies(q)),
  );

  ngOnInit() {
    this.query$.subscribe();
  }

  changePage({ pageIndex, previousPageIndex, pageSize, length }: PageEvent) {
    this.scrollToTop();
    this.store.dispatch(
      setSelectedPage({ page: pageIndex + 1, itemsPerPage: pageSize }),
    );
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  viewCompanyDetails(companyNumber: string) {
    this.router.navigateByUrl(`/companies/${companyNumber}`);
  }

  searchCompanies(searchTerm: string | null | undefined) {
    if (!searchTerm) {
      this.toastr.error('Please enter a search term');
      return;
    }

    this.store.dispatch(search({ search: searchTerm }));
    // this.search.setValue('');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
