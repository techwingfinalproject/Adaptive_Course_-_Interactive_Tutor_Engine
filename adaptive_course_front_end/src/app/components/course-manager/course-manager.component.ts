import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent implements OnInit {
  courseId: number | null = null;
  lessons: any[] = [];
  selectedLesson: any = null;
  loadingLessons = true;
  loading = false;
  
  isAddingQuiz = false;
  successMessage = '';
  errorMessage = '';

  newLesson = {
    lessonTitle: '',
    lessonContent: '',
    videoUrl: '',
    lessonOrder: 1,
    course: { courseId: 0 },
    courseId: 0
  };

  newQuiz = {
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    marks: 10,
    lesson: { lessonId: 0 },
    lessonId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = +id;
      this.newLesson.course.courseId = this.courseId;
      this.newLesson.courseId = this.courseId;
      this.loadLessons();
    }
  }

  loadLessons(): void {
    if (!this.courseId) return;
    this.loadingLessons = true;
    this.lessonService.getLessonsByCourse(this.courseId).subscribe({
      next: (data) => {
        this.lessons = data;
        this.loadingLessons = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load lessons.';
        this.loadingLessons = false;
      }
    });
  }

  selectLesson(lesson: any): void {
    this.selectedLesson = lesson;
    this.isAddingQuiz = false;
  }

  createLesson(): void {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.lessonService.createLesson(this.newLesson).subscribe({
      next: (res) => {
        this.successMessage = 'Lesson created successfully!';
        this.loading = false;
        this.newLesson = {
          lessonTitle: '',
          lessonContent: '',
          videoUrl: '',
          lessonOrder: this.lessons.length + 2,
          course: { courseId: this.courseId || 0 },
          courseId: this.courseId || 0
        };
        this.loadLessons();
      },
      error: (err) => {
        this.errorMessage = 'Failed to create lesson.';
        this.loading = false;
      }
    });
  }

  createQuiz(): void {
    if (!this.selectedLesson) return;
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    this.newQuiz.lesson.lessonId = this.selectedLesson.lessonId;
    this.newQuiz.lessonId = this.selectedLesson.lessonId;

    this.quizService.createQuiz(this.newQuiz).subscribe({
      next: (res: any) => {
        this.successMessage = 'Quiz created successfully!';
        this.loading = false;
        this.isAddingQuiz = false;
        this.newQuiz = {
          question: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctAnswer: '',
          marks: 10,
          lesson: { lessonId: 0 },
          lessonId: 0
        };
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to create quiz.';
        this.loading = false;
      }
    });
  }
}
