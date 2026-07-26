import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  errorMessage = '';

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load courses. Please log in.';
      }
    });
  }

  enroll(courseId: number): void {
    this.enrollmentService.enrollInCourse(courseId).subscribe({
      next: (res) => {
        // Navigate to student dashboard upon successful enrollment
        this.router.navigate(['/student/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to enroll in the course. Make sure you are logged in as a student.';
      }
    });
  }
}
