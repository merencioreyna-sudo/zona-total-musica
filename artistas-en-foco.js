// ================================
// ARTISTAS EN FOCO — DESDE GOOGLE SHEETS
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL =
    "const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=369911819&single=true&output=csv&v=" + Date.now();
";

  const cards = document.querySelectorAll(".zt-artist");
  if (!cards.length) return;

  fetch(CSV_URL)
    .then(res => res.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          const data = results.data;

          // 👉 Solo artistas en foco
          const artistasFoco = data.filter(row => {
            const foco = (row["artista_foco"] || "")
              .toString()
              .trim()
              .toUpperCase();
            return foco === "TRUE";
          });

          pintarArtistas(cards, artistasFoco);
        }
      });
    })
    .catch(err => console.error("❌ Error Artistas en Foco:", err));
});

function pintarArtistas(cards, artistas) {
  cards.forEach((card, index) => {
    const fila = artistas[index];
    if (!fila) return;

    const nombre =
      (fila["artista "] || fila["artista"] || "").trim();
    const genero =
      (fila["género"] || fila["genero"] || "").trim();
    const imagen =
      (fila["imagen"] || "").trim();
    const embed =
      (fila["embed"] || "").trim();

    // Imagen
    const img = card.querySelector("img");
    if (img && imagen) {
      img.src = imagen;
      img.alt = nombre;
    }

    // Nombre
    const h3 = card.querySelector("h3");
    if (h3) h3.textContent = nombre;

    // Género
    const p = card.querySelector("p");
    if (p) p.textContent = genero;

    // Click → overlay
    if (embed) {
      card.addEventListener("click", () => {
        mostrarOverlayArtista(nombre, genero, imagen, embed);
      });
    }
  });
}

// -------------------------------
// Overlay editorial
// -------------------------------
function mostrarOverlayArtista(nombre, genero, imagen, embedHTML) {
  cerrarOverlayArtista();

  const overlay = document.createElement("div");
  overlay.id = "zt-artista-overlay";

  overlay.innerHTML = `
    <div class="zt-artista-backdrop"></div>
    <div class="zt-artista-panel">
      <button class="zt-artista-close">✕</button>

      <div class="zt-artista-header">
        <img src="${imagen}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>${genero}</p>
      </div>

      <div class="zt-artista-embed">
        ${embedHTML}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector(".zt-artista-close").onclick = cerrarOverlayArtista;
  overlay.querySelector(".zt-artista-backdrop").onclick = cerrarOverlayArtista;
}

function cerrarOverlayArtista() {
  const old = document.getElementById("zt-artista-overlay");
  if (old) old.remove();
}

