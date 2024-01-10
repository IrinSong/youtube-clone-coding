const videoContainer = document.getElementById("videoContainer");
const video = document.querySelector("video");
const videoControls = document.getElementById("videoControls");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const textarea = document.getElementById("commentInput");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "play_arrow" : "pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "volume_off" : "volume_up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "volume_off";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};
const handleVideoMeta = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleVideoTime = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
const handleVideoEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" }); // fetch-> GET 요청을 보내는 것. POST 설정 필요
};

const hideControls = () => videoControls.classList.remove("showing");
const handleVideoMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleVideoLeave = () => hideControls();

const handleTimeChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "fullscreen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "fullscreen_exit";
  }
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("click", handlePlayClick);
video.addEventListener("loadedmetadata", handleVideoMeta);
video.addEventListener("timeupdate", handleVideoTime);
video.addEventListener("ended", handleVideoEnded);
videoContainer.addEventListener("mousemove", handleVideoMove);
videoContainer.addEventListener("mouseleave", handleVideoLeave);
timeline.addEventListener("input", handleTimeChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
document.addEventListener("keydown", (e) => {
  if (e.target !== textarea) {
    if (e.code === "Space") {
      e.preventDefault();
      handlePlayClick();
    } else if (e.keyCode === 70) {
      handleFullScreen();
    }
  }
});
