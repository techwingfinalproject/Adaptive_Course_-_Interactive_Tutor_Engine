import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  enrollments: any[] = [];
  loading = true;
  error = '';

  constructor(
    private enrollmentService: EnrollmentService,
    private progressService: ProgressService,
    private router: Router
  ) {}

  goToCourse(courseId: number): void {
    this.router.navigate(['/course', courseId, 'learn']);
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.enrollmentService.getMyEnrollments().subscribe({
      next: (data) => {
        this.enrollments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load your courses.';
        this.loading = false;
      }
    });
  }
}
