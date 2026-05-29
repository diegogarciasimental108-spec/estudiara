var preguntas = [
{pregunta:"El temple es un tratamiento térmico que aumenta la dureza del acero.", correcta:true},
{pregunta:"El temple se realiza con enfriamiento lento.", correcta:false},
{pregunta:"El revenido se aplica después del temple.", correcta:true},
{pregunta:"El revenido reduce la fragilidad del acero.", correcta:true},
{pregunta:"El recocido sirve para ablandar el material.", correcta:true},
{pregunta:"El recocido enfría el acero rápidamente.", correcta:false},
{pregunta:"El normalizado mejora la uniformidad del material.", correcta:true},
{pregunta:"El normalizado se enfría dentro del horno.", correcta:false},
{pregunta:"El temple puede usar agua o aceite como medio de enfriamiento.", correcta:true},
{pregunta:"El revenido aumenta la dureza extrema del acero.", correcta:false},
{pregunta:"El recocido elimina tensiones internas.", correcta:true},
{pregunta:"El normalizado enfría el acero al aire.", correcta:true},
{pregunta:"El temple disminuye la resistencia del material.", correcta:false},
{pregunta:"El revenido mejora la tenacidad del acero.", correcta:true},
{pregunta:"El recocido se usa antes del mecanizado.", correcta:true}
];

var indice = 0;

let jugador = JSON.parse(localStorage.getItem("jugador"));

/* ELEMENTOS */
var tarjeta = document.getElementById("tarjeta");
var act2 = document.getElementById("act2");
var act3 = document.getElementById("act3");
var botonMal = document.getElementById("mal");
var botonBien = document.getElementById("bien");
var contador = document.getElementById("contador");
var mensaje = document.getElementById("mensaje");

/* SONIDOS */
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

/* EVOLUCIÓN (IGUAL QUE TU MISIÓN 1) */
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
    },7000);

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

    if(indice >= preguntas.length){

        act2.innerHTML = "⭐ MISIÓN COMPLETADA";
        act3.innerHTML = "";
        contador.innerHTML = "";
        mensaje.innerHTML = "";

        botonMal.style.display = "none";
        botonBien.style.display = "none";

        return;
    }

    act2.innerHTML = preguntas[indice].pregunta;
    act3.innerHTML = preguntas[indice].correcta ? "✔ VERDADERO" : "✖ FALSO";

    contador.innerHTML = "Pregunta " + (indice+1) + " / " + preguntas.length;

    mensaje.innerHTML = "";

    tarjeta.classList.remove("voltear");
}

/* VOLTEAR */
tarjeta.onclick = function(){
    tarjeta.classList.toggle("voltear");
};

/* MAL */
botonMal.onclick = function(){
    mensaje.innerHTML = "❌ Fallaste, se repite después";

    preguntas.push(preguntas[indice]);

    indice++;
    mostrarTarjeta();
};

/* BIEN */
botonBien.onclick = function(){

    mensaje.innerHTML = "✔ Correcto +10 XP";

    jugador.xp += 10;
    sonidoXP();

    if(jugador.xp >= 100){

        jugador.nivel++;
        jugador.xp = 0;

        let claseAnterior = jugador.clase;

        jugador = actualizarClase(jugador); // 🔥 COMO TU MISIÓN 1

        if(claseAnterior !== jugador.clase){
            mostrarEvolucion(claseAnterior, jugador.clase);
        }

        mensaje.innerHTML = "🎉 SUBISTE DE NIVEL";
    }

    localStorage.setItem("jugador", JSON.stringify(jugador));

    indice++;

    setTimeout(mostrarTarjeta, 800);
};

/* INICIO */
mostrarTarjeta();