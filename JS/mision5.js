var preguntas = [

{
pregunta: "¿Qué tratamiento térmico se aplica después del temple?",
opciones: ["Revenido","Recocido","Cementación"],
correcta: 0
},

{
pregunta: "¿Para qué sirve el revenido?",
opciones: ["Reducir la fragilidad del acero","Aumentar la corrosión","Fundir el acero"],
correcta: 0
},

{
pregunta: "El revenido se aplica a un acero:",
opciones: ["Ya templado","En estado líquido","Frío sin tratar"],
correcta: 0
},

{
pregunta: "El revenido consiste en:",
opciones: ["Enfriar lentamente en el horno","Calentar el acero templado a menor temperatura","Derretir el acero"],
correcta: 1
},

{
pregunta: "¿Qué propiedad mejora con el revenido?",
opciones: ["Fragilidad","Tenacidad","Oxidación"],
correcta: 1
},

{
pregunta: "Temperatura aproximada del revenido:",
opciones: ["150°C a 650°C","1000°C a 1200°C","2000°C"],
correcta: 0
},

{
pregunta: "El revenido ayuda a:",
opciones: ["Aumentar grietas","Eliminar tensiones internas","Fundir el acero"],
correcta: 1
},

{
pregunta: "¿Qué tipo de revenido mejora la elasticidad?",
opciones: ["Revenido medio","Revenido bajo","Temple"],
correcta: 0
},

{
pregunta: "El revenido bajo se usa cuando se quiere:",
opciones: ["Conservar mucha dureza","Fundir el acero","Eliminar carbono"],
correcta: 0
},

{
pregunta: "El revenido permite lograr:",
opciones: ["Solo corrosión","Solo fragilidad","Equilibrio entre dureza y tenacidad"],
correcta: 2
}

];

var indice = 0;

/* 🔥 AUDIO GLOBAL */
var audioEvoGlobal = null;

/* CARGAR JUGADOR */
let jugador = JSON.parse(localStorage.getItem("jugador"));

/* ELEMENTOS */
var empezar = document.getElementById("empezar");
var resumen = document.getElementById("act5");

var preguntaHTML = document.getElementById("act2");
var opcionesHTML = document.getElementById("act3");

var mensaje = document.getElementById("mensaje");
var progreso = document.getElementById("progreso");
var xpHTML = document.getElementById("xp");

/* HUD */
var vidasHTML = document.getElementById("vidas");
var barraXP = document.getElementById("barraXP");
var nivelHTML = document.getElementById("nivel");
var claseHTML = document.getElementById("clase");

/* 🔊 SONIDO XP */
function sonidoXP(){
    var audio = document.getElementById("audioXP");
    if(audio){
        audio.currentTime = 0;
        audio.play().catch(()=>{});
    }
}

/* 🔊 SONIDO EVOLUCIÓN */
function sonidoEvolucion(){
    var audio = document.getElementById("audioEvolucion");
    if(audio){
        audio.currentTime = 0;
        audio.play().catch(()=>{});
        audioEvoGlobal = audio;
    }
}

/* 🌟 PANTALLA EVOLUCIÓN */
function mostrarEvolucion(antes, despues){

    var pantalla = document.getElementById("pantallaEvolucion");
    if(!pantalla) return;

    var texto = document.getElementById("textoEvolucion");
    var boton = document.getElementById("continuarEvo");

    texto.innerHTML = antes + " ➜ " + despues;

    pantalla.style.display = "flex";

    sonidoEvolucion();

    boton.style.display = "none";

    setTimeout(function(){
        boton.style.display = "inline-block";
    },5000);

    boton.onclick = function(){
        pantalla.style.display = "none";

        if(audioEvoGlobal){
            audioEvoGlobal.pause();
            audioEvoGlobal.currentTime = 0;
        }
    }
}

/* ❤️ HUD */
function actualizarHUD(){

let corazonesLlenos = Math.floor(jugador.vida / 20);
let texto = "";

for(let i=0;i<5;i++){
texto += (i < corazonesLlenos) ? "❤️" : "🤍";
}

vidasHTML.innerHTML = texto;

barraXP.style.width = jugador.xp + "%";

nivelHTML.innerHTML = jugador.nivel;
claseHTML.innerHTML = jugador.clase;

}

/* INICIO */
actualizarHUD();

/* EMPEZAR */
empezar.onclick = function(){
    resumen.style.display = "none";
    mostrarPregunta();
}

/* MOSTRAR PREGUNTA */
function mostrarPregunta(){

if(indice >= preguntas.length){

preguntaHTML.innerHTML = "⭐ MISIÓN COMPLETADA";
opcionesHTML.innerHTML = "";
mensaje.innerHTML = "";
xpHTML.innerHTML = "XP TOTAL: " + jugador.xp;

localStorage.setItem("jugador", JSON.stringify(jugador));
return;
}

var actual = preguntas[indice];

preguntaHTML.innerHTML = actual.pregunta;

progreso.innerHTML = "Pregunta " + (indice+1) + " / " + preguntas.length;

opcionesHTML.innerHTML = "";

for(let i=0;i<actual.opciones.length;i++){

let boton = document.createElement("button");

boton.innerHTML = actual.opciones[i];
boton.className = "opcion";

boton.onclick = function(){
verificarRespuesta(this);
};

opcionesHTML.appendChild(boton);
}
}

/* VERIFICAR RESPUESTA */
function verificarRespuesta(boton){

var actual = preguntas[indice];
var respuesta = boton.innerHTML;

if(respuesta == actual.opciones[actual.correcta]){

boton.classList.add("correcta");

mensaje.innerHTML = "✔ Correcto +10 XP";

jugador.xp += 10;

sonidoXP();

/* SUBIR NIVEL */
if(jugador.xp >= 100){

jugador.nivel++;
jugador.xp = 0;

let antes = jugador.clase;

jugador = actualizarClase(jugador);

if(antes !== jugador.clase){
mostrarEvolucion(antes, jugador.clase);
}

mensaje.innerHTML = "🎉 SUBISTE DE NIVEL";
}

}else{

boton.classList.add("incorrecta");

mensaje.innerHTML = "❌ Incorrecto -5 vida";

jugador.vida -= 5;

if(jugador.vida < 0) jugador.vida = 0;
}

/* ACTUALIZAR */
actualizarHUD();
localStorage.setItem("jugador", JSON.stringify(jugador));

/* SIGUIENTE */
setTimeout(function(){
indice++;
mostrarPregunta();
mensaje.innerHTML = "";
},1000);
}