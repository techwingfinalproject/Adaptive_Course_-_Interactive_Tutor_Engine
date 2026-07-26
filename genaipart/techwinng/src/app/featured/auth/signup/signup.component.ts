import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: '../login/login.component.css'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  showPassword = signal<boolean>(false);
  errorMessage = signal<string>('');

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email } = this.signupForm.value;
      const success = this.authService.signup(name, email);
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage.set('Sign up failed. Please try again.');
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  signupWithSocial(provider: string) {
    const email = provider === 'google' ? 'google.user@example.com' : 'ms.user@example.com';
    const name = provider === 'google' ? 'Google Student' : 'Microsoft Student';
    this.authService.signup(name, email);
    this.router.navigate(['/dashboard']);
  }
}
