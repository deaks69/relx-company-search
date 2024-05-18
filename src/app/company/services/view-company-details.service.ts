import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanySearch, CompanySearchItem } from '../models/company-search';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ViewCompanyDetailsService {
  http = inject(HttpClient);
  private searchUrl = 'api/TruProxyAPI/rest/Companies/v1/Search';

  viewCompanyDetails(query: string) {
    return this.http
      .get<CompanySearch>(`${this.searchUrl}?Query=${query}`)
      .pipe(
        map((companySearch) => companySearch?.items?.[0] as CompanySearchItem),
      );
  }
}
