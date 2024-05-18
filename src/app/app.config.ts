import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { requestInterceptor } from './interceptors/request.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { convertToCamelInterceptor } from './interceptors/convert-to-camel.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { notificationsReducer } from './store/notifications.reducers';
import * as NotificationEffects from './store/notifications.effects';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      router: routerReducer,
      notifications: notificationsReducer,
    }),
    provideRouterStore(),
    provideEffects([NotificationEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouter(APP_ROUTES),
    provideHttpClient(
      withInterceptors([requestInterceptor, convertToCamelInterceptor]),
    ),
    provideAnimationsAsync(),
    provideToastr(),
  ],
};
