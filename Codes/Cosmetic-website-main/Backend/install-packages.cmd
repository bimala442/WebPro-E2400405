@echo off
echo ******************************************
echo Installing backend dependencies...
echo ******************************************
echo.

rem Navigate to the batch file directory
cd /d "%~dp0"

echo Installing express...
call npm install express --save

echo Installing mongoose...
call npm install mongoose --save

echo Installing cors...
call npm install cors --save

echo Installing dotenv...
call npm install dotenv --save

echo Installing jsonwebtoken...
call npm install jsonwebtoken --save

echo Installing bcryptjs...
call npm install bcryptjs --save

echo Installing nodemon...
call npm install nodemon --save-dev

echo.
echo ******************************************
echo Installation complete!
echo.
echo Now you can run: npm run dev
echo ******************************************
echo.
pause 