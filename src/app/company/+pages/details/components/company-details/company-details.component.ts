import { Component, Input } from '@angular/core';
import { CompanySearchItem } from '../../../../models/company-search';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ViewDirectorsComponent } from '../directors/view-directors.component';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    MatTabGroup,
    MatTab,
    ViewDirectorsComponent,
  ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss',
})
export class CompanyDetailsComponent {
  @Input() company: CompanySearchItem | null | undefined;
}
