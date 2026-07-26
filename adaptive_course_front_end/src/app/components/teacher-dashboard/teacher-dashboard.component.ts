import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  myCourses: any[] = [];
  loading = true;
  error = '';
  teacherName = 'Teacher';

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Basic decode from token just for display
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.teacherName = payload.sub || 'Teacher'; // 'sub' is usually email
      } catch (e) {}
    }
    
    this.loadMyCourses();
  }

  loadMyCourses(): void {
    // In a real app, you'd fetch courses owned by this teacher.
    // For now, we fetch all courses and assume the teacher manages them.
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.myCourses = courses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load courses';
        this.loading = false;
      }
    });
  }

  manageCourse(courseId: number): void {
    this.router.navigate([`/teacher/courses/${courseId}/manage`]);
  }
}
