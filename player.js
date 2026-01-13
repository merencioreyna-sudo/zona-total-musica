// ===============================
// ZONA TOTAL MÚSICA — PLAYER
// FASE 5.5 — PLAYER VISIBLE EDITORIAL
// ===============================

let ytPlayer = null;
let isPlaying = false; // 👈 estado interno REAL

// -------------------------------
// Cargar API de YouTube
// -------------------------------
function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

// -------------------------------
// Mostrar player visible (EDITORIAL)
// -------------------------------
function showVisiblePlayer(track) {
  const container = document.getElementById("zt-player-visible");
  if (!container || !track) return;

  container.classList.remove("zt-player-hidden");

  const titleEl = container.querySelector(".zt-player-title");
  const artistEl = container.querySelector(".zt-player-artist");

  if (titleEl) titleEl.textContent = track.title;
  if (artistEl) artistEl.textContent = track.artist;
}

// -------------------------------
// Core Player
// -------------------------------
const ZTPlayer = {
  tracks: [
    {
      id: "zt001",
      title: "Provenza",
      artist: "Karol G",
      youtubeId: "ca48oMV59LU"
    },
    {
      id: "zt002",
      title: "TQG",
      artist: "Karol G, Shakira",
      youtubeId: "jZGpkLElSu8"
    },
    {
      id: "zt003",
      title: "BZRP Music Sessions #53",
      artist: "Shakira",
      youtubeId: "CocEMWdc7Ck"
    }
  ],

  currentTrack: null,

  init() {
    loadYouTubeAPI();
  },

  load(trackId) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return;
    this.currentTrack = track;
  },

  play() {
    if (!this.currentTrack || !ytPlayer) return;

    ytPlayer.stopVideo();
    ytPlayer.loadVideoById({
      videoId: this.currentTrack.youtubeId,
      startSeconds: 0
    });

    isPlaying = true;
  },

  pause() {
    if (!ytPlayer) return;
    ytPlayer.pauseVideo();
    isPlaying = false;
  }
};

// -------------------------------
// YouTube API callback
// -------------------------------
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("yt-player", {
    height: "1",
    width: "1",
    videoId: "",
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1
    },
    events: {
      onReady: () => {
        console.log("Player listo, esperando interacción");
      }
    }
  });
}

// -------------------------------
// Init
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  ZTPlayer.init();

  // Click en TOP Zona Total
  document.querySelectorAll("[data-track-id]").forEach(item => {
    item.addEventListener("click", () => {
      const trackId = item.dataset.trackId;

      ZTPlayer.load(trackId);
      showVisiblePlayer(ZTPlayer.currentTrack);
      ZTPlayer.play();

      const playToggle = document.getElementById("zt-play-toggle");
      if (playToggle) playToggle.textContent = "⏸";

      console.log("▶ Audio disparado por click directo:", trackId);
    });
  });

  // Play / Pause visible (ESTABLE)
  const playToggle = document.getElementById("zt-play-toggle");

  if (playToggle) {
    playToggle.addEventListener("click", () => {
      if (!ytPlayer) return;

      if (isPlaying) {
        ytPlayer.pauseVideo();
        playToggle.textContent = "▶";
        isPlaying = false;
      } else {
        ytPlayer.playVideo();
        playToggle.textContent = "⏸";
        isPlaying = true;
      }
    });
  }
});
