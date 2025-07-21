import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../SERVICES/AUTH/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(100),
    ]),
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/listings']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
    } else {
      console.log('Form invalid');
    }
  }
}
