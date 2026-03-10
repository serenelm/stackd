@echo off
REM stackd - Quick Setup Script for Windows

echo.
echo ========================================
echo   stackd - Wealth Wellness Dashboard
echo   Quick Setup
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Error installing backend dependencies
    exit /b 1
)
cd ..

echo [2/4] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Error installing frontend dependencies
    exit /b 1
)
cd ..

echo.
echo ========================================
echo   Setup Complete! 
echo ========================================
echo.
echo Next steps:
echo.
echo Open TWO terminal windows:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Dashboard will open at http://localhost:3000
echo.
