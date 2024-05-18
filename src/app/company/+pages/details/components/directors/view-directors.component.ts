import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCompanyDirectorsLatest } from '../../+store/company-directors/company-directors.selectors';
import { PushPipe } from '@ngrx/component';
import { CurrentDirectorsPipe } from '../../pipes/current-directors.pipe';
import { MatDivider } from '@angular/material/divider';
import { AddressPipe } from '../../../../pipes/address.pipe';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { MonthPipe } from '../../pipes/month.pipe';
import { CompanySearchItem } from '../../../../models/company-search';

@Component({
  selector: 'app-view-directors',
  standalone: true,
  imports: [
    PushPipe,
    CurrentDirectorsPipe,
    MatDivider,
    AddressPipe,
    DatePipe,
    TitleCasePipe,
    MonthPipe,
    NgClass,
  ],
  templateUrl: './view-directors.component.html',
  styleUrl: './view-directors.component.scss',
})
export class ViewDirectorsComponent implements OnInit {
  @Input() company: CompanySearchItem | null | undefined;

  store = inject(Store);
  directors$ = this.store.select(selectCompanyDirectorsLatest);

  ngOnInit() {}
}
