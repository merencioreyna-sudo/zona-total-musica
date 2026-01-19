console.log("🎧 Player SoundCloud cargado");

const playerContainer = document.getElementById("sc-player-container");

// Si no existe, lo creamos dentro del bloque editorial
if (!playerContainer) {
  const editorial = document.querySelector(".zt-editorial-player");
  if (editorial) {
    const div = document.createElement("div");
    div.id = "sc-player-container";
    editorial.appendChild(div);
  }
}

function reproducirSoundCloud(trackUrl) {
  if (!trackUrl) {
    console.warn("⚠️ No hay URL de SoundCloud para reproducir");
    return;
  }

  const embedSrc =
    "https://w.soundcloud.com/player/?url=" +
    encodeURIComponent(trackUrl) +
    "&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false";

  const iframe = document.createElement("iframe");
  iframe.width = "100%";
  iframe.height = "166";
  iframe.scrolling = "no";
  iframe.frameBorder = "no";
  iframe.allow = "autoplay";
  iframe.src = embedSrc;

  const container = document.getElementById("sc-player-container");
  if (container) {
    container.innerHTML = "";
    container.appendChild(iframe);
  }
}

// Escucha clicks en canciones (Top, Nuevos, etc.)
document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-track-id]");
  if (!card) return;

  const trackUrl = card.dataset.trackId;
  console.log("▶ Reproduciendo SoundCloud:", trackUrl);
  reproducirSoundCloud(trackUrl);
});
