import { Directive, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { selectLatestCompanySearchResults } from '../+store/company-search.selectors';
import { search } from '../+store/company-search.actions';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[appCompanySearch]',
  standalone: true,
})
export class CompanySearchDirective {
  toastr = inject(ToastrService);
  store = inject(Store);
  activatedRoute = inject(ActivatedRoute);

  search = new FormControl('');

  results$ = this.store.select(selectLatestCompanySearchResults);

  searchCompanies(searchTerm: string | null | undefined) {
    if (!searchTerm) {
      this.toastr.error('Please enter a search term');
      return;
    }

    this.store.dispatch(search({ search: searchTerm }));
    // this.search.setValue('');
  }
}
