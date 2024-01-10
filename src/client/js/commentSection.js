const videoContainer = document.getElementById("videoContainer");
const commentForm = document.getElementById("commentForm");
const videoComment = document.getElementById("videoComment");
const textarea = document.getElementById("commentInput");
const deleteBtn = document.querySelectorAll("#delete-comment");

const addComment = (userId, avatar, name, text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const a1 = document.createElement("a");
  a1.href = `/users/${userId}`;
  const img = document.createElement("img");
  img.className = "video__comment-img";
  img.src = `/${avatar}`;
  const div1 = document.createElement("div");
  div1.className = "video__comment-data";
  const div2 = document.createElement("div");
  div2.className = "video__comment-name";
  const a2 = document.createElement("a");
  a2.href = `/users/${userId}`;
  a2.innerText = `@${name}`;
  const small = document.createElement("small");
  small.innerText = "지금";
  const div3 = document.createElement("div");
  div3.className = "video__comment-text";
  div3.innerText = `${text}`;
  const span = document.createElement("span");
  span.id = "delete-comment";
  span.className = "material-symbols-outlined";
  span.innerText = "close";
  div2.appendChild(a2);
  div2.appendChild(small);
  div1.appendChild(div2);
  div1.appendChild(div3);
  a1.appendChild(img);
  newComment.appendChild(a1);
  newComment.appendChild(div1);
  newComment.appendChild(span);
  videoComments.prepend(newComment);
  span.addEventListener("click", handleDelete);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const { id, avatar, name } = commentForm.dataset;
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(
    `/api/videos/${videoId}/comment`, // fetch -> JS를 통해 request를 보낼 수 있게 만들어줌. (URL 변경 없이)
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }
  );
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json(); //reponse를 json 형식으로 줌.
    addComment(id, avatar, name, text, newCommentId);
  }
};
if (commentForm) {
  commentForm.addEventListener("submit", handleSubmit);
}

const handleDelete = async (e) => {
  const li = e.target.parentNode;
  const videoId = videoContainer.dataset.id;
  const commentId = li.dataset.id;
  console.log(commentId);
  const response = await fetch(`/api/videos/${videoId}/comments/${commentId}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoId, commentId }),
  });
  if (response.status === 200) {
    li.remove();
  }
};
if (deleteBtn) {
  deleteBtn.forEach((btn) => btn.addEventListener("click", handleDelete));
}
