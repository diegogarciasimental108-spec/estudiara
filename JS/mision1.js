var textarea = document.getElementById("resumenUsuario");
var botonBorrar = document.getElementById("borrar");
var botonCompletar = document.getElementById("completar");
var mensaje = document.getElementById("mensaje");

/* 🔊 SONIDO XP */
function sonidoXP(){
    var audio = document.getElementById("audioXP");

    if(audio){
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Error audio XP"));
    }
}

/* 🔊 SONIDO EVOLUCIÓN */
function sonidoEvolucion(){
    var audio = document.getElementById("audioEvolucion");

    if(audio){
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Error audio evolución"));
    }
}

/* CARGAR RESUMEN */
function cargarResumen(){
    var guardado = localStorage.getItem("resumenCSS");

    if(guardado){
        textarea.value = guardado;
    }
}

/* BORRAR */
function borrarTexto(){
    textarea.value = "";
    localStorage.removeItem("resumenCSS");
    mensaje.innerHTML = "🧹 Texto borrado";
}

/* COMPLETAR MISIÓN */
function completarMision(){

    if(textarea.value.trim() === ""){
        mensaje.innerHTML = "⚠️ Escribe un resumen primero";
        return;
    }

    localStorage.setItem("resumenCSS", textarea.value);

    let jugador = JSON.parse(localStorage.getItem("jugador"));

    if(!jugador){
        mensaje.innerHTML = "Error: no hay jugador";
        return;
    }

    /* SUMAR XP */
    jugador.xp += 20;
    sonidoXP();

    /* SUBIR NIVEL */
    if(jugador.xp >= 100){

        jugador.nivel++;
        jugador.xp = 0;

        let claseAnterior = jugador.clase;

        jugador = actualizarClase(jugador);

        /* EVOLUCIÓN */
        if(claseAnterior !== jugador.clase){
            mostrarEvolucion(claseAnterior, jugador.clase);
        }

        /* 🔧 SOLO MENSAJE GENERAL (NO CLASE) */
        mensaje.innerHTML = "🎉 SUBISTE DE NIVEL";

    }else{
        mensaje.innerHTML = "⭐ MISIÓN COMPLETADA +20 XP";
    }

    localStorage.setItem("jugador", JSON.stringify(jugador));

    textarea.value = "";
}

/* 🌟 EVOLUCIÓN */
function mostrarEvolucion(antes, despues){

    var pantalla = document.getElementById("pantallaEvolucion");
    var texto = document.getElementById("textoEvolucion");
    var boton = document.getElementById("continuarEvo");

    var audio = document.getElementById("audioEvolucion");

    /* TEXTO */
    texto.innerHTML = antes + " ➜ " + despues;

    /* MOSTRAR */
    pantalla.style.display = "flex";

    /* SONIDO */
    sonidoEvolucion();

    /* BLOQUEAR BOTÓN */
    boton.style.display = "none";

    setTimeout(function(){
        boton.style.display = "inline-block";
    },7000);

    /* CONTINUAR */
    boton.onclick = function(){
        pantalla.style.display = "none";

        /* DETENER AUDIO */
        if(audio){
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

/* EVENTOS */
botonBorrar.onclick = borrarTexto;
botonCompletar.onclick = completarMision;

/* INICIO */
window.addEventListener("load", cargarResumen);