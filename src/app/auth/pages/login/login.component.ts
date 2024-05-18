import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { login } from '../../store/auth.actions';
import { isLoggingIn } from '../../store/auth.selectors';
import { PushPipe } from '@ngrx/component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, PushPipe, MatProgressSpinner, MatButton],
})
export class LoginComponent {
  store = inject(Store);
  isLoggingIn$ = this.store.select(isLoggingIn);
  activatedRoute = inject(ActivatedRoute);

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', Validators.required),
    },
    {
      updateOn: 'blur',
    },
  );

  get email() {
    return this.loginForm.get('email') as FormControl<string>;
  }

  get password() {
    return this.loginForm.get('password') as FormControl<string>;
  }

  onSubmit() {
    this.store.dispatch(
      login({
        emailOrUsername: this.email.value,
        password: this.password.value,
        returnUrl:
          this.activatedRoute.snapshot.queryParams?.['returnUrl'] ?? '/',
      }),
    );
  }
}
