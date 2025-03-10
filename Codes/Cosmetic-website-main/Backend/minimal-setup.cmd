@echo off
echo ******************************************
echo Minimal Express Server Setup
echo ******************************************
echo.

rem Navigate to the batch file directory
cd /d "%~dp0"

echo Installing only Express...
call npm install express --save

echo.
echo ******************************************
echo Express installation complete!
echo Now run: npm run basic
echo ******************************************
echo.
pause 