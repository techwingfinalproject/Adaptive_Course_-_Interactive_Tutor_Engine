import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService, Quiz, Question } from '../../core/services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  quizService = inject(QuizService);

  quiz = signal<Quiz | null>(null);
  currentQuestionIndex = signal<number>(0);
  remainingSeconds = signal<number>(600); // 10 minutes

  private timerInterval: any;

  currentQuestion = computed(() => {
    const q = this.quiz();
    if (q && q.questions.length > 0) {
      return q.questions[this.currentQuestionIndex()];
    }
    return null;
  });

  formattedTime = computed(() => {
    const seconds = this.remainingSeconds();
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  });

  optionLetters = ['A', 'B', 'C', 'D'];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const started = this.quizService.startQuiz(id);
        if (started) {
          this.quiz.set(started);
          this.remainingSeconds.set(started.timeLimitMinutes * 60);
          this.startTimer();
        } else {
          this.router.navigate(['/courses']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.remainingSeconds.update(s => {
        if (s <= 1) {
          this.stopTimer();
          this.onSubmit(); // Auto submit
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  selectOption(optionIndex: number) {
    const question = this.currentQuestion();
    if (question) {
      this.quizService.selectAnswer(question.id, optionIndex);
      // Update local quiz state to reflect selection immediately
      const active = this.quizService.activeQuiz();
      this.quiz.set(active);
    }
  }

  clearAnswer() {
    const question = this.currentQuestion();
    if (question) {
      // Pass -1 or null
      this.quizService.selectAnswer(question.id, -1);
      const active = this.quizService.activeQuiz();
      this.quiz.set(active);
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.update(idx => idx - 1);
    }
  }

  nextQuestion() {
    const q = this.quiz();
    if (q && this.currentQuestionIndex() < q.questions.length - 1) {
      this.currentQuestionIndex.update(idx => idx + 1);
    }
  }

  onSubmit() {
    this.stopTimer();
    this.quizService.submitQuiz(this.formattedTime());
    this.router.navigate(['/quiz-result']);
  }
}
