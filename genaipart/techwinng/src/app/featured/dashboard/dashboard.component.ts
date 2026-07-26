import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CourseService } from '../../core/services/course.service';
import { AITutorService } from '../../core/services/ai-tutor.service';
import { QuizService } from '../../core/services/quiz.service';
import { ProgressRingComponent } from '../../shared/components/progress-ring.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, ProgressRingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService = inject(AuthService);
  courseService = inject(CourseService);
  aiTutorService = inject(AITutorService);
  quizService = inject(QuizService);

  // Computed average overall progress
  overallProgress = computed(() => {
    const enrolled = this.courseService.courses();
    if (enrolled.length === 0) return 0;
    const total = enrolled.reduce((sum, c) => sum + c.progress, 0);
    return Math.round(total / enrolled.length);
  });

  // Computed completed lessons count
  lessonsCompleted = computed(() => {
    const enrolled = this.courseService.courses();
    return enrolled.reduce((sum, c) => sum + c.lessonsCompleted, 0);
  });

  // Active recommended topic from AI tutor
  weakTopic = computed(() => {
    const topics = this.aiTutorService.weakTopics();
    return topics.length > 0 ? topics[0] : null;
  });

  recentActivity = [
    { type: 'quiz', text: 'Quiz Completed - Database Normalization', score: '85%', date: 'Today' },
    { type: 'lesson', text: 'Lesson Completed - 3. Normal Forms', course: 'Database Systems', date: 'Yesterday' },
    { type: 'quiz', text: 'Quiz Completed - Arrays & Vectors', score: '90%', date: '2 days ago' }
  ];
}
