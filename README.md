# Adaptive Course Platform

An integrated AI-powered educational platform featuring adaptive learning, interactive tutoring, dynamic quiz generation, and student evaluation.

## Project Structure (Monorepo)

This repository is organized into three core components:

* **[`adaptive_course_front_end/`](./adaptive_course_front_end)**: The user interface built with Angular and TypeScript. Handles student registration, course navigation, quiz taking, and interactive chat with the AI tutor.
* **[`adaptive_course_backend/`](./adaptive_course_backend)**: The core REST API service built with Java and Spring Boot. Manages authentication (JWT), student/course data persistence, and proxies AI requests to the GenAI microservice.
* **[`genaipart/`](./genaipart)**: The GenAI microservice powered by Python, FastAPI, LangChain, and LangGraph. Contains specialized AI agents for:
  * **Tutor Agent**: Interactive programming tutor answering student questions with lesson context.
  * **Quiz Agent**: Dynamic quiz generation based on lesson contents and difficulty levels.
  * **Evaluation Agent**: Automated grading and concept remediation analysis.
  * **Remediation & Adaptive Learning Graphs**: Stateful workflows guiding students through weak concepts.

## Getting Started

### 1. Start the GenAI Service (Port 8000)
Navigate to `genaipart/genai` and run the startup script:
```powershell
# Windows PowerShell / Command Prompt
cd genaipart/genai
.\run_genai.bat   # Or .\run_genai.ps1 in PowerShell
```

### 2. Start the Spring Boot Backend (Port 8080)
Open `adaptive_course_backend` in your IDE (Eclipse / Spring Tool Suite / IntelliJ) or run via Maven:
```powershell
cd adaptive_course_backend
.\mvnw spring-boot:run
```

### 3. Start the Angular Frontend (Port 4200)
Install dependencies and launch the dev server:
```powershell
cd adaptive_course_front_end
npm install
npm start
```

Access the web application at **http://localhost:4200/**.
