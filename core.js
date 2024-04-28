const mainAudio = new Audio();
mainAudio.volume = 0.1;

let activeAudio = "";
let activeBeep = "";

const path = {
  complete: "./audio/complete.mp3",
  error: "./audio/error.mp3",
  end: "./audio/end.mp3",
  break: "./audio/break.mp3",
  start: "./audio/start_concert.weba",
  criminal: "./audio/criminal.weba",
  start_concert: "./audio/start_concert.mp3",
  mortal_kombat: "./audio/mortal_kombat_short.mp3",
};

const trackInfo = {
  start_concert: {
    title: "Начало концерта",
    description: "Mortal Kombat",
  },
  mortal_kombat: {
    title: "Начало концерта",
    description: "Mortal Kombat",
  },
  criminal: {
    title: "Следователь",
    description: "Тема из Криминальной России",
  },
  break: {
    title: "Отбивка",
    description: "Бодрый трек 80х",
  },
};

function togglePlayPause() {
  const playPauseIcon = document.querySelector(".play_pause_icon");
  if (mainAudio.paused) {
    playPauseIcon.src = "./images/pause.svg";
    mainAudio.play();
  } else {
    playPauseIcon.src = "./images/play.svg";
    mainAudio.pause();
  }
}

function playPause(trackKey) {
  document.querySelector(".stop").classList.add("active");
  const trackPath = path[trackKey];
  if (activeAudio !== trackPath) {
    activeAudio = trackPath;
    mainAudio.src = trackPath;
    mainAudio.load();
    console.log(trackInfo, trackInfo[trackKey]);

    if (trackInfo[trackKey]) {
      document.querySelector(
        ".current_track"
      ).innerHTML = `${trackInfo[trackKey]?.title} - ${trackInfo[trackKey]?.description}`;
    } else {
      document.querySelector(
        ".current_track"
      ).innerHTML = `Неизвестный - Неизвестно`;
    }
  }
  togglePlayPause();
}

function playBeep(trackPath) {
  const beepAudio = new Audio();
  activeBeep = trackPath;
  beepAudio.src = trackPath;
  beepAudio.load();

  beepAudio.play();
}

function addTrackEvent(querySelector, trackPath, func) {
  document.querySelector(querySelector).addEventListener("click", () => {
    func(trackPath);
  });
}

function addSoundEvent(querySelector, trackKey) {
  addTrackEvent(querySelector, trackKey, playPause);
}

function addBeepEvent(querySelector, trackPath) {
  addTrackEvent(querySelector, trackPath, playBeep);
}

function convertTime(time) {
  let sec = time;
  const hours = (sec - (sec % 3600)) / 3600;
  sec = sec - hours * 3600;
  const min = (sec - (sec % 60)) / 60;
  sec = sec - min * 60;
  const hoursString = hours > 10 ? hours : `0${hours}`;
  const minString = min > 10 ? min : `0${min}`;
  const secString = sec > 10 ? sec : `0${sec}`;

  if (hours) {
    return `${hoursString}:${minString}:${secString}`;
  }
  return `${minString}:${secString}`;
}

window.addEventListener("load", () => {
  document
    .querySelector(".play-pause-button")
    .addEventListener("click", togglePlayPause);
  document.querySelector(".stop-wrapper").addEventListener("click", () => {
    mainAudio.pause();
    mainAudio.currentTime = 0;
    document.querySelector(".stop").classList.remove("active");
  });

  addBeepEvent(".success", path.complete);
  addBeepEvent(".error", path.error);
  addBeepEvent(".end", path.end);

  addSoundEvent(".break", "break");
  addSoundEvent(".criminal", "criminal");
  addSoundEvent(".start_concert", "mortal_kombat");
});

document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = mainAudio;
  const currentTimeDisplay = document.getElementById("currentTime");
  const durationDisplay = document.getElementById("duration");
  const scroll = document.querySelector(".track_scroll");
  const roller = document.querySelector(".track_roller");

  // Функция для обновления отображаемого времени воспроизведения
  function updateCurrentTime() {
    const currentTime = Math.floor(audioPlayer.currentTime);
    currentTimeDisplay.textContent = convertTime(currentTime);

    const scrollWidth = scroll.clientWidth;
    const duration = Math.floor(audioPlayer.duration);
    const scrollPointToSec = scrollWidth / duration;

    const rollerPosition = Math.floor(scrollPointToSec * currentTime);
    console.log(
      "scrollPointToSec * currentTime",
      scrollPointToSec,
      currentTime,
      rollerPosition
    );
    roller.style.left = rollerPosition + "px";
  }

  // Подключаем события для обновления времени и длительности
  audioPlayer.addEventListener("loadedmetadata", () => {
    const duration = Math.floor(audioPlayer.duration);
    durationDisplay.textContent = convertTime(duration);
  });

  audioPlayer.addEventListener("timeupdate", updateCurrentTime);
});
