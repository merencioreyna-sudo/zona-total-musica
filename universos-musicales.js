// ================================
// UNIVERSOS MUSICALES — OVERLAY EDITORIAL
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=369911819&single=true&output=csv";

  const universosBtns = document.querySelectorAll(".zt-universe");
  if (!universosBtns.length) return;

  let cacheData = [];

  // Cargar CSV una sola vez
  fetch(CSV_URL)
    .then(res => res.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          cacheData = results.data.map(normalizarFila);
        }
      });
    });

  universosBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const universo = btn.textContent.trim();
      const match = cacheData.find(row => row.universos === universo && row.embed);

      if (match) {
        mostrarOverlay(universo, match.embed);
      }
    });
  });
});

// -------------------------------
// Normalización robusta (igual que Tops)
// -------------------------------
function normalizarFila(fila) {
  const obj = {};

  Object.keys(fila).forEach(key => {
    if (!key) return;
    const limpia = key
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    obj[limpia] = fila[key];
  });

  return {
    universos: obj.universos || "",
    embed: obj.embed || ""
  };
}

// -------------------------------
// Overlay editorial
// -------------------------------
function mostrarOverlay(titulo, embedHTML) {
  cerrarOverlay(); // solo uno a la vez

  const overlay = document.createElement("div");
  overlay.id = "zt-universo-overlay";

  overlay.innerHTML = `
    <div class="zt-universo-overlay-backdrop"></div>
    <div class="zt-universo-overlay-panel">
      <button class="zt-universo-close">✕</button>
      <h3 class="zt-universo-title">${titulo}</h3>
      <div class="zt-universo-embed">
        ${embedHTML}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Cerrar
  overlay.querySelector(".zt-universo-close").onclick = cerrarOverlay;
  overlay.querySelector(".zt-universo-overlay-backdrop").onclick = cerrarOverlay;
}

function cerrarOverlay() {
  const old = document.getElementById("zt-universo-overlay");
  if (old) old.remove();
}

