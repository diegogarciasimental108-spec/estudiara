var lista = document.getElementById("listaNotas");
var boton = document.getElementById("crear");

var tituloInput = document.getElementById("titulo");
var contenidoInput = document.getElementById("contenido");
var dificultadInput = document.getElementById("dificultad");
var fechaInput = document.getElementById("fecha");
var importanteInput = document.getElementById("importante");
var buscador = document.getElementById("buscador");

var notas = JSON.parse(localStorage.getItem("notas")) || [];

var editando = -1;

/* SONIDOS */
function sonido(id){
let audio = document.getElementById(id);
if(audio){
audio.currentTime=0;
audio.play().catch(()=>{});
}
}

/* GUARDAR */
boton.onclick = function(){

sonido("sonidoGuardar");

var nota = {
titulo: tituloInput.value,
contenido: contenidoInput.value,
dificultad: dificultadInput.value,
fecha: fechaInput.value,
importante: importanteInput.checked
};

if(nota.titulo === "" || nota.contenido === ""){
alert("LLENA LOS CAMPOS");
return;
}

if(editando === -1){
notas.push(nota);
}else{
notas[editando] = nota;
editando = -1;
}

localStorage.setItem("notas", JSON.stringify(notas));

limpiar();
mostrar();
}

/* LIMPIAR */
function limpiar(){
tituloInput.value="";
contenidoInput.value="";
fechaInput.value="";
importanteInput.checked=false;
}

/* MOSTRAR */
function mostrar(){

lista.innerHTML="";

let texto = buscador.value.toLowerCase();

notas.forEach((nota,i)=>{

if(
nota.titulo.toLowerCase().includes(texto) ||
nota.contenido.toLowerCase().includes(texto)
){

let clase = nota.importante ? "nota importante" : "nota";

lista.innerHTML += `
<div class="${clase}">
<h3>${nota.titulo}</h3>
<p>${nota.contenido}</p>
<p>📅 ${nota.fecha}</p>
<p>⚙ ${nota.dificultad}</p>

<button onclick="editar(${i})">✏️</button>
<button onclick="eliminar(${i})">🗑</button>
</div>
`;
}

});
}

/* EDITAR */
function editar(i){

sonido("sonidoClick");

tituloInput.value = notas[i].titulo;
contenidoInput.value = notas[i].contenido;
dificultadInput.value = notas[i].dificultad;
fechaInput.value = notas[i].fecha;
importanteInput.checked = notas[i].importante;

editando = i;
}

/* ELIMINAR */
function eliminar(i){

sonido("sonidoEliminar");

if(confirm("¿Eliminar nota?")){
notas.splice(i,1);
localStorage.setItem("notas", JSON.stringify(notas));
mostrar();
}
}

/* BUSCAR */
buscador.oninput = mostrar;

/* INICIO */
mostrar();