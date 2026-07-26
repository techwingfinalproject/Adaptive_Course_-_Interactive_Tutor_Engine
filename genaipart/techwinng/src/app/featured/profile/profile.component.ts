import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authService = inject(AuthService);

  isEditing = signal<boolean>(false);

  // Form fields
  editName = signal<string>('');
  editPhone = signal<string>('');
  editBatch = signal<string>('');

  achievements = [
    { name: 'Top Performer', icon: 'star', desc: 'Scored 90%+ in 5 consecutive quizzes.' },
    { name: 'Quiz Master', icon: 'award', desc: 'Completed all quiz challenges.' },
    { name: 'Consistent Learner', icon: 'calendar', desc: 'Maintained a 10-day learning streak.' }
  ];

  stats = [
    { label: 'Hours Learned', value: '120 hrs', icon: 'clock' },
    { label: 'Quizzes Taken', value: '18', icon: 'check-square' },
    { label: 'Certificates', value: '4', icon: 'file-text' },
    { label: 'Streak', value: '12 days', icon: 'zap' }
  ];

  startEdit() {
    const current = this.authService.currentUser();
    if (current) {
      this.editName.set(current.name);
      this.editPhone.set(current.phone || '');
      this.editBatch.set(current.batch || '');
      this.isEditing.set(true);
    }
  }

  cancelEdit() {
    this.isEditing.set(false);
  }

  saveProfile() {
    this.authService.updateProfile({
      name: this.editName(),
      phone: this.editPhone(),
      batch: this.editBatch()
    });
    this.isEditing.set(false);
  }
}
