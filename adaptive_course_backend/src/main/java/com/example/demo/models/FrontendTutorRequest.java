package com.example.demo.models;
import java.util.List;
import java.util.Map;
public class FrontendTutorRequest {
    private Long lessonId;
    private String studentQuestion;
    private List<Map<String, String>> chatHistory;
    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }
    public String getStudentQuestion() { return studentQuestion; }
    public void setStudentQuestion(String studentQuestion) { this.studentQuestion = studentQuestion; }
    public List<Map<String, String>> getChatHistory() { return chatHistory; }
    public void setChatHistory(List<Map<String, String>> chatHistory) { this.chatHistory = chatHistory; }
}

