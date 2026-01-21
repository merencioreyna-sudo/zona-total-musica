// ================================
// NUEVOS LANZAMIENTOS (ESTABLE)
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=369911819&single=true&output=csv";

  fetch(CSV_URL)
    .then(res => res.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const data = results.data;

          const nuevos = data.filter(row =>
            row["nuevo"] === "TRUE" || row["nuevo "] === "TRUE"
          );

          console.log("🆕 Nuevos lanzamientos:", nuevos);

          pintarNuevos(nuevos);
        }
      });
    })
    .catch(err => console.error("❌ Error Nuevos Lanzamientos:", err));
});

function pintarNuevos(canciones) {
  const albums = document.querySelectorAll(".albums .album");
  if (!albums.length) return;

  albums.forEach((album, index) => {
    const data = canciones[index];
    if (!data) return;

    album.style.backgroundImage = `url('${data.imagen}')`;
    album.style.backgroundSize = "cover";
    album.style.backgroundPosition = "center";

    album.setAttribute(
      "data-title",
      `${data["artista "] || data["artista"]} – ${data["canción"]}`
    );

    album.addEventListener("click", () => {
      if (typeof reproducirSoundCloud === "function") {
        reproducirSoundCloud(data.audio_id);
      }
    });
  });
}
