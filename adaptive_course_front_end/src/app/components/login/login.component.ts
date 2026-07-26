import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        const role = this.authService.getRole();
        if (role === 'STUDENT') {
          this.router.navigate(['/student/dashboard']);
        } else if (role === 'TEACHER') {
          this.router.navigate(['/teacher/dashboard']);
        } else if (role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/courses']); // fallback
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
