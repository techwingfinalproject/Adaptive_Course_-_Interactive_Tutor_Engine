package com.example.demo.service;

import java.util.List;

import com.example.demo.models.QuizResult;

public interface QuizResultService {

    QuizResult saveQuizResult(QuizResult quizResult);

    List<QuizResult> getAllResults();

    QuizResult getResultById(Long resultId);

    List<QuizResult> getResultsByStudent(Long studentId);

    List<QuizResult> getResultsByQuiz(Long quizId);

    void deleteResult(Long resultId);

}

