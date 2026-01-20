// ================================
// NUEVOS LANZAMIENTOS (ROBUSTO)
// MISMA FILOSOFÍA QUE TOP ZONA TOTAL
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = "PEGA_AQUI_LA_URL_CSV_DE_GOOGLE_SHEETS";

  fetch(CSV_URL)
    .then(res => res.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const normalizados = results.data.map(normalizarFila);

          const nuevos = normalizados.filter(row =>
            row.nuevo && row.nuevo.toString().toUpperCase() === "TRUE"
          );

          console.log("🆕 Nuevos lanzamientos (normalizados):", nuevos);

          pintarNuevos(nuevos);
        }
      });
    })
    .catch(err => console.error("❌ Error Nuevos Lanzamientos:", err));
});

// -------------------------------
// Normaliza claves como en TOPS
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
    artista: obj.artista || "",
    cancion: obj.cancion || "",
    nuevo: obj.nuevo || "",
    audio_id: obj.audio_id || "",
    imagen: obj.imagen || ""
  };
}

// -------------------------------
// Pintar en el bloque existente
// -------------------------------
function pintarNuevos(canciones) {
  const albums = document.querySelectorAll(".albums .album");
  if (!albums.length) return;

  albums.forEach((album, index) => {
    const data = canciones[index];
    if (!data) return;

    // Imagen desde Sheets (GitHub RAW)
    album.style.backgroundImage = `url('${data.imagen}')`;
    album.style.backgroundSize = "cover";
    album.style.backgroundPosition = "center";

    // Datos para el player
    album.dataset.audioId = data.audio_id;
    album.dataset.artista = data.artista;
    album.dataset.cancion = data.cancion;

    // Click → reproducir
    album.addEventListener("click", () => {
      if (typeof reproducirSoundCloud === "function") {
        reproducirSoundCloud(data.audio_id);
      }
    });
  });
}
