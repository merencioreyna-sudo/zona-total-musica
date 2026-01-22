console.log("🎧 Player cargado (SoundCloud + Audio Directo)");

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

// Estado inicial visible
if (playerContainer) {
  playerContainer.innerHTML = `
    <p style="opacity:0.6; font-size:14px; text-align:center;">
      Pulsa una canción para reproducir
    </p>
  `;
}

// ================================
// REPRODUCIR AUDIO (AUTO-DETECCIÓN)
// ================================
function reproducirAudio(url) {
  if (!url) {
    console.warn("⚠️ No hay URL de audio para reproducir");
    return;
  }

  // Detectar tipo de fuente
  const esSoundCloud = url.includes("soundcloud.com");
  const esAudioDirecto = url.match(/\.(mp3|m4a|ogg)$/i);

  if (esSoundCloud) {
    reproducirSoundCloud(url);
    return;
  }

  if (esAudioDirecto) {
    reproducirAudioDirecto(url);
    return;
  }

  console.warn("⚠️ Fuente de audio no soportada:", url);
}

// ================================
// SOUNDCLOUD (IGUAL QUE ANTES)
// ================================
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

// ================================
// AUDIO DIRECTO (MP3 / M4A / OGG)
// ================================
function reproducirAudioDirecto(url) {
  let audio = document.getElementById("zt-audio");

  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "zt-audio";
    audio.controls = true;
    audio.style.width = "100%";
    document.body.appendChild(audio);
  }

  if (playerContainer) {
    playerContainer.innerHTML = "";
    playerContainer.appendChild(audio);
  }

  audio.src = url;
  audio.play();

  console.log("▶ Reproduciendo audio directo:", url);
}

// ================================
// ESCUCHA CLICKS (TOP, NUEVOS, ETC.)
// ================================
document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-track-id]");
  if (!card) return;

  const trackUrl = card.dataset.trackId;
  console.log("▶ Reproduciendo:", trackUrl);
  reproducirAudio(trackUrl);
});
