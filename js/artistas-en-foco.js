// ================================
// ARTISTAS EN FOCO — DESDE GOOGLE SHEETS
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=369911819&single=true&output=csv";

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
          inicializarArtistas(cards, data);
        }
      });
    })
    .catch(err => console.error("❌ Error Artistas en Foco:", err));
});

function inicializarArtistas(cards, data) {
  cards.forEach(card => {
    const nombre = card.querySelector("h3")?.textContent.trim();
    if (!nombre) return;

    const fila = data.find(row =>
      (row.artista || "").trim() === nombre &&
      (row.artista_foco === "TRUE" || row.artista_foco === true)
    );

    if (!fila || !fila.embed) return;

    card.addEventListener("click", () => {
      mostrarOverlayArtista(nombre, fila.embed);
    });
  });
}

// -------------------------------
// Overlay editorial reutilizable
// -------------------------------
function mostrarOverlayArtista(nombre, embedHTML) {
  cerrarOverlayArtista();

  const overlay = document.createElement("div");
  overlay.id = "zt-artista-overlay";

  overlay.innerHTML = `
    <div class="zt-artista-backdrop"></div>
    <div class="zt-artista-panel">
      <button class="zt-artista-close">✕</button>
      <h3 class="zt-artista-title">${nombre}</h3>
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
