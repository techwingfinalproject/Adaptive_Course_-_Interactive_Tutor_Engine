package com.example.demo.service.serviceimple;

import com.example.demo.exception.ResourceNotFoundException;

 



import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.QuizResult;
import com.example.demo.repository.QuizResultRepository;
import com.example.demo.service.QuizResultService;
@Service
public class QuizResultServiceImpl implements QuizResultService {

    private final QuizResultRepository quizResultRepository;

    public QuizResultServiceImpl(QuizResultRepository quizResultRepository) {
        this.quizResultRepository = quizResultRepository;
    }

    @Override
    public QuizResult saveQuizResult(QuizResult quizResult) {
        return quizResultRepository.save(quizResult);
    }

    @Override
    public List<QuizResult> getAllResults() {
        return quizResultRepository.findAll();
    }

    @Override
    public QuizResult getResultById(Long resultId) {

        return quizResultRepository.findById(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz Result not found."));
    }

    @Override
    public List<QuizResult> getResultsByStudent(Long studentId) {
        return quizResultRepository.findByStudentStudentId(studentId);
    }

    @Override
    public List<QuizResult> getResultsByQuiz(Long quizId) {
        return quizResultRepository.findByQuizQuizId(quizId);
    }

    @Override
    public void deleteResult(Long resultId) {

        QuizResult result = quizResultRepository.findById(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz Result not found."));

        quizResultRepository.delete(result);
    }
}


