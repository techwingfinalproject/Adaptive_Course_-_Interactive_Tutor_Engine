package com.example.demo.models;
public class FrontendQuizRequest {
    private Long lessonId;
    private String difficulty;
    private Integer totalQuestions;
    private String questionFormat;
    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    public String getQuestionFormat() { return questionFormat; }
    public void setQuestionFormat(String questionFormat) { this.questionFormat = questionFormat; }
}

