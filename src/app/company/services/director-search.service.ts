import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Director } from '../models/director';

@Injectable({
  providedIn: 'root',
})
export class DirectorSearchService {
  http = inject(HttpClient);
  private searchUrl = 'api/TruProxyAPI/rest/Companies/v1/Officers';

  searchDirectors(query: string) {
    return this.http.get<Director>(`${this.searchUrl}?CompanyNumber=${query}`);
  }
}
