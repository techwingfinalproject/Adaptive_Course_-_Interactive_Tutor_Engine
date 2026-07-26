import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  showPassword = signal<boolean>(false);
  errorMessage = signal<string>('');

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email } = this.loginForm.value;
      const success = this.authService.login(email);
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage.set('Invalid email or password.');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithSocial(provider: string) {
    // Mock social login
    const email = provider === 'google' ? 'google.user@example.com' : 'ms.user@example.com';
    const name = provider === 'google' ? 'Google Student' : 'Microsoft Student';
    this.authService.login(email, name);
    this.router.navigate(['/dashboard']);
  }
}
