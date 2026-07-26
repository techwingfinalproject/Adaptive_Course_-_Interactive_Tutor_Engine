import json
import os

collection = {
    "info": {
        "name": "Adaptive Course API Complete",
        "description": "Complete API collection for the Adaptive Course application.",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "variable": [
        {"key": "base_url", "value": "http://localhost:8081", "type": "string"},
        {"key": "token", "value": "YOUR_JWT_TOKEN", "type": "string"}
    ],
    "item": []
}

def create_request(name, method, url_path, body=None, use_token=True):
    req = {
        "name": name,
        "request": {
            "method": method,
            "header": [],
            "url": {
                "raw": "{{base_url}}" + url_path,
                "host": ["{{base_url}}"],
                "path": [p for p in url_path.split("/") if p]
            }
        },
        "response": []
    }
    if use_token:
        req["request"]["header"].append({"key": "Authorization", "value": "Bearer {{token}}", "type": "text"})
    
    if body:
        req["request"]["header"].append({"key": "Content-Type", "value": "application/json", "type": "text"})
        req["request"]["body"] = {
            "mode": "raw",
            "raw": json.dumps(body, indent=4),
            "options": {"raw": {"language": "json"}}
        }
    return req

# 1. Auth
auth_folder = {"name": "Auth", "item": []}
auth_folder["item"].append(create_request("Register Student", "POST", "/api/students/register", {"fullName": "John Doe", "email": "student@example.com", "password": "password123", "phone": "1234567890"}, False))
auth_folder["item"].append(create_request("Register Teacher", "POST", "/api/teachers/register", {"fullName": "Jane Smith", "email": "teacher@example.com", "password": "password123", "bio": "Math Teacher", "qualification": "PhD in Math"}, False))
auth_folder["item"].append(create_request("Login", "POST", "/api/auth/login", {"email": "student@example.com", "password": "password123"}, False))
collection["item"].append(auth_folder)

# 2. Student
API_STUDENT_ID = "/api/students/1"
student_folder = {"name": "Student", "item": []}
student_folder["item"].append(create_request("Get All Students", "GET", "/api/students"))
student_folder["item"].append(create_request("Get Student by ID", "GET", API_STUDENT_ID))
student_folder["item"].append(create_request("Update Student", "PUT", API_STUDENT_ID, {"fullName": "John Updated", "phone": "0987654321"}))
student_folder["item"].append(create_request("Delete Student", "DELETE", API_STUDENT_ID))
collection["item"].append(student_folder)

# 3. Teacher
API_TEACHER_ID = "/api/teachers/1"
teacher_folder = {"name": "Teacher", "item": []}
teacher_folder["item"].append(create_request("Get All Teachers", "GET", "/api/teachers"))
teacher_folder["item"].append(create_request("Get Teacher by ID", "GET", API_TEACHER_ID))
teacher_folder["item"].append(create_request("Update Teacher", "PUT", API_TEACHER_ID, {"fullName": "Jane Updated", "bio": "Senior Math Teacher", "qualification": "PhD"}))
teacher_folder["item"].append(create_request("Delete Teacher", "DELETE", API_TEACHER_ID))
collection["item"].append(teacher_folder)

# 4. Course
API_COURSE_ID = "/api/courses/1"
course_folder = {"name": "Course", "item": []}
course_folder["item"].append(create_request("Add Course (Teacher)", "POST", "/api/courses", {"courseCode": "CS101", "courseName": "Intro to CS", "description": "Learn programming", "category": "Computer Science", "difficultyLevel": "Beginner"}))
course_folder["item"].append(create_request("Get All Courses", "GET", "/api/courses"))
course_folder["item"].append(create_request("Get Course by ID", "GET", API_COURSE_ID))
course_folder["item"].append(create_request("Get Courses by Teacher", "GET", "/api/courses/teacher/1"))
course_folder["item"].append(create_request("Update Course (Teacher)", "PUT", API_COURSE_ID, {"courseCode": "CS101", "courseName": "Intro to CS Updated", "description": "Updated", "category": "CS", "difficultyLevel": "Intermediate"}))
course_folder["item"].append(create_request("Delete Course (Teacher)", "DELETE", API_COURSE_ID))
collection["item"].append(course_folder)

# 5. Lesson
API_LESSON_ID = "/api/lessons/1"
lesson_folder = {"name": "Lesson", "item": []}
lesson_folder["item"].append(create_request("Add Lesson (Teacher)", "POST", "/api/lessons", {"lessonTitle": "Variables", "lessonContent": "Learn about variables", "videoUrl": "http://example.com/video1", "lessonOrder": 1, "courseId": 1}))
lesson_folder["item"].append(create_request("Get Lessons by Course", "GET", "/api/lessons/course/1"))
lesson_folder["item"].append(create_request("Update Lesson (Teacher)", "PUT", API_LESSON_ID, {"lessonTitle": "Variables updated", "lessonContent": "content updated", "videoUrl": "http://example.com/video2", "lessonOrder": 1, "courseId": 1}))
lesson_folder["item"].append(create_request("Delete Lesson (Teacher)", "DELETE", API_LESSON_ID))
collection["item"].append(lesson_folder)

# 6. Quiz
API_QUIZ_ID = "/api/quizzes/1"
quiz_folder = {"name": "Quiz", "item": []}
quiz_folder["item"].append(create_request("Add Quiz (Teacher)", "POST", "/api/quizzes", {"question": "What is 2+2?", "optionA": "3", "optionB": "4", "optionC": "5", "optionD": "6", "correctAnswer": "B", "marks": 5, "lessonId": 1}))
quiz_folder["item"].append(create_request("Get Quizzes by Lesson", "GET", "/api/quizzes/lesson/1"))
quiz_folder["item"].append(create_request("Submit Quiz (Student)", "POST", "/api/quizzes/1/submit", {"answer": "B"}))
quiz_folder["item"].append(create_request("Update Quiz (Teacher)", "PUT", API_QUIZ_ID, {"question": "What is 3+3?", "optionA": "5", "optionB": "6", "optionC": "7", "optionD": "8", "correctAnswer": "B", "marks": 5, "lessonId": 1}))
quiz_folder["item"].append(create_request("Delete Quiz (Teacher)", "DELETE", API_QUIZ_ID))
collection["item"].append(quiz_folder)

# 7. Quiz Result
API_RESULT_ID = "/api/results/1"
result_folder = {"name": "Quiz Result", "item": []}
result_folder["item"].append(create_request("Save Result", "POST", "/api/results", {"student": {"studentId": 1}, "quiz": {"quizId": 1}, "selectedAnswer": "B", "score": 5, "passed": True}))
result_folder["item"].append(create_request("Get All Results", "GET", "/api/results"))
result_folder["item"].append(create_request("Get Result by ID", "GET", API_RESULT_ID))
result_folder["item"].append(create_request("Get Results by Student", "GET", "/api/results/student/1"))
result_folder["item"].append(create_request("Get Results by Quiz", "GET", "/api/results/quiz/1"))
result_folder["item"].append(create_request("Delete Result", "DELETE", API_RESULT_ID))
collection["item"].append(result_folder)

# 8. Enrollment
enrollment_folder = {"name": "Enrollment", "item": []}
enrollment_folder["item"].append(create_request("Enroll Student (Student)", "POST", "/api/enrollments", {"studentId": 1, "courseId": 1, "status": "ACTIVE"}))
enrollment_folder["item"].append(create_request("Get Enrollments by Student", "GET", "/api/enrollments/student/1"))
enrollment_folder["item"].append(create_request("Get Enrollments by Course", "GET", "/api/enrollments/course/1"))
enrollment_folder["item"].append(create_request("Delete Enrollment", "DELETE", "/api/enrollments/1"))
collection["item"].append(enrollment_folder)

# 9. Study Material
API_MATERIAL_ID = "/api/materials/1"
material_folder = {"name": "Study Material", "item": []}
material_folder["item"].append(create_request("Add Material", "POST", "/api/materials", {"title": "Lecture Notes", "description": "Notes for first lecture", "materialType": "PDF", "fileUrl": "http://example.com/notes.pdf", "course": {"courseId": 1}, "lesson": {"lessonId": 1}, "teacher": {"teacherId": 1}}))
material_folder["item"].append(create_request("Get All Materials", "GET", "/api/materials"))
material_folder["item"].append(create_request("Get Material by ID", "GET", API_MATERIAL_ID))
material_folder["item"].append(create_request("Get Materials by Course", "GET", "/api/materials/course/1"))
material_folder["item"].append(create_request("Get Materials by Lesson", "GET", "/api/materials/lesson/1"))
material_folder["item"].append(create_request("Update Material", "PUT", API_MATERIAL_ID, {"title": "Updated Notes", "description": "Updated", "materialType": "PDF", "fileUrl": "http://example.com/notes2.pdf", "course": {"courseId": 1}, "lesson": {"lessonId": 1}, "teacher": {"teacherId": 1}}))
material_folder["item"].append(create_request("Delete Material", "DELETE", API_MATERIAL_ID))
collection["item"].append(material_folder)

# 10. Notification
API_NOTIFICATION_ID = "/api/notifications/1"
notification_folder = {"name": "Notification", "item": []}
notification_folder["item"].append(create_request("Create Notification", "POST", "/api/notifications", {"title": "Welcome", "message": "Welcome to the course", "type": "INFO", "teacher": {"teacherId": 1}, "student": {"studentId": 1}}))
notification_folder["item"].append(create_request("Get All Notifications", "GET", "/api/notifications"))
notification_folder["item"].append(create_request("Get Notification by ID", "GET", API_NOTIFICATION_ID))
notification_folder["item"].append(create_request("Get Notifications by Student", "GET", "/api/notifications/student/1"))
notification_folder["item"].append(create_request("Get Notifications by Teacher", "GET", "/api/notifications/teacher/1"))
notification_folder["item"].append(create_request("Update Notification", "PUT", API_NOTIFICATION_ID, {"title": "Welcome", "message": "Welcome to the course updated", "type": "INFO", "teacher": {"teacherId": 1}, "student": {"studentId": 1}}))
notification_folder["item"].append(create_request("Delete Notification", "DELETE", API_NOTIFICATION_ID))
collection["item"].append(notification_folder)

# 11. Student Progress
API_PROGRESS_ID = "/api/progress/1"
progress_folder = {"name": "Student Progress", "item": []}
progress_folder["item"].append(create_request("Save Progress", "POST", "/api/progress", {"student": {"studentId": 1}, "course": {"courseId": 1}, "completedLessons": 2, "totalLessons": 10, "progressPercentage": 20.0, "lastAccessedLesson": "Variables", "status": "IN_PROGRESS"}))
progress_folder["item"].append(create_request("Get All Progress", "GET", "/api/progress"))
progress_folder["item"].append(create_request("Get Progress by ID", "GET", API_PROGRESS_ID))
progress_folder["item"].append(create_request("Get Progress by Student", "GET", "/api/progress/student/1"))
progress_folder["item"].append(create_request("Get Progress by Course", "GET", "/api/progress/course/1"))
progress_folder["item"].append(create_request("Delete Progress", "DELETE", API_PROGRESS_ID))
collection["item"].append(progress_folder)

filepath = r"c:\Users\Hp\Documents\workspace-spring-tools-for-eclipse-5.2.0.RELEASE\adaptive_course_backend\Adaptive_Course_API.postman_collection.json"
with open(filepath, "w") as f:
    json.dump(collection, f, indent=4)

print("Collection created.")
