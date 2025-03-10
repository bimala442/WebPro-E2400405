@echo off
echo Installing dependencies...
echo.
cd /d "%~dp0"
npm install bcryptjs cors dotenv express jsonwebtoken mongodb mongoose --save
echo.
echo Installation complete!
echo.
pause 