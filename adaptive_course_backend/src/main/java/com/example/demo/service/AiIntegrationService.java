package com.example.demo.service;

import com.example.demo.models.*;
import java.util.Map;

public interface AiIntegrationService {
    TutorResponse getTutorResponse(FrontendTutorRequest request);
    Map<String, Object> generateQuiz(FrontendQuizRequest request);
    Map<String, Object> evaluateAnswers(EvaluateRequest request);
    Map<String, Object> generateStudyPlan(FrontendRemediationRequest request);
    Map<String, Object> getCourseRecommendation(FrontendAdaptiveLearningRequest request);
    TutorResponse getCourseSummary(FrontendTutorRequest request);
}

