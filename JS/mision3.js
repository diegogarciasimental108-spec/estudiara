var preguntas = [

{
pregunta:"¿Qué es el recocido en los tratamientos térmicos?",
opciones:[
"Un tratamiento para aumentar la dureza extrema",
"Un tratamiento térmico que ablanda el metal y elimina tensiones internas",
"Un proceso para fundir completamente el acero"
],
correcta:1
},

{
pregunta:"¿Cuál es el objetivo principal del recocido?",
opciones:[
"Aumentar la fragilidad del metal",
"Reducir dureza y mejorar ductilidad",
"Eliminar completamente el carbono"
],
correcta:1
},

{
pregunta:"¿En qué rango de temperatura se realiza generalmente el recocido en aceros?",
opciones:[
"200°C – 300°C",
"700°C – 900°C",
"1200°C – 1500°C"
],
correcta:1
},

{
pregunta:"¿Cuáles son las tres etapas del recocido?",
opciones:[
"Calentamiento, mantenimiento y enfriamiento lento",
"Fusión, moldeo y enfriamiento",
"Temple, revenido y normalizado"
],
correcta:0
},

{
pregunta:"¿Cómo se realiza el enfriamiento en el recocido?",
opciones:[
"Enfriamiento rápido en agua",
"Enfriamiento lento dentro del horno",
"Enfriamiento con aire forzado"
],
correcta:1
},

{
pregunta:"¿Qué propiedad mejora el recocido en los metales?",
opciones:[
"Ductilidad",
"Fragilidad",
"Conductividad eléctrica únicamente"
],
correcta:0
},

{
pregunta:"¿Qué tipo de recocido se utiliza para eliminar tensiones internas?",
opciones:[
"Recocido de alivio de tensiones",
"Recocido criogénico",
"Recocido por choque térmico"
],
correcta:0
},

{
pregunta:"¿Qué ocurre con la estructura del metal durante el recocido?",
opciones:[
"Se vuelve más frágil",
"Se reorganizan los granos cristalinos",
"El metal se vuelve líquido"
],
correcta:1
},

{
pregunta:"¿En qué horno se realiza comúnmente el recocido?",
opciones:[
"Horno eléctrico de resistencia",
"Horno de arco eléctrico",
"Horno de inducción únicamente"
],
correcta:0
},

{
pregunta:"¿En qué aplicaciones se usa el recocido?",
opciones:[
"Para mejorar la maquinabilidad del acero",
"Solo para fundición de metales",
"Únicamente en aluminio"
],
correcta:0
}

];

var indice = 0;

/* ELEMENTOS */
var preguntaHTML = document.getElementById("act2");
var opcionesHTML = document.getElementById("act3");
var mensaje = document.getElementById("mensaje");
var progreso = document.getElementById("progreso");

/* JUGADOR */
let jugador = JSON.parse(localStorage.getItem("jugador"));

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

/* 🌟 EVOLUCIÓN EN PANTALLA */
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
    let corazonesLlenos = Math.floor(jugador.vida / 20);
    let texto = "";

    for(let i=0;i<5;i++){
        texto += (i < corazonesLlenos) ? "❤️" : "🤍";
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

/* MOSTRAR PREGUNTA */
function mostrarPregunta(){

    if(indice >= preguntas.length){

        preguntaHTML.innerHTML="⭐ MISIÓN COMPLETADA";
        opcionesHTML.innerHTML="";
        mensaje.innerHTML="";
        return;
    }

    var actual = preguntas[indice];

    preguntaHTML.innerHTML = actual.pregunta;
    progreso.innerHTML = "Pregunta "+(indice+1)+" / "+preguntas.length;

    opcionesHTML.innerHTML="";

    for(var i=0;i<actual.opciones.length;i++){

        var boton = document.createElement("button");

        boton.innerHTML = actual.opciones[i];
        boton.className="opcion";

        boton.onclick = function(){
            verificarRespuesta(this);
        };

        opcionesHTML.appendChild(boton);
    }
}

/* VERIFICAR */
function verificarRespuesta(boton){

    var actual = preguntas[indice];
    var respuesta = boton.innerHTML;

    if(respuesta == actual.opciones[actual.correcta]){

        boton.classList.add("correcta");

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

        localStorage.setItem("jugador", JSON.stringify(jugador));
        mostrarXP();

    } else {

        boton.classList.add("incorrecta");

        mensaje.innerHTML="❌ Incorrecto -5 vida";

        jugador.vida -=5;

        if(jugador.vida < 0) jugador.vida = 0;

        if(jugador.vida == 0){

            mensaje.innerHTML="💀 Has muerto. XP reiniciada";

            jugador.xp = 0;
            jugador.vida = 100;

            localStorage.setItem("jugador", JSON.stringify(jugador));

            mostrarVida();
            mostrarXP();

            setTimeout(()=>location.reload(),2000);
            return;
        }

        localStorage.setItem("jugador", JSON.stringify(jugador));
        mostrarVida();
    }

    setTimeout(function(){
        indice++;
        mostrarPregunta();
        mensaje.innerHTML="";
    },1000);
}

/* INICIO */
mostrarVida();
mostrarXP();
mostrarPregunta();