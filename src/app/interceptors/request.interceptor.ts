import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment?.apiKey;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const clonedRequest = req.clone({
    setHeaders: {
      'X-Api-Key': apiKey,
    },
  });

  return next(clonedRequest);
};
