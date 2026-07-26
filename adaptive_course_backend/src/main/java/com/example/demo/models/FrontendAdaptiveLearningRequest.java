package com.example.demo.models;
import java.util.Map;
public class FrontendAdaptiveLearningRequest {
    private Long lessonId;
    private String difficulty;
    private Integer totalQuestions;
    private String questionFormat;
    private Map<String, Object> studentAnswers;
    private String message;
    private Map<String, Object> quiz;
    private Map<String, Object> evaluation;
    private Boolean passed;
    private Integer retryCount;
    private Map<String, Object> remediation;

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    public String getQuestionFormat() { return questionFormat; }
    public void setQuestionFormat(String questionFormat) { this.questionFormat = questionFormat; }
    public Map<String, Object> getStudentAnswers() { return studentAnswers; }
    public void setStudentAnswers(Map<String, Object> studentAnswers) { this.studentAnswers = studentAnswers; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Map<String, Object> getQuiz() { return quiz; }
    public void setQuiz(Map<String, Object> quiz) { this.quiz = quiz; }
    public Map<String, Object> getEvaluation() { return evaluation; }
    public void setEvaluation(Map<String, Object> evaluation) { this.evaluation = evaluation; }
    public Boolean getPassed() { return passed; }
    public void setPassed(Boolean passed) { this.passed = passed; }
    public Integer getRetryCount() { return retryCount; }
    public void setRetryCount(Integer retryCount) { this.retryCount = retryCount; }
    public Map<String, Object> getRemediation() { return remediation; }
    public void setRemediation(Map<String, Object> remediation) { this.remediation = remediation; }
}

