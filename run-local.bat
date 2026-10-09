@echo off
cd /d "%~dp0"
echo Starting The Home Brew Bar at http://localhost:5500
where py >nul 2>&1
if %errorlevel%==0 (
    py -m http.server 5500
) else (
    python -m http.server 5500
)
pause
