/* TARJETAS ORIGINALES */

var tarjetasOriginales = [

{
pregunta:"¿Qué es un horno de resistencia?",
respuesta:"Es un horno que utiliza resistencias eléctricas para generar calor."
},

{
pregunta:"¿Para qué tratamientos se usa el horno de resistencia?",
respuesta:"Se utiliza para recocido, revenido y normalizado."
},

{
pregunta:"¿Qué es un horno con atmósfera controlada?",
respuesta:"Es un horno donde se controla el gas interno para evitar oxidación del metal."
},

{
pregunta:"¿Para qué se usan los hornos con atmósfera controlada?",
respuesta:"Para cementación, nitruración y otros tratamientos termoquímicos."
},

{
pregunta:"¿Qué es un horno de sales?",
respuesta:"Es un horno que utiliza sales fundidas para transmitir calor uniformemente."
},

{
pregunta:"¿Para qué se usan los hornos de sales?",
respuesta:"Para temple, austemperizado y tratamientos especiales."
}

];

/* COPIA */
var tarjetas = [...tarjetasOriginales];
var indice = 0;

/* ELEMENTOS */
var tarjeta = document.getElementById("tarjeta");
var act2 = document.getElementById("act2");
var act3 = document.getElementById("act3");

var botonMal = document.getElementById("mal");
var botonBien = document.getElementById("bien");

var contador = document.getElementById("contador");
var mensaje = document.getElementById("mensaje");

/* JUGADOR */
let jugador = JSON.parse(localStorage.getItem("jugador"));

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
    var boton = document.getElementById("continuarEvo");
    var audio = document.getElementById("audioEvolucion");

    texto.innerHTML = antes + " ➜ " + despues;

    pantalla.style.display = "flex";

    sonidoEvolucion();

    boton.style.display = "none";

    setTimeout(function(){
        boton.style.display = "inline-block";
    },5000);

    boton.onclick = function(){
        pantalla.style.display = "none";

        if(audio){
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

/* MOSTRAR TARJETA */
function mostrarTarjeta(){

if(tarjetas.length == 0){

    /* SUMAR XP */
    jugador.xp += 30;
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
        mensaje.innerHTML = "⭐ MISIÓN COMPLETADA +30 XP";
    }

    localStorage.setItem("jugador", JSON.stringify(jugador));

    tarjeta.style.display="none";

    mensaje.innerHTML += "<br><br><button onclick='reiniciarTarjetas()'>🔄 Repetir misión</button>";

    return;
}

/* CONTENIDO */
act2.innerHTML = tarjetas[0].pregunta;
act3.innerHTML = tarjetas[0].respuesta;

contador.innerHTML = "Tarjetas restantes: " + tarjetas.length;

tarjeta.classList.remove("voltear");

}

/* VOLTEAR */
tarjeta.onclick = function(){
tarjeta.classList.toggle("voltear");
};

/* ❌ REPETIR */
botonMal.onclick = function(){

var repetir = tarjetas.shift();
tarjetas.push(repetir);

mostrarTarjeta();

};

/* ✔ BIEN */
botonBien.onclick = function(){

tarjetas.shift();

mostrarTarjeta();

};

/* 🔄 REINICIAR */
function reiniciarTarjetas(){

tarjetas = [...tarjetasOriginales];

tarjeta.style.display="block";

mensaje.innerHTML="";

mostrarTarjeta();

}

/* INICIO */
mostrarTarjeta();