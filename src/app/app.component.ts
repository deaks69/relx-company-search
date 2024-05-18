import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { selectNotification } from './store/notifications.selectors';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'relx-company';
  store = inject(Store);
  toastr = inject(ToastrService);
  notification$ = this.store.select(selectNotification).pipe(
    tap((notification) => {
      if (notification?.message && !notification?.error) {
        this.toastr.success(notification?.message);
      }
      if (notification?.message && notification?.error) {
        this.toastr.error(notification?.message);
      }
    }),
  );

  ngOnInit() {
    this.notification$.subscribe();
  }
}
