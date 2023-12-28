const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayBtn = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
const handleMuteBtn = (e) => {};
const handlePause = (e) => {
  playBtn.innerText = "Play";
};
const handlePlay = (e) => {
  playBtn.innerText = "Pause";
};

playBtn.addEventListener("click", handlePlayBtn);
muteBtn.addEventListener("click", handleMuteBtn);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
