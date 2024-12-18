let audioControl = document.querySelectorAll(".audio");
let playPause = document.querySelector(".play-pause");
let currentTimeDisplay = document.querySelector(".current-time");
let slider = document.querySelector(".slider");
let songLists = document.querySelector(".song-lists");
let songInfo = document.querySelector(".song-info");
let songName = songInfo.querySelector("p:nth-child(1)");
let songArtists = songInfo.querySelector("p:nth-child(2)");

let play = false;
let currentSongIndex = 0;

// To play and pause the music
function playPauseMusic() {
  if (play === false) {
    audioControl[currentSongIndex].play();
    playPause.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
    play = true;
  } else {
    audioControl[currentSongIndex].pause();
    playPause.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
    play = false;
  }
}

// Function call
playPause.addEventListener("click", () => {
  playPauseMusic();
});

// Get length of song
audioControl[currentSongIndex].addEventListener("loadedmetadata", () => {
  slider.max = audioControl[currentSongIndex].duration;
  slider.value = 0;
});

// Show and update the song time
audioControl[currentSongIndex].addEventListener("timeupdate", () => {
  slider.value = audioControl[currentSongIndex].currentTime;
  const minutes = Math.floor(audioControl[currentSongIndex].currentTime / 60);
  const seconds = Math.floor(audioControl[currentSongIndex].currentTime % 60);
  currentTimeDisplay.textContent = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
});

// If a playing song is clicked then pause it
function stopCurrentAudio() {
  audioControl[currentSongIndex].pause();
  audioControl[currentSongIndex].currentTime = 0;
  play = false;
  playPause.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
}

songLists.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName === "SPAN" || target.tagName === "P") {
    target = target.closest(".songs");
  }

  if (target && target.classList.contains("songs")) {
    const title = target.childNodes[0].textContent.trim();

    const songTitle = title ? title.trim() : "Unknown Title";
    const songArtist = target.querySelector(".artist")
      ? target.querySelector(".artist").textContent.trim()
      : "Unknown Artist";

    songName.innerText = songTitle;
    songArtists.innerText = songArtist;

    let clickedIndex = Array.from(songLists.children).indexOf(target);

    if (clickedIndex !== currentSongIndex) {
      stopCurrentAudio();

      currentSongIndex = clickedIndex;

      playPauseMusic();
    } else {
      playPauseMusic();
    }
  }
});
