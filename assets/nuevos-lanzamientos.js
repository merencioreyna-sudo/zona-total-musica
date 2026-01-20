// ================================
// NUEVOS LANZAMIENTOS (SEGURO)
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
          const nuevos = results.data.filter(row =>
            row.nuevo && row.nuevo.toString().toUpperCase() === "TRUE"
          );

          pintarNuevos(nuevos);
        }
      });
    })
    .catch(err => console.error("Error Nuevos Lanzamientos:", err));
});

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

    // Data para el player
    album.dataset.audioId = data.audio_id;
    album.dataset.artista = data.artista;
    album.dataset.cancion = data["canción"];

    // Click → reproducir
    album.addEventListener("click", () => {
      if (typeof reproducirSoundCloud === "function") {
        reproducirSoundCloud(data.audio_id);
      }
    });
  });
}
