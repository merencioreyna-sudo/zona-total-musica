console.log("🎧 Player cargado (Híbrido: Audio Directo + Embeds)");

// ================================
// CONTENEDOR DEL PLAYER
// ================================
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

// Estado inicial
if (playerContainer) {
  playerContainer.innerHTML = `
    <p style="opacity:0.6; font-size:14px; text-align:center;">
      Pulsa una canción para reproducir
    </p>
  `;
}

// ================================
// FUNCIÓN PRINCIPAL (HÍBRIDA)
// ================================
function reproducirAudio(source) {
  if (!source) {
    console.warn("⚠️ No hay fuente de audio para reproducir");
    return;
  }

  // Limpiar contenedor
  if (playerContainer) {
    playerContainer.innerHTML = "";
  }

  // ================================
  // 1️⃣ EMBED (iframe: Audiomack, YouTube, SoundCloud embed, etc.)
  // ================================
  if (typeof source === "string" && source.trim().startsWith("<iframe")) {
    playerContainer.innerHTML = source;
    console.log("▶ Reproduciendo embed externo");
    return;
  }

  // ================================
  // 2️⃣ SOUNDCLOUD (URL NORMAL)
  // ================================
  if (typeof source === "string" && source.includes("soundcloud.com")) {
    reproducirSoundCloud(source);
    return;
  }

  // ================================
  // 3️⃣ AUDIO DIRECTO (mp3 / m4a / ogg)
  // ================================
  if (typeof source === "string" && source.match(/\.(mp3|m4a|ogg|wav)$/i)) {
    reproducirAudioDirecto(source);
    return;
  }

  // ================================
  // 4️⃣ NO SOPORTADO
  // ================================
  console.warn("⚠️ Fuente de audio no soportada:", source);
}

// ================================
// SOUNDCLOUD (EMBED AUTOMÁTICO)
// ================================
function reproducirSoundCloud(trackUrl) {
  if (!trackUrl) {
    console.warn("⚠️ No hay URL de SoundCloud");
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

  console.log("▶ Reproduciendo SoundCloud:", trackUrl);
}

// ================================
// AUDIO DIRECTO (HTML5)
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
  audio.play().catch(() => {});
  console.log("▶ Reproduciendo audio directo:", url);
}

// ================================
// ESCUCHA DE CLICKS (TOP, ETC.)
// ================================
document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-track-id]");
  if (!card) return;

  const source = card.dataset.trackId;
  console.log("▶ Click en track:", source);
  reproducirAudio(source);
});

// PLAYLISTS CURADAS – OVERLAY
document.addEventListener("click", (e) => {
  const chip = e.target.closest("[data-playlist-embed]");
  if (!chip) return;

  const title = chip.textContent.trim();
  const embed = chip.dataset.playlistEmbed;

  playlistTitle.textContent = title;
  playlistEmbed.innerHTML = embed;

  playlistOverlay.hidden = false;
});
