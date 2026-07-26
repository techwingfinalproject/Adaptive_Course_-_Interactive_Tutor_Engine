package com.example.demo.service;

import java.util.List;
import com.example.demo.models.Quiz;

public interface QuizService {
    Quiz addQuiz(Quiz quiz, String teacherEmail);
    Quiz updateQuiz(Long id, Quiz quiz, String teacherEmail);
    void deleteQuiz(Long id, String teacherEmail);
    List<Quiz> getQuizzesByLessonId(Long lessonId);
    String submitQuiz(Long id, String answer);
}

