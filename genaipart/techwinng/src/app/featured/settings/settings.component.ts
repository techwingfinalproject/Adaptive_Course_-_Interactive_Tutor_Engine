import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  authService = inject(AuthService);
  router = inject(Router);

  // Settings states
  theme = signal<string>('light');
  emailNotif = signal<boolean>(true);
  quizNotif = signal<boolean>(true);
  aiReports = signal<boolean>(false);
  language = signal<string>('en');
  isPublicProfile = signal<boolean>(true);

  // Security password fields
  currentPassword = signal<string>('');
  newPassword = signal<string>('');
  confirmNewPassword = signal<string>('');

  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  setTheme(selectedTheme: string) {
    this.theme.set(selectedTheme);
    // Mock changing root stylesheet classes if we want
  }

  saveGeneralSettings() {
    this.successMessage.set('General settings saved successfully.');
    setTimeout(() => this.successMessage.set(''), 3000);
  }

  changePassword() {
    const cp = this.currentPassword().trim();
    const np = this.newPassword().trim();
    const cnp = this.confirmNewPassword().trim();

    if (!cp || !np || !cnp) {
      this.errorMessage.set('All password fields are required.');
      return;
    }

    if (np.length < 6) {
      this.errorMessage.set('New password must be at least 6 characters long.');
      return;
    }

    if (np !== cnp) {
      this.errorMessage.set('New passwords do not match.');
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('Password updated successfully.');
    
    // Clear inputs
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmNewPassword.set('');

    setTimeout(() => this.successMessage.set(''), 3000);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
