alert("player.js cargado correctamente");

// ===============================
// ZONA TOTAL MÚSICA — PLAYER
// FASE 5.3 — AUDIO REAL
// ===============================

let ytPlayer = null;

// Cargar API de YouTube
function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

const ZTPlayer = {
  tracks: [
    {
      id: "zt001",
      title: "Nombre de la Canción",
      artist: "Artista Principal",
      youtubeId: "ca48oMV59LU"

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
    ytPlayer.loadVideoById(this.currentTrack.youtubeId);
  }
};

// API callback obligatorio
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
  ZTPlayer.load("zt001");
  console.log("Player listo, esperando interacción");

  document.body.addEventListener("click", () => {
    ZTPlayer.play();
    console.log("▶ Audio reproduciéndose tras click");
  }, { once: true });
}

    }
  });
}

// Iniciar
document.addEventListener("DOMContentLoaded", () => {
  ZTPlayer.init();
});
