console.log("🎧 Player SoundCloud cargado");

let playerContainer = document.getElementById("sc-player-container");

// Si no existe, lo creamos dentro del bloque editorial
if (!playerContainer) {
  const editorial = document.querySelector(".zt-editorial-player");
  if (editorial) {
    const div = document.createElement("div");
    div.id = "sc-player-container";
    editorial.appendChild(div);
    playerContainer = div;
  }
}

// 🔹 AJUSTE ÚNICO:
// Al cargar la página, mostramos un estado inicial visible
if (playerContainer) {
  playerContainer.innerHTML = `
    <p style="opacity:0.6; font-size:14px; text-align:center;">
      Pulsa una canción para reproducir
    </p>
  `;
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

  if (playerContainer) {
    playerContainer.innerHTML = "";
    playerContainer.appendChild(iframe);
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
