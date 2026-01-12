// =====================================================
// ZONA TOTAL MÚSICA — CATÁLOGO EDITABLE (REAL)
// Categorías DEFINITIVAS:
// Reggaetón, Bachata, Salsa, Pop, Hip Hop, Rock, House,
// Lo-Fi, Baladas en Inglés, Romántico, Electrónica, Clásicos
// =====================================================

const ZT_MUSIC = {
  genres: [
    { id:"reggaeton", name:"Reggaetón" },
    { id:"bachata", name:"Bachata" },
    { id:"salsa", name:"Salsa" },
    { id:"pop", name:"Pop" },
    { id:"hiphop", name:"Hip Hop" },
    { id:"rock", name:"Rock" },
    { id:"house", name:"House" },
    { id:"lofi", name:"Lo-Fi" },
    { id:"baladas_ingles", name:"Baladas en Inglés" },
    { id:"romantico", name:"Romántico" },
    { id:"electronica", name:"Electrónica" },
    { id:"clasicos", name:"Clásicos" }
  ],

  // Canciones: pon tus mp3 en /assets/audio y carátulas en /assets/covers
  songs: [
    { id:"rg01", title:"Ejemplo Reggaetón 1", artist:"Artista Reggaetón", genre:"reggaeton", audio:"assets/audio/rg01.mp3", cover:"assets/covers/rg01.jpg" },
    { id:"ba01", title:"Ejemplo Bachata 1", artist:"Bachatero", genre:"bachata", audio:"assets/audio/ba01.mp3", cover:"assets/covers/ba01.jpg" },
    { id:"sa01", title:"Ejemplo Salsa 1", artist:"Son Salsero", genre:"salsa", audio:"assets/audio/sa01.mp3", cover:"assets/covers/sa01.jpg" },
    { id:"po01", title:"Ejemplo Pop 1", artist:"Artista Pop", genre:"pop", audio:"assets/audio/po01.mp3", cover:"assets/covers/po01.jpg" },
    { id:"hh01", title:"Ejemplo Hip Hop 1", artist:"Artista Hip Hop", genre:"hiphop", audio:"assets/audio/hh01.mp3", cover:"assets/covers/hh01.jpg" },
    { id:"rk01", title:"Ejemplo Rock 1", artist:"Banda Rock", genre:"rock", audio:"assets/audio/rk01.mp3", cover:"assets/covers/rk01.jpg" },
    { id:"ho01", title:"Ejemplo House 1", artist:"DJ House", genre:"house", audio:"assets/audio/ho01.mp3", cover:"assets/covers/ho01.jpg" },
    { id:"lf01", title:"Ejemplo Lo-Fi 1", artist:"LoFi Producer", genre:"lofi", audio:"assets/audio/lf01.mp3", cover:"assets/covers/lf01.jpg" },
    { id:"en01", title:"Ejemplo Balada (EN) 1", artist:"English Artist", genre:"baladas_ingles", audio:"assets/audio/en01.mp3", cover:"assets/covers/en01.jpg" },
    { id:"ro01", title:"Ejemplo Romántico 1", artist:"Artista Romántico", genre:"romantico", audio:"assets/audio/ro01.mp3", cover:"assets/covers/ro01.jpg" },
    { id:"el01", title:"Ejemplo Electrónica 1", artist:"DJ Zona", genre:"electronica", audio:"assets/audio/el01.mp3", cover:"assets/covers/el01.jpg" },
    { id:"cl01", title:"Ejemplo Clásico 1", artist:"Clásicos", genre:"clasicos", audio:"assets/audio/cl01.mp3", cover:"assets/covers/cl01.jpg" }
  ],

  // Novedades (IDs de songs)
  novedades: ["rg01","ba01","po01","hh01","en01","lf01"],

  // Artistas destacados (IDs de songs)
  artists: [
    { id:"a01", name:"Artista Reggaetón", image:"assets/artists/a01.jpg", songs:["rg01"] },
    { id:"a02", name:"Bachatero", image:"assets/artists/a02.jpg", songs:["ba01"] },
    { id:"a03", name:"DJ Zona", image:"assets/artists/a03.jpg", songs:["el01","ho01"] },
    { id:"a04", name:"LoFi Producer", image:"assets/artists/a04.jpg", songs:["lf01"] }
  ],

  // Playlists destacadas (IDs de songs)
  playlists: [
    { id:"top", name:"Top Zona Total", description:"Lo más escuchado ahora", songs:["rg01","po01","hh01","el01"] },
    { id:"bachata_romantica", name:"Bachata Romántica", description:"Para sentirla", songs:["ba01","ro01"] },
    { id:"lofi_chill", name:"Lo-Fi Chill", description:"Flow tranquilo", songs:["lf01"] },
    { id:"reggaeton_hits", name:"Reggaetón Hits", description:"🔥 Subiendo la vibra", songs:["rg01"] },
    { id:"house_night", name:"House Night", description:"Noche de club", songs:["ho01","el01"] },
    { id:"clasicos", name:"Clásicos Inolvidables", description:"Siempre sirven", songs:["cl01","rk01","sa01"] }
  ]
};
