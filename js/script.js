const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const status = document.getElementById('status');
const progressBar = document.getElementById('videoProgress');
const timeDisplay = document.getElementById('time');
const volumeRange = document.getElementById('volumeRange');
const volumeValue = document.getElementById('volumeValue');

// Устанавливаем громкость на 100% по умолчанию
video.volume = 1;

video.addEventListener('play', () => {
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
  status.textContent = 'Playing';
});

video.addEventListener('pause', () => {
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
  status.textContent = 'Paused';
});

video.addEventListener('ended', () => {
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
  status.textContent = 'Stopped';
});

video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progress}%`;

  const currentTime = formatTime(video.currentTime);
  const duration = formatTime(video.duration);
  timeDisplay.textContent = `${currentTime} / ${duration}`;
});

function togglePlayPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
  status.textContent = 'Stopped';
  progressBar.style.width = '0%';
}

function seekVideo(event) {
  const clickPosition = event.offsetX / progressBar.offsetWidth;
  video.currentTime = clickPosition * video.duration;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function setVolume(value) {
  video.volume = value;
  volumeValue.textContent = `${Math.round(value * 100)}%`;
}
