package com.example.demo.models;
public class TutorRequest {
    private String lessonTitle;
    private String lessonDescription;
    private String lessonNotes;
    private String studentQuestion;
    private String chatHistory;
    
    public String getLessonTitle() { return lessonTitle; }
    public void setLessonTitle(String lessonTitle) { this.lessonTitle = lessonTitle; }
    public String getLessonDescription() { return lessonDescription; }
    public void setLessonDescription(String lessonDescription) { this.lessonDescription = lessonDescription; }
    public String getLessonNotes() { return lessonNotes; }
    public void setLessonNotes(String lessonNotes) { this.lessonNotes = lessonNotes; }
    public String getStudentQuestion() { return studentQuestion; }
    public void setStudentQuestion(String studentQuestion) { this.studentQuestion = studentQuestion; }
    public String getChatHistory() { return chatHistory; }
    public void setChatHistory(String chatHistory) { this.chatHistory = chatHistory; }
}

