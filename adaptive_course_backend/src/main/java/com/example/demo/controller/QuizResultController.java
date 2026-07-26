package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.QuizResult;
import com.example.demo.service.QuizResultService;

@RestController
@RequestMapping("/api/quiz-results")
@CrossOrigin(origins = "*")
public class QuizResultController {

    private final QuizResultService quizResultService;

    public QuizResultController(QuizResultService quizResultService) {
        this.quizResultService = quizResultService;
    }

    @PostMapping
    public QuizResult saveResult(@RequestBody QuizResult quizResult) {
        return quizResultService.saveQuizResult(quizResult);
    }

    @GetMapping
    public List<QuizResult> getAllResults() {
        return quizResultService.getAllResults();
    }

    @GetMapping("/{id}")
    public QuizResult getResultById(@PathVariable Long id) {
        return quizResultService.getResultById(id);
    }

    @GetMapping("/student/{studentId}")
    public List<QuizResult> getResultsByStudent(@PathVariable Long studentId) {
        return quizResultService.getResultsByStudent(studentId);
    }

    @GetMapping("/quiz/{quizId}")
    public List<QuizResult> getResultsByQuiz(@PathVariable Long quizId) {
        return quizResultService.getResultsByQuiz(quizId);
    }

    @DeleteMapping("/{id}")
    public String deleteResult(@PathVariable Long id) {

        quizResultService.deleteResult(id);

        return "Quiz Result deleted successfully.";
    }
}

