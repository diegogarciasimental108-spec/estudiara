// personaje.js

window.onload = function(){

let jugador = JSON.parse(localStorage.getItem("jugador"));

if(jugador == null){
    alert("No hay jugador registrado");
    return;
}

/* MOSTRAR DATOS */

if(document.getElementById("nombre")){
    document.getElementById("nombre").value = jugador.usuario;
}

if(document.getElementById("nivel")){
    document.getElementById("nivel").value = jugador.nivel;
}

if(document.getElementById("exp")){
    document.getElementById("exp").value = jugador.xp;
}

if(document.getElementById("vida")){
    document.getElementById("vida").value = jugador.vida;
}

if(document.getElementById("clase")){
    document.getElementById("clase").value = jugador.clase;
}

/* 🔊 SONIDO DE INICIO (primer clic obligatorio) */

document.addEventListener("click", function(){

    var audio = document.getElementById("audioInicio");

    if(audio){
        audio.volume = 0.4;
        audio.currentTime = 0;
        audio.play();
    }

}, { once: true });

}


/* 🔥 SISTEMA DE CLASES */

function actualizarClase(jugador){

let claseAnterior = jugador.clase;

if(jugador.nivel >= 10){
    jugador.clase = "Ingeniero de Manufactura Avanzada 🧠";
}
else if(jugador.nivel >= 7){
    jugador.clase = "Ingeniero de Procesos 🏭";
}
else if(jugador.nivel >= 5){
    jugador.clase = "Analista de Procesos 📊";
}
else if(jugador.nivel >= 3){
    jugador.clase = "Técnico de Manufactura ⚙️";
}
else{
    jugador.clase = "Operador de Taller 🔧";
}

/* 🔊 SONIDO + ALERTA SI CAMBIA */

if(claseAnterior !== jugador.clase){

    alert("⚡ Evolucionaste a la clase: " + jugador.clase);

    var audioEvo = document.getElementById("audioEvolucion");

    if(audioEvo){
        audioEvo.volume = 0.5;
        audioEvo.currentTime = 0;
        audioEvo.play();
    }
}

return jugador;

}


/* ⭐ SISTEMA DE NIVEL */

function subirNivel(jugador){

if(jugador.xp >= 100){

    jugador.nivel++;
    jugador.xp = 0;

    jugador = actualizarClase(jugador);

    localStorage.setItem("jugador", JSON.stringify(jugador));
}

return jugador;

}