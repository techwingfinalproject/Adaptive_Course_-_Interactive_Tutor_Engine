package com.example.demo.models;
import java.util.Map;
public class RemediationRequest {
    private String lessonTitle;
    private String lessonNotes;
    private Map<String, Object> evaluationResults;
    public String getLessonTitle() { return lessonTitle; }
    public void setLessonTitle(String lessonTitle) { this.lessonTitle = lessonTitle; }
    public String getLessonNotes() { return lessonNotes; }
    public void setLessonNotes(String lessonNotes) { this.lessonNotes = lessonNotes; }
    public Map<String, Object> getEvaluationResults() { return evaluationResults; }
    public void setEvaluationResults(Map<String, Object> evaluationResults) { this.evaluationResults = evaluationResults; }
}

