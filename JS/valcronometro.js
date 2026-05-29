let tiempo = 0;
let intervalo = null;
let enPausa = false;
let modo = "estudio";

/* ELEMENTOS */
const reloj = document.getElementById("reloj");
const estado = document.getElementById("estado");

const btnIniciar = document.getElementById("iniciar");
const btnPausar = document.getElementById("pausar");
const btnContinuar = document.getElementById("continuar");
const btnTerminar = document.getElementById("terminar");

/* 🔊 AUDIOS */
const audioIniciar = document.getElementById("audioIniciar");
const audioPausar = document.getElementById("audioPausar");
const audioContinuar = document.getElementById("audioContinuar");
const audioTerminar = document.getElementById("audioTerminar");

/* 🔊 VOLUMEN */
audioIniciar.volume = 0.5;
audioContinuar.volume = 0.5;
audioPausar.volume = 0.2;   // suave
audioTerminar.volume = 0.25; // 🔥 más bajo como pediste

/* 🔥 DETENER TODOS LOS AUDIOS */
function detenerAudios(){
    [audioIniciar, audioPausar, audioContinuar, audioTerminar].forEach(a=>{
        if(a){
            a.pause();
            a.currentTime = 0;
        }
    });
}

/* 🔊 SONIDO */
function sonido(audio){
    detenerAudios(); // 🔥 clave: corta cualquier audio anterior

    if(audio){
        audio.currentTime = 0;
        audio.play().catch(()=>{});
    }
}

/* RELOJ */
function actualizarReloj(){
    let min = Math.floor(tiempo / 60);
    let seg = tiempo % 60;

    reloj.innerHTML =
        (min < 10 ? "0"+min : min) + ":" +
        (seg < 10 ? "0"+seg : seg);
}

/* INICIAR */
function iniciar(){

    sonido(audioIniciar);

    let minEstudio = parseInt(document.getElementById("tiempoEstudio").value);

    tiempo = minEstudio * 60;
    modo = "estudio";

    estado.innerHTML = "🔥 Modo estudio";

    correr();
}

/* LOOP */
function correr(){

    clearInterval(intervalo);

    intervalo = setInterval(()=>{

        if(!enPausa){
            tiempo--;
            actualizarReloj();
        }

        if(tiempo <= 0){

            clearInterval(intervalo);

            if(modo === "estudio"){
                iniciarDescanso();
            }else{
                estado.innerHTML = "✅ Ciclo completado";
            }
        }

    },1000);
}

/* DESCANSO */
function iniciarDescanso(){

    let minDescanso = parseInt(document.getElementById("tiempoDescanso").value);

    tiempo = minDescanso * 60;
    modo = "descanso";

    estado.innerHTML = "💤 Descanso";

    correr();
}

/* BOTONES */

btnIniciar.onclick = iniciar;

btnPausar.onclick = ()=>{
    sonido(audioPausar);
    enPausa = true;
    estado.innerHTML = "⏸ Pausado";
}

btnContinuar.onclick = ()=>{
    sonido(audioContinuar);
    enPausa = false;
    estado.innerHTML = "▶ Continuando";
}

btnTerminar.onclick = ()=>{
    sonido(audioTerminar);

    clearInterval(intervalo);
    tiempo = 0;
    actualizarReloj();

    estado.innerHTML = "⛔ Terminado";
}