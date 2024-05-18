import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const convertToCamelInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<any>> => {
  const camelCaseBody = convertKeysToCamelCase(req.body);
  const modifiedRequest = req.clone({ body: camelCaseBody });

  return next(modifiedRequest).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        const modifiedBody = convertKeysToCamelCase(event.body);
        return event.clone({ body: modifiedBody });
      }
      return event;
    }),
  );
};

function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToCamelCase(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (result, key) => {
        const newKey = key
          .split('_')
          .map((part, index) => {
            if (index === 0) return part;
            return part.charAt(0).toUpperCase() + part.slice(1);
          })
          .join('');
        result[newKey] = convertKeysToCamelCase(
          (obj as Record<string, any>)[key],
        );
        return result;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
}
