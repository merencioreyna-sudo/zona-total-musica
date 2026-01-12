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

  ytPlayer.cueVideoById(this.currentTrack.youtubeId);
  ytPlayer.playVideo();
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-track-id]").forEach(item => {
    item.addEventListener("click", () => {
      const trackId = item.dataset.trackId;
      ZTPlayer.load(trackId);
      ZTPlayer.play();
      console.log("▶ Reproduciendo desde Top:", trackId);
    });
  });
});




