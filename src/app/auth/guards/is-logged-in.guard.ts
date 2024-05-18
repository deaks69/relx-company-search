import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export function isLoggedInGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    if (localStorage.getItem('user')) {
      return true;
    }
    router.navigateByUrl('/login');
    return false;
  };
}
