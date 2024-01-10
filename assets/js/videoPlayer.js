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

eval("const videoContainer = document.getElementById(\"videoContainer\");\nconst video = document.querySelector(\"video\");\nconst videoControls = document.getElementById(\"videoControls\");\nconst playBtn = document.getElementById(\"play\");\nconst muteBtn = document.getElementById(\"mute\");\nconst currentTime = document.getElementById(\"currentTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst volumeRange = document.getElementById(\"volume\");\nconst timeline = document.getElementById(\"timeline\");\nconst fullScreenBtn = document.getElementById(\"fullScreen\");\nconst textarea = document.getElementById(\"commentInput\");\nlet controlsTimeout = null;\nlet controlsMovementTimeout = null;\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\nconst handlePlayClick = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n  playBtn.innerText = video.paused ? \"play_arrow\" : \"pause\";\n};\nconst handleMuteClick = e => {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n  muteBtn.innerText = video.muted ? \"volume_off\" : \"volume_up\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\nconst handleVolumeChange = e => {\n  const {\n    target: {\n      value\n    }\n  } = e;\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"volume_off\";\n  }\n  volumeValue = value;\n  video.volume = value;\n};\nconst formatTime = seconds => {\n  return new Date(seconds * 1000).toISOString().substring(11, 19);\n};\nconst handleVideoMeta = () => {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\nconst handleVideoTime = () => {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\nconst handleVideoEnded = () => {\n  const {\n    id\n  } = videoContainer.dataset;\n  fetch(`/api/videos/${id}/view`, {\n    method: \"POST\"\n  }); // fetch-> GET 요청을 보내는 것. POST 설정 필요\n};\n\nconst hideControls = () => videoControls.classList.remove(\"showing\");\nconst handleVideoMove = () => {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n  videoControls.classList.add(\"showing\");\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\nconst handleVideoLeave = () => hideControls();\nconst handleTimeChange = e => {\n  const {\n    target: {\n      value\n    }\n  } = e;\n  video.currentTime = value;\n};\nconst handleFullScreen = () => {\n  const fullScreen = document.fullscreenElement;\n  if (fullScreen) {\n    document.exitFullscreen();\n    fullScreenBtn.innerText = \"fullscreen\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenBtn.innerText = \"fullscreen_exit\";\n  }\n};\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"click\", handlePlayClick);\nvideo.addEventListener(\"loadedmetadata\", handleVideoMeta);\nvideo.addEventListener(\"timeupdate\", handleVideoTime);\nvideo.addEventListener(\"ended\", handleVideoEnded);\nvideoContainer.addEventListener(\"mousemove\", handleVideoMove);\nvideoContainer.addEventListener(\"mouseleave\", handleVideoLeave);\ntimeline.addEventListener(\"input\", handleTimeChange);\nfullScreenBtn.addEventListener(\"click\", handleFullScreen);\ndocument.addEventListener(\"keydown\", e => {\n  if (e.target !== textarea) {\n    if (e.code === \"Space\") {\n      e.preventDefault();\n      handlePlayClick();\n    } else if (e.keyCode === 70) {\n      handleFullScreen();\n    }\n  }\n});\n\n//# sourceURL=webpack://youtube-clone-coding/./src/client/js/videoPlayer.js?");

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