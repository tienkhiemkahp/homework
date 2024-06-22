var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector(".progress-span");
var timeSpan = document.querySelector(".time-span");
var audio = document.querySelector("audio");
var player = document.querySelector(".player");
var playBtn = player.querySelector(".play-btn i");
var playTimer = player.querySelector(".play-timer");
var currentTimeEl = playTimer.firstElementChild;
var durationEl = playTimer.lastElementChild;

var progressBarWidth = progressBar.clientWidth;
var offsetX = 0;
var initialClientX = 0;
var lastOffsetProgressBar = 0;
var offsetProgressBar = 0;
var clientX = 0;
var rate = 0;
var isDragging = false;
var duration = 0;

var setDuration = function () {
  duration = audio.duration;
  durationEl.innerText = getTimeFormat(duration);
};

var getTimeFormat = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${seconds < 10 ? "0" + seconds : seconds}`;
};

var handleDrag = function (e) {
  isDragging = true;
  clientX = e.clientX;
  offsetProgressBar = clientX - initialClientX + lastOffsetProgressBar;
  rate = (offsetProgressBar / progressBarWidth) * 100;

  if (rate < 0) rate = 0;
  if (rate > 100) rate = 100;

  progress.style.width = rate + "%";
};

var handleTimeSpan = function (e) {
  var timeRate = e.offsetX / progressBarWidth;
  timeSpan.innerHTML = getTimeFormat(duration * timeRate);
  timeSpan.style.opacity = 1;
  timeSpan.style.left = `${e.offsetX - 10}px`;
};

progressBar.addEventListener("mousedown", function (e) {
  offsetX = e.offsetX;
  rate = (offsetX / progressBarWidth) * 100;
  progress.style.width = rate + "%";

  lastOffsetProgressBar = offsetX;
  offsetProgressBar = offsetX;
  initialClientX = e.clientX;

  document.addEventListener("mousemove", handleDrag);
  audio.currentTime = (rate / 100) * duration;
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  document.addEventListener("mousemove", handleDrag);
  initialClientX = e.clientX;
});

document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", handleDrag);
  isDragging = false;
  lastOffsetProgressBar = offsetProgressBar;
  rate = lastOffsetProgressBar / progressBarWidth;
  audio.currentTime = rate * duration;

  if (!audio.paused) audio.play();
});

progressBar.addEventListener("mousemove", handleTimeSpan);
progressBar.addEventListener("mouseout", function () {
  timeSpan.style.opacity = 0;
});

window.addEventListener("load", function () {
  setDuration();

  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", function () {
    playBtn.classList.replace("fa-play", "fa-pause");
  });

  audio.addEventListener("pause", function () {
    playBtn.classList.replace("fa-pause", "fa-play");
  });

  audio.addEventListener("timeupdate", function () {
    if (!isDragging) {
      var currentTime = audio.currentTime;
      currentTimeEl.innerText = getTimeFormat(currentTime);
      rate = (currentTime / duration) * 100;
      progress.style.width = `${rate}%`;
      lastOffsetProgressBar = (currentTime / duration) * progressBarWidth;
      offsetProgressBar = lastOffsetProgressBar;
    } 
    if (isKaraoke) {
      filteredContentArr.forEach(function (value) {
        if(currentTime > value.words[0].startTime && currentTime < value.words[0].endTime ){
          karaokeOverlaySpanEls[0].innerHTML = value.words[0].data.slice(0,value.words[0].data.indexOf(`/`))
          karaokeOverlaySpanEls[1].innerHTML = value.words[0].data.slice(value.words[0].data.indexOf(`/`) + 1)
        } else if (currentTime > filteredContentArr[filteredContentArr.length - 1].words[0].endTime) {
          karaokeOverlaySpanEls[0].innerHTML = "Hứa đợi nhưng chẳng tới"
          karaokeOverlaySpanEls[1].innerHTML = "Lâm Tuấn"
        }
      })
    }
  });

  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
  });
});

var isKaraoke = false;
var karaokeBtn = document.querySelector(".karaoke-btn");
var karaokeOverlay = document.querySelector(".karaoke-overlay");
var karaokeOverlaySpanEls = karaokeOverlay.getElementsByTagName("span");
var closeBtnKaraokeOverlay = document.querySelector(".close-btn-karaoke-overlay");


karaokeBtn.addEventListener("click", function () {
  karaokeOverlay.style.top = "0";
  isKaraoke = true;
});

closeBtnKaraokeOverlay.addEventListener("click", function () {
  karaokeOverlay.style.top = "100%";
  isKaraoke = false;
});


var contentArr = [];
lyrics.forEach(function (value) {
  var data = "";
  var startTime = value.words[0].startTime / 1000;
  var endTime = value.words[value.words.length - 1].endTime / 1000;
  value.words.forEach(function (wordsValue) {
    data += " " + wordsValue.data;
  });
 contentArr = contentArr.concat({ words: [{ startTime: startTime, endTime: endTime, data: data }] });
});
var newContentArr = [];
for (var i = 0; i < contentArr.length - 1; i++) {
  newContentArr = newContentArr.concat({
    words: [{
      index: i,
      startTime: contentArr[i].words[0].startTime,
      endTime: contentArr[i + 1].words[0].endTime,
      data: `${contentArr[i].words[0].data} / ${contentArr[i + 1].words[0].data}`
    }]
  });
}

var filteredContentArr = [];
for (var i = 0; i < newContentArr.length; i++) {
  if (i % 2 === 0) {
    filteredContentArr = filteredContentArr.concat(newContentArr[i]);
  }
}
