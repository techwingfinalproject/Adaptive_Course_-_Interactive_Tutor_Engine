import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent {
  studentData = {
    fullName: '',
    email: '',
    password: '',
    phone: '',
    batch: '',
    role: 'STUDENT'
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.registerStudent(this.studentData).subscribe({
      next: (res) => {
        this.router.navigate(['/student/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please check your details.';
        console.error(err);
      }
    });
  }
}
