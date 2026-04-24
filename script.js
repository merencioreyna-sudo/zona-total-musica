// ================= CONFIGURACIÓN =================
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJpv1h9XBYo7gJPLBx4U_1IiRkf0v-y2W2Z_o-O3V67aPSqAzvBdAomO7SPy-dVSYw3cyUwD3C0oVJ/pub?gid=369911819&single=true&output=csv";

let allSongs = [];
let currentCategory = "salsa"; // o la primera categoría que tenga datos

// ================= CARRUSEL =================
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoInterval;

function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentSlide = index;
}

function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
}

if (slides.length) {
    autoInterval = setInterval(nextSlide, 3000);
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            clearInterval(autoInterval);
            autoInterval = setInterval(nextSlide, 3000);
        });
    });
}

// ================= CARGAR DATOS =================
function cargarDatos() {
    fetch(CSV_URL)
        .then(res => res.text())
        .then(csv => {
            Papa.parse(csv, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    allSongs = results.data.map(normalizarFila);
                    // Mostrar tops al iniciar (sin filtrar por categoría)
                    const topsIniciales = allSongs.filter(s => s.top === true || s.top === "TRUE");
                    pintarTop(topsIniciales.slice(0, 6));
                }
            });
        })
        .catch(err => {
    console.error("Error:", err);
    const container = document.getElementById("top-grid");
    if (container) {
        container.innerHTML = "<div style='text-align:center; padding:20px; color:#ff4fa3;'>Error cargando datos</div>";
    }
});
}

function normalizarFila(fila) {
    return {
        titulo: fila.titulo || fila["titulo"] || "",
        artista: fila.artista || fila["artista"] || "",
        categoria: (fila.categoria || fila["categoria"] || "").toLowerCase(),
        imagen: fila.imagen || fila["imagen"] || "",
        audio_url: fila.audio_url || fila["audio_url"] || "",
        top: fila.top === "TRUE" || fila.top === "true" || fila.top === true
    };
}

// ================= PINTAR TOP =================
function pintarTop(canciones) {
    const container = document.getElementById("top-grid");
    if (!container) return;
    container.innerHTML = "";

    canciones.slice(0, 6).forEach((cancion, index) => {
        const card = document.createElement("div");
        card.className = "top-card";
        card.innerHTML = `
            <img src="${cancion.imagen || 'https://via.placeholder.com/70'}" alt="${cancion.titulo}">
            <div>
                <h3>${cancion.titulo}</h3>
                <p>${cancion.artista}</p>
            </div>
        `;
        card.addEventListener("click", () => {
            const url = cancion.audio_url;
            if (!url) return;
            const player = document.getElementById("player-global");
            if (!player) return;
            player.style.display = "block";
            player.classList.add("show");
            player.innerHTML = "";
            if (url.includes("soundcloud.com")) {
                player.innerHTML = `<iframe width="100%" height="90" src="https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true&color=%23ff4fa3" frameborder="no"></iframe>`;
            } else if (url.includes("<iframe")) {
                player.innerHTML = url;
            } else {
                const audio = document.createElement("audio");
                audio.controls = true;
                audio.src = url;
                player.appendChild(audio);
                audio.play();
            }
        });
        container.appendChild(card);
    });
}

function filtrarPorCategoria(categoria) {
    // Los tops son fijos: solo canciones con top = TRUE (sin filtrar por categoría)
    const topsFijos = allSongs.filter(s => s.top === true || s.top === "TRUE");
    pintarTop(topsFijos.slice(0, 6));
    
    // Mostrar artistas de la categoría seleccionada (solo los que tienen top = FALSE)
    if (categoria !== "todos") {
        mostrarArtistas(categoria);
    } else {
        const contenedor = document.getElementById("categoria-artistas");
        if (contenedor) contenedor.style.display = "none";
    }
}

// ================= ARTISTAS POR CATEGORÍA =================
function mostrarArtistas(categoria) {
    const artistasMap = new Map();
    
    allSongs.forEach(song => {
        // Solo artistas con top = FALSE
        if (song.categoria === categoria && song.artista && (song.top === false || song.top === "FALSE")) {
            if (!artistasMap.has(song.artista)) {
                artistasMap.set(song.artista, {
    nombre: song.artista,
    titulo: song.titulo,
    imagen: song.imagen,
    audio_url: song.audio_url
});
            }
        }
    });
    
    const contenedor = document.getElementById("categoria-artistas");
    const grid = document.getElementById("artistas-grid");
    const titulo = document.getElementById("categoria-titulo");
    
    if (!contenedor || !grid) return;
    
    if (artistasMap.size === 0) {
        contenedor.style.display = "none";
        return;
    }
    
    titulo.textContent = `🎤 Artistas de ${categoria}`;
    grid.innerHTML = "";
    
    artistasMap.forEach(artista => {
        const card = document.createElement("div");
        card.className = "artista-card";
        card.innerHTML = `
    <img src="${artista.imagen || 'https://via.placeholder.com/90'}" alt="${artista.nombre}">
    <h4>${artista.nombre}</h4>
    <p>${artista.titulo || ''}</p>
`;
        card.addEventListener("click", () => {
    const url = artista.audio_url;
    if (!url) return;
    const playerArtista = document.getElementById("player-artista");
    if (!playerArtista) return;
    playerArtista.style.display = "block";
    playerArtista.innerHTML = "";
    if (url.includes("<iframe")) {
        playerArtista.innerHTML = url;
    } else if (url.includes("soundcloud.com")) {
        let cleanUrl = url.split('?')[0];
let soundcloudSrc = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(cleanUrl) + "&auto_play=true&color=%23ff4fa3";
playerArtista.innerHTML = `<iframe width="100%" height="250" src="${soundcloudSrc}" frameborder="no"></iframe>`;
    } else {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = url;
        playerArtista.appendChild(audio);
        audio.play();
    }
});
        grid.appendChild(card);
    });
    
    contenedor.style.display = "block";
}

