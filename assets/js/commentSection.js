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

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("const videoContainer = document.getElementById(\"videoContainer\");\nconst commentForm = document.getElementById(\"commentForm\");\nconst videoComment = document.getElementById(\"videoComment\");\nconst textarea = document.getElementById(\"commentInput\");\nconst deleteBtn = document.querySelectorAll(\"#delete-comment\");\nconst addComment = (userId, avatar, name, text, id) => {\n  const videoComments = document.querySelector(\".video__comments ul\");\n  const newComment = document.createElement(\"li\");\n  newComment.dataset.id = id;\n  newComment.className = \"video__comment\";\n  const a1 = document.createElement(\"a\");\n  a1.href = `/users/${userId}`;\n  const img = document.createElement(\"img\");\n  img.className = \"video__comment-img\";\n  img.src = `/${avatar}`;\n  const div1 = document.createElement(\"div\");\n  div1.className = \"video__comment-data\";\n  const div2 = document.createElement(\"div\");\n  div2.className = \"video__comment-name\";\n  const a2 = document.createElement(\"a\");\n  a2.href = `/users/${userId}`;\n  a2.innerText = `@${name}`;\n  const small = document.createElement(\"small\");\n  small.innerText = \"지금\";\n  const div3 = document.createElement(\"div\");\n  div3.className = \"video__comment-text\";\n  div3.innerText = `${text}`;\n  const span = document.createElement(\"span\");\n  span.id = \"delete-comment\";\n  span.className = \"material-symbols-outlined\";\n  span.innerText = \"close\";\n  div2.appendChild(a2);\n  div2.appendChild(small);\n  div1.appendChild(div2);\n  div1.appendChild(div3);\n  a1.appendChild(img);\n  newComment.appendChild(a1);\n  newComment.appendChild(div1);\n  newComment.appendChild(span);\n  videoComments.prepend(newComment);\n  span.addEventListener(\"click\", handleDelete);\n};\nconst handleSubmit = async e => {\n  e.preventDefault();\n  const {\n    id,\n    avatar,\n    name\n  } = commentForm.dataset;\n  const text = textarea.value;\n  const videoId = videoContainer.dataset.id;\n  if (text === \"\") {\n    return;\n  }\n  const response = await fetch(`/api/videos/${videoId}/comment`,\n  // fetch -> JS를 통해 request를 보낼 수 있게 만들어줌. (URL 변경 없이)\n  {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    })\n  });\n  if (response.status === 201) {\n    textarea.value = \"\";\n    const {\n      newCommentId\n    } = await response.json(); //reponse를 json 형식으로 줌.\n    addComment(id, avatar, name, text, newCommentId);\n  }\n};\nif (commentForm) {\n  commentForm.addEventListener(\"submit\", handleSubmit);\n}\nconst handleDelete = async e => {\n  const li = e.target.parentNode;\n  const videoId = videoContainer.dataset.id;\n  const commentId = li.dataset.id;\n  console.log(commentId);\n  const response = await fetch(`/api/videos/${videoId}/comments/${commentId}/delete`, {\n    method: \"DELETE\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      videoId,\n      commentId\n    })\n  });\n  if (response.status === 200) {\n    li.remove();\n  }\n};\nif (deleteBtn) {\n  deleteBtn.forEach(btn => btn.addEventListener(\"click\", handleDelete));\n}\n\n//# sourceURL=webpack://youtube-clone-coding/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;