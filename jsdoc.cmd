@echo off
set jsdoc_path=D:\ProgramFiles\JSDocToolkit
java -jar %jsdoc_path%\jsrun.jar %jsdoc_path%\app\run.js src src\integrated src\components src\widgets -s -n -d=scripts -t=scripts
pause
