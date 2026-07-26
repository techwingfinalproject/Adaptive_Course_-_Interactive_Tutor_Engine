package com.example.demo.controller;

import com.example.demo.models.*;
import com.example.demo.service.AiIntegrationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final AiIntegrationService aiIntegrationService;

    
    public AiController(AiIntegrationService aiIntegrationService) {
        this.aiIntegrationService = aiIntegrationService;
    }

    @PostMapping("/chat")
    public ResponseEntity<TutorResponse> chat(@RequestBody FrontendTutorRequest request) {
        return ResponseEntity.ok(aiIntegrationService.getTutorResponse(request));
    }

    @PostMapping("/generate-quiz")
    public ResponseEntity<Map<String, Object>> generateQuiz(@RequestBody FrontendQuizRequest request) {
        return ResponseEntity.ok(aiIntegrationService.generateQuiz(request));
    }

    @PostMapping("/answer-evaluation")
    public ResponseEntity<Map<String, Object>> evaluateAnswers(@RequestBody EvaluateRequest request) {
        return ResponseEntity.ok(aiIntegrationService.evaluateAnswers(request));
    }

    @PostMapping("/study-plan")
    public ResponseEntity<Map<String, Object>> generateStudyPlan(@RequestBody FrontendRemediationRequest request) {
        return ResponseEntity.ok(aiIntegrationService.generateStudyPlan(request));
    }

    @PostMapping("/course-recommendation")
    public ResponseEntity<Map<String, Object>> getCourseRecommendation(@RequestBody FrontendAdaptiveLearningRequest request) {
        return ResponseEntity.ok(aiIntegrationService.getCourseRecommendation(request));
    }

    @PostMapping("/course-summary")
    public ResponseEntity<TutorResponse> getCourseSummary(@RequestBody FrontendTutorRequest request) {
        return ResponseEntity.ok(aiIntegrationService.getCourseSummary(request));
    }
}

