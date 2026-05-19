@echo off
echo Starting Laravel Backend and React Frontend...

REM Start Laravel backend
echo Starting Laravel backend on port 8000...
start "Laravel Backend" cmd /k "cd BackEnd_Laravel && php artisan serve"

REM Wait a moment for Laravel to start
timeout /t 3 /nobreak > nul

REM Start React frontend
echo Starting React frontend on port 3000...
start "React Frontend" cmd /k "cd react-loc && npm start"

echo Both servers are starting...
echo Laravel Backend: http://127.0.0.1:8000
echo React Frontend: http://localhost:3000
echo API Test Page: http://localhost:3000/api-test
pause