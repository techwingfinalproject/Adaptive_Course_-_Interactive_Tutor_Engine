package com.example.demo.models;
public class QuizRequest {
    private String lessonTitle;
    private String lessonDescription;
    private String lessonNotes;
    private String difficulty;
    private Integer totalQuestions;
    private String questionFormat;
    public String getLessonTitle() { return lessonTitle; }
    public void setLessonTitle(String lessonTitle) { this.lessonTitle = lessonTitle; }
    public String getLessonDescription() { return lessonDescription; }
    public void setLessonDescription(String lessonDescription) { this.lessonDescription = lessonDescription; }
    public String getLessonNotes() { return lessonNotes; }
    public void setLessonNotes(String lessonNotes) { this.lessonNotes = lessonNotes; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    public String getQuestionFormat() { return questionFormat; }
    public void setQuestionFormat(String questionFormat) { this.questionFormat = questionFormat; }
}

