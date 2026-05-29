var preguntas = [
{pregunta:"Los tratamientos termoquímicos modifican la composición química de la superficie del acero.", correcta:true},
{pregunta:"La cementación consiste en introducir carbono en la superficie del acero.", correcta:true},
{pregunta:"La cementación se realiza a bajas temperaturas menores a 200°C.", correcta:false},
{pregunta:"La nitruración introduce nitrógeno en la superficie del acero.", correcta:true},
{pregunta:"La nitruración gaseosa utiliza amoníaco como fuente de nitrógeno.", correcta:true},
{pregunta:"La nitruración aumenta la resistencia al desgaste y la dureza superficial.", correcta:true},
{pregunta:"La carbonitruración introduce carbono y nitrógeno en el acero.", correcta:true},
{pregunta:"La carbonitruración se usa principalmente para metales no ferrosos.", correcta:false},
{pregunta:"La cianuración utiliza sales con cianuro para endurecer la superficie.", correcta:true},
{pregunta:"La cianuración se realiza generalmente a temperaturas bajas menores de 200°C.", correcta:false},
{pregunta:"La sulfinización introduce azufre en la superficie del metal.", correcta:true},
{pregunta:"La sulfinización mejora la lubricación y reduce la fricción.", correcta:true},
{pregunta:"El boronizado introduce boro en la superficie del acero.", correcta:true},
{pregunta:"El boronizado aumenta mucho la resistencia al desgaste.", correcta:true},
{pregunta:"Los tratamientos termoquímicos modifican todo el interior del metal.", correcta:false}
];

var indice = 0;

let jugador = JSON.parse(localStorage.getItem("jugador")) || {
    xp:0,
    nivel:1,
    vida:100,
    clase:"Operador de Taller 🔧"
};

/* ELEMENTOS */
var preguntaHTML = document.getElementById("pregunta");
var progreso = document.getElementById("progreso");
var mensaje = document.getElementById("mensaje");

var botonV = document.getElementById("verdadero");
var botonF = document.getElementById("falso");

var corazones = document.getElementById("vidaCorazones");
var xpBarra = document.getElementById("xpBarra");
var xpTexto = document.getElementById("xpTexto");
var nivelHTML = document.getElementById("nivel");
var claseHTML = document.getElementById("clase");

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

/* 🌟 EVOLUCIÓN (CORRECTA) */
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

        /* 🔇 DETENER AUDIO (SIN VARIABLE GLOBAL) */
        if(audio){
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

/* ❤️ VIDA */
function mostrarVida(){
    let corazonesLlenos = Math.floor(jugador.vida / 20);
    let texto = "";

    for(let i=0;i<5;i++){
        texto += (i < corazonesLlenos) ? "❤️" : "🤍";
    }

    corazones.innerHTML = texto;
}

/* ⭐ XP */
function mostrarXP(){
    xpTexto.innerHTML = jugador.xp + " / 100";
    xpBarra.style.width = jugador.xp + "%";
    nivelHTML.innerHTML = jugador.nivel;
    claseHTML.innerHTML = jugador.clase;
}

/* 📌 PREGUNTA */
function mostrarPregunta(){

    if(indice >= preguntas.length){

        preguntaHTML.innerHTML="⭐ MISIÓN COMPLETADA";
        progreso.innerHTML="";
        mensaje.innerHTML="";

        botonV.style.display="none";
        botonF.style.display="none";

        localStorage.setItem("jugador", JSON.stringify(jugador));
        return;
    }

    preguntaHTML.innerHTML = preguntas[indice].pregunta;
    progreso.innerHTML = "Pregunta "+(indice+1)+" / "+preguntas.length;
    mensaje.innerHTML="";
}

/* 🎯 VERIFICAR */
function verificar(respuesta){

    var correcta = preguntas[indice].correcta;

    if(respuesta == correcta){

        mensaje.innerHTML="✔ Correcto +10 XP";

        jugador.xp += 10;
        sonidoXP();

        if(jugador.xp >= 100){

            jugador.nivel++;
            jugador.xp = 0;

            let claseAnterior = jugador.clase;

            jugador = actualizarClase(jugador);

            if(claseAnterior !== jugador.clase){
                mostrarEvolucion(claseAnterior, jugador.clase);
            }

            mensaje.innerHTML = "🎉 SUBISTE DE NIVEL";
        }

    } else {

        mensaje.innerHTML="❌ Incorrecto -5 vida";

        jugador.vida -= 5;

        if(jugador.vida < 0) jugador.vida = 0;

        mostrarVida();

        if(jugador.vida == 0){

            mensaje.innerHTML="💀 Has muerto. XP reiniciada";

            jugador.xp = 0;
            jugador.vida = 100;

            setTimeout(()=>location.reload(),2000);
            return;
        }
    }

    localStorage.setItem("jugador", JSON.stringify(jugador));

    mostrarXP();

    setTimeout(function(){
        indice++;
        mostrarPregunta();
    },1000);
}

/* BOTONES */
botonV.onclick = function(){
    verificar(true);
}

botonF.onclick = function(){
    verificar(false);
}

/* INICIO */
mostrarVida();
mostrarXP();
mostrarPregunta();