import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { PushPipe } from '@ngrx/component';
import { CompanySearchBarComponent } from '../company-search-bar/company-search-bar.component';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectLatestCompanySearchResults } from '../../+store/company-search.selectors';
import { search } from '../../+store/company-search.actions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    PushPipe,
    CompanySearchBarComponent,
  ],
  templateUrl: './company-search.component.html',
  styleUrl: './company-search.component.scss',
})
export class CompanySearchComponent implements AfterViewInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  toastr = inject(ToastrService);
  store = inject(Store);
  activatedRoute = inject(ActivatedRoute);

  search = new FormControl('');

  results$ = this.store.select(selectLatestCompanySearchResults);
  query$ = this.activatedRoute.queryParams.pipe(
    takeUntil(this.destroy$),
    withLatestFrom(this.results$),
    map(([{ q }, results]) => ({ q, results })),
    filter(({ q, results }) => q && !results?.items?.length),
    map(({ q }) => this.searchCompanies(q)),
  );

  ngAfterViewInit() {
    this.query$.subscribe();
  }

  searchCompanies(searchTerm: string | null | undefined) {
    if (!searchTerm) {
      this.toastr.error('Please enter a search term');
      return;
    }

    this.store.dispatch(search({ search: searchTerm }));
    this.search.setValue('');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
