package com.example.demo.models;
import java.util.Map;
public class EvaluateRequest {
    private Long quizId;
    private Map<String, Object> studentAnswers;
    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }
    public Map<String, Object> getStudentAnswers() { return studentAnswers; }
    public void setStudentAnswers(Map<String, Object> studentAnswers) { this.studentAnswers = studentAnswers; }
}