// ================= CANCIONES POR ARTISTA =================
function mostrarCancionesDeArtista(nombreArtista) {
    // Buscar la canción/playlist del artista (tomamos la primera que tenga audio_url)
    const artistaData = allSongs.find(song => song.artista === nombreArtista && song.audio_url);
    
    if (!artistaData || !artistaData.audio_url) {
        console.log("No hay playlist para este artista");
        return;
    }
    
    const url = artistaData.audio_url;
    const playerContainer = document.getElementById("player-global");
    
    if (!playerContainer) return;
    
    playerContainer.style.display = "block";
    playerContainer.innerHTML = "";
    
    if (url.includes("<iframe")) {
        playerContainer.innerHTML = url;
    } else if (url.includes("soundcloud.com") || url.includes("apple.com") || url.includes("spotify.com")) {
        // Para SoundCloud, Apple Music, Spotify
        const embedSrc = url.includes("soundcloud.com") 
            ? "https://w.soundcloud.com/player/?url=" + encodeURIComponent(url) + "&auto_play=true&color=%23ff4fa3"
            : url;
        playerContainer.innerHTML = `<iframe width="100%" height="166" scrolling="no" frameborder="no" src="${embedSrc}"></iframe>`;
    } else {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = url;
        playerContainer.appendChild(audio);
        audio.play();
    }
}

// ================= MODAL PEDIR MÚSICA =================
document.addEventListener("DOMContentLoaded", function() {
    const modalPedir = document.getElementById("modal-pedir");
    const btnPedir = document.getElementById("floating-btn");
    const closeModal = document.querySelector(".modal-pedir-close");

    if (btnPedir && modalPedir) {
        btnPedir.addEventListener("click", (e) => {
            e.preventDefault();
            modalPedir.classList.add("active");
            console.log("Modal abierto");
        });
    } else {
        console.log("No se encontró el botón o el modal");
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modalPedir.classList.remove("active");
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modalPedir) {
            modalPedir.classList.remove("active");
        }
    });

    const formPedir = document.getElementById("form-pedir");
    if (formPedir) {
        formPedir.addEventListener("submit", (e) => {
            e.preventDefault();
            const cancion = document.getElementById("cancion-pedir").value.trim();
            const artista = document.getElementById("artista-pedir").value.trim();
            if (cancion && artista) {
                window.open(`https://wa.me/5355877689?text=Hola, quiero pedir:%0A🎵 ${encodeURIComponent(cancion)}%0A🎤 ${encodeURIComponent(artista)}`, "_blank");
                modalPedir.classList.remove("active");
                formPedir.reset();
            } else {
                alert("Complete todos los campos");
            }
        });
    }
});

// ================= INICIAR =================
cargarDatos();

// ================= CATEGORÍAS =================
setTimeout(() => {
    document.querySelectorAll(".categories-grid button").forEach(btn => {
        btn.addEventListener("click", () => {
            const cat = btn.dataset.categoria;
            document.querySelectorAll(".categories-grid button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = cat === "todos" ? "todos" : cat;
            filtrarPorCategoria(currentCategory);
        });
    });
}, 500);

// ================= ADMIN =================
const btnAdmin = document.getElementById("btnAdmin");
if (btnAdmin) {
    btnAdmin.addEventListener("click", () => {
        const pass = prompt("Contraseña de administrador:");
        if (pass === "admin123") {
            window.location.href = "admin.html";
        } else {
            alert("Contraseña incorrecta");
        }
    });
}

// ================= BUSCADOR =================
const searchInput = document.querySelector(".search-field input");
const searchIcon = document.querySelector(".search-field i");

function buscarCanciones() {
    const termino = searchInput.value.toLowerCase().trim();

    if (!termino) {
        const topsIniciales = allSongs.filter(s => s.top === true || s.top === "TRUE");
        pintarTop(topsIniciales.slice(0, 6));
        return;
    }

    const resultados = allSongs.filter(song => {
        return (
            (song.titulo && song.titulo.toLowerCase().includes(termino)) ||
            (song.artista && song.artista.toLowerCase().includes(termino))
        );
    });

    pintarTop(resultados.slice(0, 6));

    const categoriasEncontradas = new Set(
        resultados.map(s => s.categoria).filter(Boolean)
    );

    const primeraCategoria = [...categoriasEncontradas][0];

    if (primeraCategoria) {
        mostrarArtistas(primeraCategoria);
    }
}

if (searchInput) {
    searchInput.addEventListener("input", buscarCanciones);
}
