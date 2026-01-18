console.log("🔥 top-zona-total.js CARGADO");

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=369911819&single=true&output=csv";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧠 DOMContentLoaded en top-zona-total.js");

  Papa.parse(SHEET_CSV_URL, {
    download: true,
    header: true,
    complete: function (results) {
      console.log("📦 DATOS DESDE SHEETS:", results.data);

      const topSongs = results.data
        .filter(row => row.Colecciones === "Top Zona Total")
        .slice(0, 4);

      const topCards = document.querySelectorAll(".zt-top-main");

      topCards.forEach((card, i) => {
        const song = topSongs[i];
        if (!song) return;

        card.dataset.trackId = song.Audio_id || "";
        card.querySelector("h3").textContent = song.Canción || "";
        card.querySelector("p").textContent = song.Artista || "";

        const img = card.querySelector("img");
        if (img && song.Imagen) {
          img.src = song.Imagen;
          img.alt = song.Canción;
        }
      });

      console.log("✅ Top Zona Total PINTADO");
    },
    error: function (err) {
      console.error("❌ Error leyendo Google Sheets", err);
    }
  });
});
