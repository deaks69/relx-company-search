import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CompanySearchItem } from '../../../../models/company-search';

@Component({
  selector: 'app-company-details-header',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './company-details-header.component.html',
  styleUrl: './company-details-header.component.scss',
})
export class CompanyDetailsHeaderComponent {
  @Input() company: CompanySearchItem | null | undefined;
}
