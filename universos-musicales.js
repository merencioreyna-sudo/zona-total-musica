console.log("🌌 universos-musicales.js CARGADO");

document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=369911819&single=true&output=csv";

  const universeBtns = document.querySelectorAll(".zt-universe");
  if (!universeBtns.length) return;

  let dataCache = [];

  // Cargar Sheets una sola vez
  fetch(CSV_URL)
    .then(res => res.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          dataCache = results.data.map(normalizarFila);
          console.log("🌌 Universos cargados:", dataCache.length);
        }
      });
    });

  universeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const universo = btn.textContent.trim();
      abrirOverlayUniverso(universo);
    });
  });

  function abrirOverlayUniverso(universo) {
    cerrarOverlayUniverso();

    const embeds = dataCache.filter(
      row => row.universos === universo && row.embed
    );

    if (!embeds.length) return;

    const overlay = document.createElement("div");
    overlay.id = "zt-universo-overlay";

    overlay.innerHTML = `
      <div class="zt-universo-backdrop"></div>
      <div class="zt-universo-panel">
        <button class="zt-universo-close">✕</button>
        <h3 class="zt-universo-title">${universo}</h3>
        <div class="zt-universo-list">
          ${embeds.map(e => `<div class="zt-universo-item">${e.embed}</div>`).join("")}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".zt-universo-close").onclick = cerrarOverlayUniverso;
    overlay.querySelector(".zt-universo-backdrop").onclick = cerrarOverlayUniverso;
  }

  function cerrarOverlayUniverso() {
    const old = document.getElementById("zt-universo-overlay");
    if (old) old.remove();
  }
});

// Normalización robusta (igual patrón que Top)
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
