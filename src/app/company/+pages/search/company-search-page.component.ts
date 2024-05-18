import { Component } from '@angular/core';
import { CompanySearchComponent } from './components/company-search/company-search.component';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [CompanySearchComponent],
  templateUrl: './company-search-page.component.html',
  styleUrl: './company-search-page.component.scss',
})
export class CompanySearchPageComponent {}
