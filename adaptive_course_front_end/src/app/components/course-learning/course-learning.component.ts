import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-course-learning',
  templateUrl: './course-learning.component.html',
  styleUrls: ['./course-learning.component.css']
})
export class CourseLearningComponent implements OnInit {
  courseId: string | null = null;
  lessons: any[] = [];
  selectedLesson: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.loadLessons(this.courseId);
    }
  }

  loadLessons(courseId: string): void {
    this.lessonService.getLessonsByCourse(courseId).subscribe({
      next: (data) => {
        this.lessons = data;
        if (this.lessons.length > 0) {
          this.selectedLesson = this.lessons[0];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load lessons', err);
        this.loading = false;
      }
    });
  }
  
  selectLesson(lesson: any) {
    this.selectedLesson = lesson;
  }
}
