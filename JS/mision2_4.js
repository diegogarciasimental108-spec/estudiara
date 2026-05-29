let jugador = JSON.parse(localStorage.getItem("jugador"));

var boton = document.getElementById("vistos");
var mensaje = document.getElementById("mensaje");

/* 🔊 SONIDOS */
function sonidoXP(){
    var audio = document.getElementById("audioXP");
    if(audio){
        audio.currentTime = 0;
        audio.play().catch(()=>{});
    }
}

function sonidoEvolucion(){
    var audio = document.getElementById("audioEvolucion");
    if(audio){
        audio.currentTime = 0;
        audio.play().catch(()=>{});
    }
}

/* 🌟 EVOLUCIÓN */
function mostrarEvolucion(antes, despues){

    var pantalla = document.getElementById("pantallaEvolucion");
    var texto = document.getElementById("textoEvolucion");
    var botonEvo = document.getElementById("continuarEvo");
    var audio = document.getElementById("audioEvolucion");

    texto.innerHTML = antes + " ➜ " + despues;

    pantalla.style.display = "flex";

    sonidoEvolucion();

    botonEvo.style.display = "none";

    setTimeout(function(){
        botonEvo.style.display = "inline-block";
    },5000);

    botonEvo.onclick = function(){
        pantalla.style.display = "none";

        if(audio){
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

/* BOTÓN */
boton.onclick = function(){

    jugador.xp += 20;
    sonidoXP();

    if(jugador.xp >= 100){

        jugador.nivel++;
        jugador.xp = 0;

        let antes = jugador.clase;

        jugador = actualizarClase(jugador);

        if(antes !== jugador.clase){
            mostrarEvolucion(antes, jugador.clase);
        }

        mensaje.innerHTML = "🎉 SUBISTE DE NIVEL";

    }else{

        mensaje.innerHTML = "⭐ MISIÓN COMPLETADA +20 XP";

    }

    localStorage.setItem("jugador", JSON.stringify(jugador));

    boton.style.display="none";
};