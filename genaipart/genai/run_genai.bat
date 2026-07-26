@echo off
set PYTHONPATH=..
echo Starting Adaptive Tutor GenAI Service on port 8000...
"%~dp0.venv\Scripts\python.exe" "%~dp0app.py"
