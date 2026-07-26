import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: '../login/login.component.css'
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isResetSent = signal<boolean>(false);
  errorMessage = signal<string>('');

  onSubmit() {
    if (this.forgotForm.valid) {
      const { email } = this.forgotForm.value;
      const success = this.authService.forgotPassword(email);
      if (success) {
        this.isResetSent.set(true);
      } else {
        this.errorMessage.set('Could not send reset link. Please try again.');
      }
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
