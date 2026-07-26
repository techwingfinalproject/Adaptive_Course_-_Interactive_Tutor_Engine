$env:PYTHONPATH = ".."
Write-Host "Starting Adaptive Tutor GenAI Service on port 8000..." -ForegroundColor Cyan
& "$PSScriptRoot\.venv\Scripts\python.exe" "$PSScriptRoot\app.py"
