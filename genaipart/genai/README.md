# 🎓 Adaptive Course & Interactive Tutor Engine — GenAI Module

A production-ready Python microservice powering adaptive learning features using **FastAPI**, **LangChain**, **LangGraph**, and **Google Gemini**.

---

## 📁 Project Structure

```
genai/
├── app.py                          # FastAPI application entry point
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment variable template
├── __init__.py
├── agents/
│   ├── __init__.py
│   ├── tutor_agent.py              # Lesson Q&A using Gemini
│   ├── quiz_agent.py               # Dynamic quiz generation
│   ├── evaluation_agent.py         # Answer grading & feedback
│   └── remediation_agent.py        # Study material for weak concepts
├── config/
│   ├── __init__.py
│   ├── settings.py                 # App configuration & env loading
│   └── prompts.py                  # All prompt templates
└── graph/
    ├── __init__.py
    └── tutor_graph.py              # LangGraph adaptive workflow
```

---

## 🛠️ Installation Guide

### Prerequisites

- **Python 3.11+** installed
- **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/apikey)

### Step 1: Create Virtual Environment

```bash
cd genai
python -m venv .venv
```

### Step 2: Activate Virtual Environment

**Windows (PowerShell):**
```powershell
.\.venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
.\.venv\Scripts\activate.bat
```

**Linux/macOS:**
```bash
source .venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

```bash
copy .env.example .env
```

Edit `.env` and set your Gemini API key:

```
GEMINI_API_KEY=AIzaSy_YOUR_ACTUAL_API_KEY_HERE
PORT=8000
HOST=0.0.0.0
```

### Step 5: Run the Server

```bash
# From the project root (parent of genai/)
cd ..
python -m uvicorn genai.app:app --host 0.0.0.0 --port 8000 --reload
```

Or directly:

```bash
# From inside genai/
python app.py
```

The server will start at: **http://localhost:8000**

Swagger UI docs at: **http://localhost:8000/docs**

---

## 🌐 REST API Documentation

### `GET /`
Health check endpoint.

**Response:**
```json
{
  "status": "online",
  "service": "Adaptive Tutor GenAI Module",
  "model": "gemini-1.5-flash"
}
```

---

### `POST /tutor`
Ask the AI tutor a question about a lesson.

**Request Body:**
```json
{
  "lesson_title": "Database Normalization",
  "lesson_description": "Learn 1NF, 2NF, 3NF and BCNF concepts.",
  "lesson_notes": "3NF requires no transitive dependencies.",
  "student_question": "What is a transitive dependency?",
  "chat_history": ""
}
```

**Response:**
```json
{
  "explanation": "A transitive dependency occurs when a non-key attribute depends on another non-key attribute..."
}
```

---

### `POST /quiz`
Generate a dynamic quiz from lesson content.

**Request Body:**
```json
{
  "lesson_title": "Database Normalization",
  "lesson_description": "Learn 1NF, 2NF, 3NF and BCNF concepts.",
  "lesson_notes": "3NF requires no transitive dependencies.",
  "difficulty": "Medium",
  "total_questions": 5,
  "question_format": "MCQ"
}
```

**Supported values:**
- `difficulty`: `Easy`, `Medium`, `Hard`
- `question_format`: `MCQ`, `Short Answer`

**Response:**
```json
{
  "title": "Database Normalization Quiz",
  "questions": [
    {
      "id": 1,
      "text": "Which normal form eliminates transitive dependency?",
      "type": "MCQ",
      "options": ["1NF", "2NF", "3NF", "BCNF"],
      "correctAnswer": "3NF"
    }
  ]
}
```

---

### `POST /evaluate`
Grade student answers and return evaluation results.

**Request Body:**
```json
{
  "quiz_questions": [
    {
      "id": 1,
      "text": "Which normal form eliminates transitive dependency?",
      "type": "MCQ",
      "options": ["1NF", "2NF", "3NF", "BCNF"],
      "correctAnswer": "3NF"
    }
  ],
  "student_answers": [
    {
      "questionId": 1,
      "answer": "2NF"
    }
  ]
}
```

**Response:**
```json
{
  "score": 0,
  "totalQuestions": 1,
  "correctCount": 0,
  "incorrectCount": 1,
  "evaluations": [
    {
      "questionId": 1,
      "text": "Which normal form eliminates transitive dependency?",
      "studentAnswer": "2NF",
      "correctAnswer": "3NF",
      "isCorrect": false,
      "explanation": "2NF deals with partial dependencies, not transitive ones..."
    }
  ],
  "weakConcepts": [
    {
      "conceptName": "Third Normal Form",
      "reason": "Student confused partial and transitive dependency elimination."
    }
  ],
  "feedback": "You need to review the differences between 2NF and 3NF..."
}
```

---

### `POST /remediation`
Generate targeted study materials for failed students.

**Request Body:**
```json
{
  "lesson_title": "Database Normalization",
  "lesson_notes": "3NF requires no transitive dependencies.",
  "evaluation_results": {
    "score": 40,
    "weakConcepts": [
      {
        "conceptName": "Third Normal Form",
        "reason": "Student confused partial and transitive dependency."
      }
    ],
    "evaluations": []
  }
}
```

**Response:**
```json
{
  "simplifiedExplanation": "Think of 3NF like a chain...",
  "studyNotes": [
    "In 3NF, every non-key column must depend ONLY on the primary key.",
    "If A → B and B → C, then A → C is a transitive dependency (violates 3NF)."
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "text": "Given A → B and B → C, which normal form is violated?",
      "options": ["1NF", "2NF", "3NF", "4NF"],
      "correctAnswerIndex": 2,
      "explanation": "This is a transitive dependency, which 3NF eliminates."
    }
  ],
  "suggestions": [
    "Review the difference between partial and transitive dependencies.",
    "Practice decomposing relations into 3NF."
  ],
  "recommendedTopicsToRevise": [
    "Functional Dependencies",
    "Third Normal Form",
    "Transitive Dependencies"
  ]
}
```

---

### `POST /adaptive-learning`
Run the complete LangGraph adaptive workflow.

**Request Body:**
```json
{
  "lesson_title": "Database Normalization",
  "lesson_description": "Learn 1NF, 2NF, 3NF and BCNF concepts.",
  "lesson_notes": "3NF requires no transitive dependencies.",
  "difficulty": "Medium",
  "total_questions": 5,
  "question_format": "MCQ",
  "student_answers": [
    {"questionId": 1, "answer": "2NF"},
    {"questionId": 2, "answer": "3NF"}
  ]
}
```

**Response:** Full workflow state including quiz, evaluation, and (if failed) remediation.

---

## 🔄 LangGraph Adaptive Workflow

```
Student Opens Lesson
        ↓
   Tutor Agent (Welcome / Q&A)
        ↓
   Quiz Agent (Generates Quiz)
        ↓
   Student Answers Quiz
        ↓
   Evaluation Agent (Grades Quiz)
        ↓
     Pass (≥70%)?
    /          \
  YES           NO
   ↓             ↓
 Finish    Remediation Agent
               ↓
         Study Notes + Practice Quiz
               ↓
          Student Retries
