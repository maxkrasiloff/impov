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
};

const trackInfo = {
  start_concert: {
    title: "Начало концерта",
    description: "Тема из звездных войн",
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
  if (mainAudio.paused) {
    mainAudio.play();
  } else {
    mainAudio.pause();
  }
}

function playPause(trackKey) {
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

window.addEventListener("load", () => {
  document
    .querySelector(".play-pause-button")
    .addEventListener("click", togglePlayPause);
  addBeepEvent(".success", path.complete);
  addBeepEvent(".error", path.error);
  addBeepEvent(".end", path.end);

  addSoundEvent(".break", "break");
  addSoundEvent(".criminal", "criminal");
  addSoundEvent(".start_concert", "start_concert");
});
