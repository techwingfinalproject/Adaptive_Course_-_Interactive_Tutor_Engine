$ErrorActionPreference = "Stop"
$baseUrl = "http://localhost:8081/api"
$randomId = Get-Random

$studentEmail = "student$randomId@test.com"
$teacherEmail = "teacher$randomId@test.com"
$password = "password123"

Write-Output "=== Registering Student ==="
$studentBody = @{
    fullName = "Test Student"
    email = $studentEmail
    password = $password
    phone = "1234567890"
    batch = "2023"
    role = "STUDENT"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$baseUrl/students/register" -Method Post -Body $studentBody -ContentType "application/json" | Out-Null
    Write-Output "Student registered successfully."
} catch {
    Write-Output "Failed to register student: $($_.Exception.Message)"
}

Write-Output "`n=== Registering Teacher ==="
$teacherBody = @{
    fullName = "Test Teacher"
    email = $teacherEmail
    password = $password
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$baseUrl/teachers" -Method Post -Body $teacherBody -ContentType "application/json" | Out-Null
    Write-Output "Teacher registered successfully."
} catch {
    Write-Output "Failed to register teacher: $($_.Exception.Message)"
}

Write-Output "`n=== Logging in as Student ==="
$studentLogin = @{
    email = $studentEmail
    password = $password
} | ConvertTo-Json

$studentToken = ""
try {
    $res = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -Body $studentLogin -ContentType "application/json"
    $studentToken = $res.token
    Write-Output "Student logged in. Token length: $($studentToken.Length)"
} catch {
    Write-Output "Failed to login student: $($_.Exception.Message)"
}

Write-Output "`n=== Logging in as Teacher ==="
$teacherLogin = @{
    email = $teacherEmail
    password = $password
} | ConvertTo-Json

$teacherToken = ""
try {
    $res = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -Body $teacherLogin -ContentType "application/json"
    $teacherToken = $res.token
    Write-Output "Teacher logged in. Token length: $($teacherToken.Length)"
} catch {
    Write-Output "Failed to login teacher: $($_.Exception.Message)"
}

Write-Output "`n=== Testing Role-Based Access ==="

Write-Output "`n--- 1. Accessing Student-only endpoint (/api/students) ---"
try {
    $res = Invoke-RestMethod -Uri "$baseUrl/students" -Method Get -Headers @{Authorization="Bearer $studentToken"}
    Write-Output "STUDENT accessing /api/students: SUCCESS (Expected)"
} catch {
    Write-Output "STUDENT accessing /api/students: FAILED (Unexpected) - $($_.Exception.Response.StatusCode)"
}

try {
    $res = Invoke-RestMethod -Uri "$baseUrl/students" -Method Get -Headers @{Authorization="Bearer $teacherToken"}
    Write-Output "TEACHER accessing /api/students: SUCCESS (Unexpected)"
} catch {
    Write-Output "TEACHER accessing /api/students: FAILED (Expected) - $($_.Exception.Response.StatusCode)"
}

Write-Output "`n--- 2. Accessing Teacher-only endpoint (/api/teachers/dashboard) ---"
try {
    $res = Invoke-RestMethod -Uri "$baseUrl/teachers/dashboard" -Method Get -Headers @{Authorization="Bearer $studentToken"}
    Write-Output "STUDENT accessing /api/teachers/dashboard: SUCCESS (Unexpected)"
} catch {
    Write-Output "STUDENT accessing /api/teachers/dashboard: FAILED (Expected) - $($_.Exception.Response.StatusCode)"
}

try {
    $res = Invoke-RestMethod -Uri "$baseUrl/teachers/dashboard" -Method Get -Headers @{Authorization="Bearer $teacherToken"}
    Write-Output "TEACHER accessing /api/teachers/dashboard: SUCCESS (Expected)"
} catch {
    Write-Output "TEACHER accessing /api/teachers/dashboard: FAILED (Unexpected) - $($_.Exception.Response.StatusCode)"
}
