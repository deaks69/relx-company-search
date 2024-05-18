import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { PushPipe } from '@ngrx/component';
import { MatIcon } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { search } from '../../+store/company-search.actions';

@Component({
  selector: 'app-company-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    PushPipe,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './company-search-bar.component.html',
  styleUrl: './company-search-bar.component.scss',
})
export class CompanySearchBarComponent {
  search = new FormControl('');
  toastr = inject(ToastrService);
  store = inject(Store);

  searchCompanies(searchTerm: string | null | undefined) {
    if (!searchTerm) {
      this.toastr.error('Please enter a search term');
      return;
    }

    this.store.dispatch(search({ search: searchTerm }));
    // this.search.setValue('');
  }
}
