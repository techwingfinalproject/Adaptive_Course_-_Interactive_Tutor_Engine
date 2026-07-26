import { Injectable, signal, computed } from '@angular/core';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex: number | null;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  questions: Question[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: string;
  questions: Question[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private activeQuizSignal = signal<Quiz | null>(null);
  private quizResultSignal = signal<QuizResult | null>(null);

  activeQuiz = computed(() => this.activeQuizSignal());
  latestResult = computed(() => this.quizResultSignal());

  private mockQuizzes: Record<string, Quiz> = {
    'dbms_norm': {
      id: 'dbms_norm',
      title: 'Database Normalization',
      courseId: 'dbms',
      totalQuestions: 10,
      timeLimitMinutes: 10,
      questions: [
        {
          id: 1,
          text: 'Which normal form eliminates partial dependency?',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          correctAnswerIndex: 1,
          selectedAnswerIndex: null
        },
        {
          id: 2,
          text: 'Which normal form eliminates transitive dependency?',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          correctAnswerIndex: 2,
          selectedAnswerIndex: null
        },
        {
          id: 3,
          text: 'For a relation to be in BCNF, for every functional dependency X -> Y, X must be a:',
          options: ['Candidate Key', 'Super Key', 'Primary Key', 'Foreign Key'],
          correctAnswerIndex: 1,
          selectedAnswerIndex: null
        },
        {
          id: 4,
          text: 'What rule must be satisfied for a relation to be in 1NF?',
          options: ['No partial dependencies', 'No transitive dependencies', 'Attributes must contain atomic values', 'All of the above'],
          correctAnswerIndex: 2,
          selectedAnswerIndex: null
        },
        {
          id: 5,
          text: 'A relation is in 2NF if it is in 1NF and:',
          options: [
            'All non-prime attributes are fully functionally dependent on the primary key',
            'No non-prime attribute is transitively dependent on the primary key',
            'It contains no multi-valued dependencies',
            'For every FD X -> Y, X is a super key'
          ],
          correctAnswerIndex: 0,
          selectedAnswerIndex: null
        },
        {
          id: 6,
          text: 'Which normal form deals with multi-valued dependencies?',
          options: ['3NF', 'BCNF', '4NF', '5NF'],
          correctAnswerIndex: 2,
          selectedAnswerIndex: null
        },
        {
          id: 7,
          text: 'If A -> B and B -> C, then the dependency A -> C is called:',
          options: ['Partial Dependency', 'Transitive Dependency', 'Trivial Dependency', 'Join Dependency'],
          correctAnswerIndex: 1,
          selectedAnswerIndex: null
        },
        {
          id: 8,
          text: 'Every relation that is in BCNF is also in:',
          options: ['3NF', '4NF', '5NF', 'None of the above'],
          correctAnswerIndex: 0,
          selectedAnswerIndex: null
        },
        {
          id: 9,
          text: 'Join dependency is associated with which normal form?',
          options: ['3NF', 'BCNF', '4NF', '5NF'],
          correctAnswerIndex: 3,
          selectedAnswerIndex: null
        },
        {
          id: 10,
          text: 'Lossless join and dependency preservation are properties of schema decomposition. 3NF decomposition is:',
          options: [
            'Always lossless and dependency preserving',
            'Always lossless but not always dependency preserving',
            'Always dependency preserving but not always lossless',
            'Neither lossless nor dependency preserving'
          ],
          correctAnswerIndex: 0,
          selectedAnswerIndex: null
        }
      ]
    }
  };

  getQuiz(id: string): Quiz | undefined {
    const quiz = this.mockQuizzes[id];
    if (quiz) {
      // Return a deep copy so we can modify the selected answers independently
      return JSON.parse(JSON.stringify(quiz));
    }
    return undefined;
  }

  startQuiz(id: string): Quiz | null {
    const quiz = this.getQuiz(id);
    if (quiz) {
      this.activeQuizSignal.set(quiz);
      return quiz;
    }
    return null;
  }

  selectAnswer(questionId: number, answerIndex: number) {
    const quiz = this.activeQuizSignal();
    if (quiz) {
      const updatedQuestions = quiz.questions.map(q => {
        if (q.id === questionId) {
          return { ...q, selectedAnswerIndex: answerIndex };
        }
        return q;
      });
      this.activeQuizSignal.set({ ...quiz, questions: updatedQuestions });
    }
  }

  submitQuiz(timeTakenStr: string = '08:32'): QuizResult | null {
    const quiz = this.activeQuizSignal();
    if (!quiz) return null;

    let correctAnswers = 0;
    let wrongAnswers = 0;

    quiz.questions.forEach(q => {
      if (q.selectedAnswerIndex === q.correctAnswerIndex) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const score = Math.round((correctAnswers / quiz.totalQuestions) * 100);

    const result: QuizResult = {
      score,
      totalQuestions: quiz.totalQuestions,
      correctAnswers,
      wrongAnswers,
      timeTaken: timeTakenStr,
      questions: quiz.questions
    };

    this.quizResultSignal.set(result);
    this.activeQuizSignal.set(null); // Clear active quiz
    return result;
  }
}