```

---

## 🔗 Spring Boot Backend Integration Guide

### Architecture Overview

```
┌─────────────┐         REST API          ┌──────────────┐
│   Angular    │ ◄─────────────────────►   │  Spring Boot  │
│  Frontend    │                           │   Backend     │
└─────────────┘                           └──────┬───────┘
                                                  │
                                            REST API calls
                                                  │
                                          ┌───────▼───────┐
                                          │  Python GenAI  │
                                          │   (FastAPI)    │
                                          └───────────────┘
```

### Integration Steps

#### 1. Add RestTemplate or WebClient Bean

In your Spring Boot `@Configuration` class:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

#### 2. Create a GenAI Service in Spring Boot

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class GenAIService {

    private final RestTemplate restTemplate;

    @Value("${genai.service.url:http://localhost:8000}")
    private String genaiBaseUrl;

    public GenAIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String askTutor(String lessonTitle, String lessonDescription,
                           String lessonNotes, String studentQuestion,
                           String chatHistory) {
        String url = genaiBaseUrl + "/tutor";
        Map<String, Object> request = new HashMap<>();
        request.put("lesson_title", lessonTitle);
        request.put("lesson_description", lessonDescription);
        request.put("lesson_notes", lessonNotes);
        request.put("student_question", studentQuestion);
        request.put("chat_history", chatHistory != null ? chatHistory : "");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            url, HttpMethod.POST, entity, Map.class);
        return (String) response.getBody().get("explanation");
    }

    public Map<String, Object> generateQuiz(String lessonTitle,
                                            String lessonDescription,
                                            String lessonNotes,
                                            String difficulty,
                                            int totalQuestions,
                                            String questionFormat) {
        String url = genaiBaseUrl + "/quiz";
        Map<String, Object> request = new HashMap<>();
        request.put("lesson_title", lessonTitle);
        request.put("lesson_description", lessonDescription);
        request.put("lesson_notes", lessonNotes);
        request.put("difficulty", difficulty);
        request.put("total_questions", totalQuestions);
        request.put("question_format", questionFormat);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            url, HttpMethod.POST, entity, Map.class);
        return response.getBody();
    }

    public Map<String, Object> evaluateQuiz(List<Map<String, Object>> quizQuestions,
                                            List<Map<String, Object>> studentAnswers) {
        String url = genaiBaseUrl + "/evaluate";
        Map<String, Object> request = new HashMap<>();
        request.put("quiz_questions", quizQuestions);
        request.put("student_answers", studentAnswers);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            url, HttpMethod.POST, entity, Map.class);
        return response.getBody();
    }

    public Map<String, Object> getRemediation(String lessonTitle,
                                               String lessonNotes,
                                               Map<String, Object> evaluationResults) {
        String url = genaiBaseUrl + "/remediation";
        Map<String, Object> request = new HashMap<>();
        request.put("lesson_title", lessonTitle);
        request.put("lesson_notes", lessonNotes);
        request.put("evaluation_results", evaluationResults);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            url, HttpMethod.POST, entity, Map.class);
        return response.getBody();
    }

    public Map<String, Object> runAdaptiveWorkflow(Map<String, Object> workflowRequest) {
        String url = genaiBaseUrl + "/adaptive-learning";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(workflowRequest, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            url, HttpMethod.POST, entity, Map.class);
        return response.getBody();
    }
}
```

