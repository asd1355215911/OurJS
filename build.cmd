@echo off
set ourjs=..\our.js
cd src
echo /*!>%ourjs%
echo. * OurJS>>%ourjs%
echo. *  Released under the MIT License.>>%ourjs%
echo. *  Version: %date:~0,4%%date:~5,2%%date:~8,2%>>%ourjs%
echo. */>>%ourjs%
copy/y/b %ourjs% + lang.js + browser.js + dom.js + features.js + animation.js + request.js + widget.js + integrated\json2.js + integrated\sizzle.js %ourjs%
set yuicompressor_path=D:\SkyDrive\ProgramFiles\JSFileCompressor\yuicompressor-2.4.7\build
java -jar %yuicompressor_path%\yuicompressor-2.4.7.jar %ourjs% -o %ourjs% --charset UTF-8
pause
