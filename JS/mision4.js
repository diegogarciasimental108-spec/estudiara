var preguntas = [

{pregunta:"El temple es un tratamiento térmico que aumenta la dureza del acero.",correcta:true},
{pregunta:"El temple consiste en enfriar lentamente el acero dentro del horno.",correcta:false},
{pregunta:"Durante el temple el acero se calienta hasta formar austenita.",correcta:true},
{pregunta:"La temperatura del temple en aceros generalmente está entre 750°C y 900°C.",correcta:true},
{pregunta:"El temple se utiliza para aumentar la resistencia al desgaste.",correcta:true},
{pregunta:"El temple hace que el acero sea más blando y dúctil.",correcta:false},
{pregunta:"El enfriamiento rápido del temple puede hacerse en agua, aceite o aire.",correcta:true},
{pregunta:"Después del temple el acero puede volverse frágil.",correcta:true},
{pregunta:"El revenido se aplica después del temple para reducir la fragilidad.",correcta:true},
{pregunta:"El temple no cambia la estructura interna del acero.",correcta:false},
{pregunta:"Durante el temple la austenita se transforma en martensita.",correcta:true},
{pregunta:"La martensita es una estructura muy dura del acero.",correcta:true},
{pregunta:"El temple solo se aplica en aluminio.",correcta:false},
{pregunta:"El temple se usa en herramientas, engranajes y piezas mecánicas.",correcta:true},
{pregunta:"Si el enfriamiento es demasiado rápido pueden aparecer grietas.",correcta:true}

];

var indice = 0;

let jugador = JSON.parse(localStorage.getItem("jugador"));

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

/* VIDA */
function mostrarVida(){
    let llenos = Math.floor(jugador.vida / 20);
    let texto = "";

    for(let i=0;i<5;i++){
        texto += (i < llenos) ? "❤️" : "🤍";
    }

    corazones.innerHTML = texto;
}

/* XP */
function mostrarXP(){
    xpTexto.innerHTML = jugador.xp + " / 100";
    xpBarra.style.width = jugador.xp + "%";
    nivelHTML.innerHTML = jugador.nivel;
    claseHTML.innerHTML = jugador.clase;
}

/* PREGUNTA */
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

/* VERIFICAR */
function verificar(respuesta){

    var correcta = preguntas[indice].correcta;

    if(respuesta == correcta){

        mensaje.innerHTML="✔ Correcto +10 XP";

        jugador.xp +=10;
        sonidoXP();

        if(jugador.xp >= 100){

            jugador.nivel++;
            jugador.xp = 0;

            let antes = jugador.clase;

            jugador = actualizarClase(jugador);

            if(antes !== jugador.clase){
                mostrarEvolucion(antes, jugador.clase);
            }

            mensaje.innerHTML="🎉 SUBISTE DE NIVEL";
        }

        mostrarXP();

    } else {

        mensaje.innerHTML="❌ Incorrecto -5 vida";

        jugador.vida -=5;

        if(jugador.vida < 0) jugador.vida = 0;

        mostrarVida();

        if(jugador.vida == 0){

            mensaje.innerHTML="💀 Has muerto. XP reiniciada";

            jugador.xp = 0;
            jugador.vida = 100;

            localStorage.setItem("jugador", JSON.stringify(jugador));

            setTimeout(()=>location.reload(),2000);
            return;
        }
    }

    localStorage.setItem("jugador", JSON.stringify(jugador));

    setTimeout(function(){
        indice++;
        mostrarPregunta();
    },1000);
}

/* BOTONES */
botonV.onclick = () => verificar(true);
botonF.onclick = () => verificar(false);

/* INICIO */
mostrarVida();
mostrarXP();
mostrarPregunta();