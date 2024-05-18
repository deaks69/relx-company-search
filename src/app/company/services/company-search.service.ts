import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanySearch } from '../models/company-search';

@Injectable({
  providedIn: 'root',
})
export class CompanySearchService {
  http = inject(HttpClient);
  private searchUrl = 'api/TruProxyAPI/rest/Companies/v1/Search';

  searchCompanies(query: string) {
    return this.http.get<CompanySearch>(`${this.searchUrl}?Query=${query}`);
  }
}