#### 3. Add Configuration Property

In `application.properties`:
```properties
genai.service.url=http://localhost:8000
```

#### 4. Use in Existing Controllers

Inject `GenAIService` into your existing Spring Boot controllers:

```java
@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final GenAIService genAIService;

    public AIController(GenAIService genAIService) {
        this.genAIService = genAIService;
    }

    @PostMapping("/tutor")
    public ResponseEntity<?> askTutor(@RequestBody Map<String, String> request) {
        String explanation = genAIService.askTutor(
            request.get("lessonTitle"),
            request.get("lessonDescription"),
            request.get("lessonNotes"),
            request.get("studentQuestion"),
            request.getOrDefault("chatHistory", "")
        );
        return ResponseEntity.ok(Map.of("explanation", explanation));
    }

    // Similar endpoints for /quiz, /evaluate, /remediation, /adaptive-learning
}
```

---

## ⚠️ Error Handling

The GenAI module handles:
- **Invalid Input**: Returns `422 Unprocessable Entity` with validation errors
- **Gemini API Failures**: Returns `500 Internal Server Error` with descriptive message
- **Missing API Key**: Returns `500` with `"GEMINI_API_KEY is not configured"`
- **Timeout Errors**: Handled via LangChain's built-in retry mechanisms

---

## 🧪 Testing

### Quick Test via Swagger UI

1. Start the server: `python -m uvicorn genai.app:app --reload`
2. Open: http://localhost:8000/docs
3. Try any endpoint using the interactive Swagger UI

### Quick Test via curl

```bash
curl -X POST http://localhost:8000/tutor \
  -H "Content-Type: application/json" \
  -d '{
    "lesson_title": "Database Normalization",
    "lesson_description": "Learn about 1NF, 2NF, 3NF",
    "lesson_notes": "3NF eliminates transitive dependencies",
    "student_question": "What is a transitive dependency?"
  }'
```

---

## 📋 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | - | Google Gemini API key |
| `HOST` | No | `0.0.0.0` | Server bind address |
| `PORT` | No | `8000` | Server port |
| `GEMINI_MODEL_NAME` | No | `gemini-1.5-flash` | Gemini model to use |

---

## 📄 License

This module is part of the Adaptive Course & Interactive Tutor Engine project.
# finalllproject
