console.log("🔥 top-zona-total.js CARGADO");

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=369911819&single=true&output=csv";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧠 DOMContentLoaded en top-zona-total.js");

  Papa.parse(SHEET_CSV_URL, {
    download: true,
    header: true,
    complete: function (results) {

      console.log("🔑 Claves reales:", Object.keys(results.data[0]));
      console.log("📦 DATOS DESDE SHEETS:", results.data);

      const topSongs = results.data
        .filter(row => {
          const col =
            row.colecciones ||
            row["colecciones"] ||
            row["colecciones "] ||
            row[" Colecciones"] ||
            row["Colecciones"];

          return col && col.trim() === "Top Zona Total";
        })
        .slice(0, 4);

      const topCards = document.querySelectorAll(".zt-top-main, .zt-top-mini");

      topCards.forEach((card, i) => {
        const song = topSongs[i];
        if (!song) return;

        let audioUrl =
          song.audio_id ||
          song["audio_id"] ||
          song["audio_id "] ||
          song[" Audio_id"] ||
          song["Audio_id"];

        audioUrl = audioUrl ? audioUrl.trim() : "";
        card.dataset.trackId = audioUrl;

        const title = song["canción"] || "";
        const artist = song["artista"] || song["artista "] || "";

        const h3 = card.querySelector("h3, h4");
        const p = card.querySelector("p");

        if (h3) h3.textContent = title;
        if (p) p.textContent = artist;

        const imageUrl =
          song.imagen ||
          song["imagen"] ||
          song["imagen "] ||
          song[" Imagen"] ||
          song["Imagen"];

        const img = card.querySelector("img");
        if (img && imageUrl) {
          img.src = imageUrl.trim();
          img.alt = title;
        }
      });

      console.log("✅ Top Zona Total PINTADO");
    },
    error: function (err) {
      console.error("❌ Error leyendo Google Sheets", err);
    }
  });
});
