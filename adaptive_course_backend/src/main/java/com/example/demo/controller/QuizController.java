package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Quiz;
import com.example.demo.service.QuizService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public Quiz addQuiz(@Valid @RequestBody Quiz quiz, Authentication authentication) {
        return quizService.addQuiz(quiz, authentication.getName());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public Quiz updateQuiz(@PathVariable Long id,
                              @Valid @RequestBody Quiz quiz,
                              Authentication authentication) {
        return quizService.updateQuiz(id, quiz, authentication.getName());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public String deleteQuiz(@PathVariable Long id, Authentication authentication) {
        quizService.deleteQuiz(id, authentication.getName());
        return "Quiz deleted successfully.";
    }

    @GetMapping("/lesson/{lessonId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN')")
    public List<Quiz> getQuizzesByLesson(@PathVariable Long lessonId) {
        return quizService.getQuizzesByLessonId(lessonId);
    }

    @PostMapping("/{id}/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public String submitQuiz(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return quizService.submitQuiz(id, payload.get("answer"));
    }
}

