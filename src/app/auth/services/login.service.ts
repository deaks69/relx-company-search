import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  login(emailOrUsername: string, password: string) {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      token: 'mock-token-123456',
    };

    return of(mockUser).pipe(delay(3000));
  }
}
