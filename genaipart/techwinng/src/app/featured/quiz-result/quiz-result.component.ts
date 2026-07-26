import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService, QuizResult } from '../../core/services/quiz.service';
import { ProgressRingComponent } from '../../shared/components/progress-ring.component';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [RouterLink, ProgressRingComponent],
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.css'
})
export class QuizResultComponent {
  quizService = inject(QuizService);

  result = computed(() => {
    const res = this.quizService.latestResult();
    if (res) return res;

    // Fallback mock result for robust testing/direct navigation
    return {
      score: 80,
      totalQuestions: 10,
      correctAnswers: 8,
      wrongAnswers: 2,
      timeTaken: '08:32',
      questions: [
        {
          id: 1,
          text: 'Which normal form eliminates partial dependency?',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          correctAnswerIndex: 1,
          selectedAnswerIndex: 1
        },
        {
          id: 2,
          text: 'Which normal form eliminates transitive dependency?',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          correctAnswerIndex: 2,
          selectedAnswerIndex: 2
        },
        {
          id: 3,
          text: 'For a relation to be in BCNF, for every functional dependency X -> Y, X must be a:',
          options: ['Candidate Key', 'Super Key', 'Primary Key', 'Foreign Key'],
          correctAnswerIndex: 1,
          selectedAnswerIndex: 2 // Incorrect choice
        }
      ]
    } as QuizResult;
  });

  feedbackMessage = computed(() => {
    const score = this.result()?.score || 0;
    if (score >= 90) return 'Outstanding! You have mastered this topic.';
    if (score >= 75) return 'Excellent! You have a strong understanding of this topic.';
    if (score >= 50) return 'Good effort! Some areas need review and practice.';
    return 'Keep studying! We recommend reviewing the study materials and retaking the quiz.';
  });
}
