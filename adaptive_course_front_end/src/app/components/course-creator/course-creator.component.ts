import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-creator',
  templateUrl: './course-creator.component.html',
  styleUrls: ['./course-creator.component.css']
})
export class CourseCreatorComponent {
  courseData = {
    courseName: '',
    courseCode: '',
    description: '',
    duration: null
  };
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private courseService: CourseService, private router: Router) {}

  createCourse() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.courseService.createCourse(this.courseData).subscribe({
      next: (res) => {
        this.successMessage = 'Course created successfully!';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/teacher/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = 'Failed to create course. Please try again.';
        this.loading = false;
      }
    });
  }
}
