import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { isLoggedInGuard } from './is-logged-in.guard';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('isLoggedInGuard', () => {
  let router: Router;
  let mockRouteSnapshot = {} as unknown as ActivatedRouteSnapshot;
  let mockRouterStateSnapshot = {} as unknown as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: vi.fn(),
          },
        },
      ],
    });

    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear(); // Clear localStorage after each test
  });

  test('should allow navigation if the user is logged in', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'testUser' }));

    const guard = isLoggedInGuard();

    const result = TestBed.runInInjectionContext(() =>
      guard(mockRouteSnapshot, mockRouterStateSnapshot),
    );

    expect(result).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  test('should navigate to /login if the user is not logged in', () => {
    localStorage.removeItem('user');

    const guard = isLoggedInGuard();

    const result = TestBed.runInInjectionContext(() =>
      guard(mockRouteSnapshot, mockRouterStateSnapshot),
    );

    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
