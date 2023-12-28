/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\nconst playBtn = document.getElementById(\"play\");\nconst muteBtn = document.getElementById(\"mute\");\nconst time = document.getElementById(\"time\");\nconst volume = document.getElementById(\"volume\");\nconst handlePlayBtn = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n};\nconst handleMuteBtn = e => {};\nconst handlePause = e => {\n  playBtn.innerText = \"Play\";\n};\nconst handlePlay = e => {\n  playBtn.innerText = \"Pause\";\n};\nplayBtn.addEventListener(\"click\", handlePlayBtn);\nmuteBtn.addEventListener(\"click\", handleMuteBtn);\nvideo.addEventListener(\"pause\", handlePause);\nvideo.addEventListener(\"play\", handlePlay);\n\n//# sourceURL=webpack://youtube-clone-coding/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;