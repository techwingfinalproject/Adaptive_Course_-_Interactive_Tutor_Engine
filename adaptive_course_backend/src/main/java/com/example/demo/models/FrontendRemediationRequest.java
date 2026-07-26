package com.example.demo.models;
import java.util.Map;
public class FrontendRemediationRequest {
    private Long lessonId;
    private Map<String, Object> evaluationResults;
    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }
    public Map<String, Object> getEvaluationResults() { return evaluationResults; }
    public void setEvaluationResults(Map<String, Object> evaluationResults) { this.evaluationResults = evaluationResults; }
}

