/* VIDEOS */

var videos = [
  {titulo:"Video 1: Tratamientos térmicos - Introducción", link:"https://www.youtube.com/watch?v=G_4nfx56ym0"},
  {titulo:"Video 2: Conceptos básicos", link:"https://www.youtube.com/watch?v=72V_PxU-qVc"},
  {titulo:"Video 3: Cementación", link:"https://www.youtube.com/watch?v=IyL3AJ4RYDI"},
  {titulo:"Video 4: Aplicaciones", link:"https://www.youtube.com/watch?v=mjD68KxEJRI"},
  {titulo:"Video 5: Tratamientos térmicos", link:"https://www.youtube.com/watch?v=Fdn3oNcel-E"}
];

/* JUGADOR */

let jugador = JSON.parse(localStorage.getItem("jugador"));

if(!jugador){
  jugador = {xp:0, nivel:1, vida:100, clase:"Operador de Taller 🔧"};
}

/* INDICE */

var indice = 0;

/* ELEMENTOS */

var titulo = document.getElementById("tituloVideo");
var linkVideo = document.getElementById("linkVideo");
var progreso = document.getElementById("progreso");
var xpHTML = document.getElementById("xp");

var boton = document.getElementById("visto");
var botonAnterior = document.getElementById("anterior");

/* SONIDOS */

function sonidoXP(){
  var audio = document.getElementById("audioXP");
  if(audio){
    audio.currentTime = 0;
    audio.play().catch(()=>{});
  }
}

var audioEvoGlobal = null;

function sonidoEvolucion(){
  var audio = document.getElementById("audioEvolucion");
  if(audio){
    audio.currentTime = 0;
    audio.play().catch(()=>{});
    audioEvoGlobal = audio;
  }
}

/* EVOLUCIÓN */

function mostrarEvolucion(antes, despues){

  var pantalla = document.getElementById("pantallaEvolucion");
  var texto = document.getElementById("textoEvolucion");
  var botonEvo = document.getElementById("continuarEvo");

  texto.innerHTML = antes + " ➜ " + despues;

  pantalla.style.display = "flex";

  sonidoEvolucion();

  botonEvo.style.display = "none";

  setTimeout(function(){
    botonEvo.style.display = "inline-block";
  },5000);

  botonEvo.onclick = function(){
    pantalla.style.display = "none";

    if(audioEvoGlobal){
      audioEvoGlobal.pause();
      audioEvoGlobal.currentTime = 0;
    }
  }
}

/* CARGAR VIDEO */

function cargarVideo(){

  if(indice >= videos.length){

    titulo.innerHTML = "⭐ MISIÓN COMPLETADA";
    linkVideo.style.display = "none";
    boton.style.display = "none";
    botonAnterior.style.display = "none";
    progreso.innerHTML = "";
    xpHTML.innerHTML = "XP TOTAL: " + jugador.xp;

    localStorage.setItem("jugador", JSON.stringify(jugador));
    return;
  }

  titulo.innerHTML = videos[indice].titulo;
  linkVideo.href = videos[indice].link;

  progreso.innerHTML = "Video " + (indice+1) + " / " + videos.length;
  xpHTML.innerHTML = "XP: " + jugador.xp;
}

/* BOTÓN VISTO */

boton.onclick = function(){

  jugador.xp += 10;
  sonidoXP();

  let claseAntes = jugador.clase;

  if(jugador.xp >= 100){
    jugador = subirNivel(jugador);
  }

  if(claseAntes !== jugador.clase){
    mostrarEvolucion(claseAntes, jugador.clase);
  }

  localStorage.setItem("jugador", JSON.stringify(jugador));

  indice++;
  cargarVideo();
}

/* BOTÓN ANTERIOR */

botonAnterior.onclick = function(){

  if(indice > 0){

    indice--;

    jugador.xp -= 10;

    if(jugador.xp < 0){
      jugador.xp = 0;
    }

    localStorage.setItem("jugador", JSON.stringify(jugador));

    cargarVideo();
  }
}

/* INICIO */

cargarVideo();